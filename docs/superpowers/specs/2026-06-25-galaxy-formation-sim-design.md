# Galaxy Formation Sim - Modern UI Tasarım Şartnamesi (Design Spec)

Bu şartname, Andrew Campbell'ın WebGL/Three.js tabanlı N-body galaksi oluşumu simülasyonunu modern, premium ve yarı şeffaf (glassmorphic) bir kullanıcı arayüzü ile yeniden tasarlama ve geliştirme planını açıklar.

---

## 1. Genel Bakış ve Amaç
Mevcut simülasyon, işlevsel ancak estetik olarak eski nesil olan `dat.gui` kütüphanesini kullanmaktadır. Bu projenin amacı:
* Eski kontrol panelini kaldırıp yerine modern, akıcı, yarı şeffaf (glassmorphism) ve mobil uyumlu özel bir HTML/CSS kontrol paneli (HUD) entegre etmek.
* Sol alt köşeye ses seviyesi ayarlı, oynatma/durdurma işlevine sahip ve ses dalgası animasyonlu minimalist bir müzik çalar yerleştirmek.
* Google Fonts (Outfit ve Space Grotesk) kütüphanesini kullanarak tipografiyi iyileştirmek.
* Tam ekran yükleme animasyonunu daha premium bir tasarımla yenilemek.

---

## 2. Arayüz Tasarımı ve Estetik (UI/UX)

### 2.1 Tasarım Dili (Glassmorphism)
Kontrol paneli ve müzik çalar gibi tüm arayüz bileşenleri "cam" efektiyle tasarlanacaktır:
* **Arka Plan:** `background: rgba(15, 15, 25, 0.6);`
* **Blur:** `backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);`
* **Kenarlık:** `border: 1px solid rgba(255, 255, 255, 0.08);`
* **Gölge:** `box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);`
* **Vurgu Renkleri:** Neon mavi (`#00f0ff`), mor (`#8b5cf6`), zümrüt yeşili (`#10b981`), açık gri (`#9ca3af`).

### 2.2 Sağ Yüzen Panel (Floating HUD)
Sağ üst köşede dikey olarak yerleşecek panel şunları içerecektir:
1. **Header (Başlık):** Proje ismi, durum göstergesi (aktif/duraklatıldı neon ışıklı nokta).
2. **Kütleçekim Ayarı:** 0.1 ile 10 arasında değişen, anlık değeri sağında gösteren şık bir yatay kaydırma çubuğu (slider).
3. **Malzeme Opaklık Ayarları:**
   * Büyük Yıldızlar (0.0 - 1.0 slider)
   * Küçük Yıldızlar (0.0 - 1.0 slider)
   * Gaz Bulutları (0.0 - 1.0 slider)
4. **Uzay Arka Planı (Skybox):** Thumbnail'ler halinde sunulan buton grubu:
   * Milky Way (Samanyolu)
   * Light Blue (Açık Mavi)
   * Blue (Mavi)
   * Red (Kırmızı)
5. **Simülasyon Kontrolleri (Butonlar):**
   * Oynat/Duraklat (Space)
   * Kamera Modu (1: Serbest / 2: Yörünge)
   * Autorotation Dönüşü (R)
   * Simülasyonu Sıfırla (Reset)
   * Kısayol Bilgilendirme Modal Butonu (i)

### 2.3 Sol Alt Müzik Çalar (Music Player)
* Minimalist yatay yüzen widget.
* Parça İsmi: "Shooting Stars" (Bagheera / Bag Raiders cover).
* Kontroller: Oynat/Durdur butonu, Sessize al/Ses aç butonu, Ses seviyesi (Volume) slider'ı.
* Görsel Efekt: Müzik çalarken hareket eden, durunca sabitlenen CSS animasyonlu 4 sütunlu ses dalgası simgesi.

### 2.4 Yükleme Ekranı (Loading Overlay)
* Tam ekran siyah-mor koyu geçişli (`radial-gradient`) arka plan.
* Ortada parlayan, yavaşça nefes alan (`pulse` animasyonlu) ünlü söz: "*Never apologize for burning too brightly or collapsing into yourself. That is how galaxies are made.*"
* Altında pürüzsüz dolan mor-mavi gradyanlı yükleme barı.

---

## 3. Teknik Mimari ve Entegrasyon

### 3.1 Proje Dosya Yapısı
```
/
├── index.html        # Yenilenmiş ana HTML ve DOM yapısı
├── index.css         # (Yeni) Premium arayüz ve animasyon stilleri
├── init.js           # Fiziksel sabitler (Değişmeyecek)
├── gravity.js        # Yerçekimi N-body hesaplama motoru (Değişmeyecek)
├── materials.js      # Three.js materyal yükleyici (Değişmeyecek)
├── app.js            # Three.js sahnesi ve UI bağlantı mantığı (dat.gui kaldırıldı)
├── libs/             # Kütüphaneler (dat.gui kaldırılacak, diğerleri korunacak)
└── assets/           # Görseller, cubemap'ler ve shooting_stars.mp3
```

### 3.2 JavaScript UI Kontrollerinin Entegrasyonu
`app.js` içerisindeki `displayGUI()` fonksiyonu tamamen silinerek yerine `initializeModernUI()` yazılacaktır. Bu fonksiyon:
* Slider değişikliklerini dinleyecek (`input` eventi) ve Three.js sahnesindeki mesh opaklıklarını/yerçekimi sabitlerini anlık güncelleyecektir.
* Buton tıklamalarını simülasyon state'leri (`PAUSED`, `controls.autoRotate`, `cameraMode`) ile senkronize edecektir.
* Müzik çalma durumunu HTML audio nesnesi üzerinden kontrol edip ses seviyesi slider'ı ile senkronize edecektir.

---

## 4. Doğrulama ve Test Planı

### 4.1 Fonksiyonel Testler
* **Yerçekimi Slider'ı:** Slider hareket ettirildiğinde parçacıkların birbirine çekilme hızlarının arttığı/azaldığı çıplak gözle doğrulanacaktır.
* **Opaklık Sürgüleri:** Her sürgü çekildiğinde ilgili parçacık grubunun (büyük, küçük, gaz) görünmez olduğu ve geri geldiği kontrol edilecektir.
* **Arka Plan Değişimi:** Arka plan butonlarına tıklandığında skybox dokusunun sorunsuz şekilde güncellendiği teyit edilecektir.
* **Müzik Kontrolleri:** Oynat/durdur yapıldığında müzik sesinin başlayıp bittiği, ses sürgüsünün sesi kıstığı doğrulanacaktır.

### 4.2 Görsel ve Performans Testleri
* **Responsive Tasarım:** Ekran küçüldüğünde panellerin üst üste binmediği, dikey/mobil modda ekran altına düzgün yerleştiği gözlemlenecektir.
* **Frame Rate (FPS):** dat.gui yerine yazılan Vanilla arayüzün simülasyonun 60 FPS performansına herhangi bir olumsuz etki yapmadığı doğrulanacaktır.
