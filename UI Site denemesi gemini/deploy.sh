#!/bin/bash
set -e

echo "=== START DEPLOYMENT ==="

# 1. Update package list and install requirements
echo "1. Installing system dependencies..."
sudo apt-get update -y
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nginx iptables-persistent certbot python3-certbot-nginx

# 2. Extract application files
echo "2. Extracting files to /var/www/freeprompt..."
sudo mkdir -p /var/www/freeprompt
sudo rm -rf /var/www/freeprompt/*
sudo tar -xzf /home/ubuntu/dist.tar.gz -C /var/www/freeprompt/
sudo chown -R www-data:www-data /var/www/freeprompt
sudo chmod -R 755 /var/www/freeprompt

# 3. Configure iptables firewall rules for port 80 and 443
echo "3. Configuring iptables firewall..."
if ! sudo iptables -L INPUT -n | grep -q "dpt:80 "; then
    sudo iptables -I INPUT 5 -p tcp --dport 80 -j ACCEPT
fi
if ! sudo iptables -L INPUT -n | grep -q "dpt:443 "; then
    sudo iptables -I INPUT 6 -p tcp --dport 443 -j ACCEPT
fi
sudo netfilter-persistent save

# 4. Create Nginx site configuration
echo "4. Setting up Nginx site configuration..."
cat << 'EOF' | sudo tee /etc/nginx/sites-available/freeprompt.me
server {
    listen 80;
    server_name freeprompt.me www.freeprompt.me;
    root /var/www/freeprompt;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Enable configuration and reload Nginx
sudo ln -sf /etc/nginx/sites-available/freeprompt.me /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx

# 5. Check DNS propagation and run Certbot SSL
echo "5. Checking DNS resolution for freeprompt.me..."
DOMAIN="freeprompt.me"
MAX_ATTEMPTS=15
ATTEMPT=1
RESOLVED=false

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    IP=$(getent ahosts "$DOMAIN" | awk '{print $1}' | head -n 1 || echo "")
    if [ "$IP" = "130.61.83.48" ]; then
        echo "Domain $DOMAIN successfully resolved to this server IP ($IP)!"
        RESOLVED=true
        break
    else
        echo "Attempt $ATTEMPT/$MAX_ATTEMPTS: Domain $DOMAIN resolves to '$IP' (expected 130.61.83.48). Waiting 20s for DNS propagation..."
        sleep 20
        ATTEMPT=$((ATTEMPT+1))
    fi
done

if [ "$RESOLVED" = "true" ]; then
    echo "Registering Let's Encrypt SSL certificate..."
    sudo certbot --nginx --non-interactive --agree-tos --email enesjke4334@gmail.com -d freeprompt.me -d www.freeprompt.me --redirect
    echo "=== DEPLOYMENT SUCCESSFUL ==="
else
    echo "=== WARNING: DNS did not resolve to 130.61.83.48 yet. Skipping SSL installation. Run the following command manually once DNS resolves: ==="
    echo "sudo certbot --nginx -d freeprompt.me -d www.freeprompt.me"
    echo "=== DEPLOYMENT COMPLETED WITHOUT SSL ==="
fi
