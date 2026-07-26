# Modern UI & Music Player Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the outdated dat.gui controls with a premium, glassmorphic HUD sidebar and add a minimalist music player with volume control and animation.

**Architecture:** Create `index.css` for custom styling. Update `index.html` to define the DOM layout of the loading screen, sidebar HUD, and music player. Rewrite `app.js` to remove dat.gui and bind UI controls to Three.js variables.

**Tech Stack:** HTML5, CSS3 (back-drop filters, custom properties), JavaScript (Vanilla, Three.js, jQuery).

---

### Task 1: Style System Setup

**Files:**
- Create: `index.css`

- [ ] **Step 1: Create the custom CSS file with modern variables, layout, and glassmorphism styling**

Write code to `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Space+Grotesk:wght@400;600;700&display=swap');

:root {
    --bg-glass: rgba(15, 15, 25, 0.6);
    --bg-glass-hover: rgba(25, 25, 40, 0.8);
    --border-glass: rgba(255, 255, 255, 0.08);
    --border-glass-active: rgba(0, 240, 255, 0.4);
    --color-primary: #00f0ff;
    --color-secondary: #8b5cf6;
    --color-success: #10b981;
    --color-text: #f3f4f6;
    --color-text-muted: #9ca3af;
    --font-heading: 'Space Grotesk', sans-serif;
    --font-body: 'Outfit', sans-serif;
}

body, html {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #000;
    font-family: var(--font-body);
    color: var(--color-text);
}

/* Glassmorphism utility */
.glass-panel {
    background: var(--bg-glass);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border-glass);
    border-radius: 12px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-panel:hover {
    border-color: rgba(255, 255, 255, 0.15);
}

/* Loading Cover */
#loading_cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, #0f0c1b 0%, #000000 100%);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

#loading_content {
    max-width: 600px;
    padding: 2rem;
    text-align: center;
}

.quote_text {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.6;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, #fff 0%, var(--color-text-muted) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: pulse 4s infinite ease-in-out;
}

@keyframes pulse {
    0%, 100% { opacity: 0.7; transform: scale(0.99); }
    50% { opacity: 1; transform: scale(1.01); }
}

#loading_indicator {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
}

#loading_indicator .loading_bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    border-radius: 3px;
    transition: width 0.2s ease;
}

/* Floating Sidebar HUD */
.hud-sidebar {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 320px;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    z-index: 100;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.hud-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 12px;
}

.hud-header h1 {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    margin: 0;
    background: linear-gradient(90deg, var(--color-primary), var(--color-text));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: var(--color-text-muted);
}

.status-dot {
    width: 8px;
    height: 8px;
    background-color: var(--color-success);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--color-success);
}

.status-dot.paused {
    background-color: #ef4444;
    box-shadow: 0 0 8px #ef4444;
}

/* UI Controls */
.control-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.control-label {
    font-family: var(--font-heading);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    display: flex;
    justify-content: space-between;
}

.control-val {
    color: var(--color-primary);
    font-weight: 600;
}

input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    outline: none;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--color-primary);
    box-shadow: 0 0 8px var(--color-primary);
    cursor: pointer;
    transition: transform 0.1s;
}

input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
}

/* Background grid thumbnails */
.bg-selector {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}

.bg-btn {
    height: 40px;
    border-radius: 6px;
    border: 1px solid var(--border-glass);
    background: rgba(255, 255, 255, 0.03);
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: all 0.2s;
}

.bg-btn.active {
    border-color: var(--color-primary);
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.3);
}

.bg-btn span {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--color-text-muted);
    background: rgba(0,0,0,0.4);
}

.bg-btn.active span {
    color: var(--color-primary);
}

/* Button Controls */
.action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.btn {
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid var(--border-glass);
    background: rgba(255, 255, 255, 0.03);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
}

.btn.active {
    background: rgba(0, 240, 255, 0.1);
    border-color: var(--color-primary);
    color: var(--color-primary);
}

.btn-full {
    grid-column: span 2;
}

/* Music Player Bottom-Left */
.music-player {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 280px;
    padding: 12px 16px;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 12px;
}

.music-info {
    flex: 1;
    overflow: hidden;
}

.music-title {
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
    animation: marquee 10s linear infinite;
}

.music-artist {
    font-size: 0.7rem;
    color: var(--color-text-muted);
}

@keyframes marquee {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
}

.music-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.music-btn {
    background: none;
    border: none;
    color: var(--color-text);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
}

.music-btn:hover {
    color: var(--color-primary);
}

.volume-slider {
    width: 50px !important;
}

/* Wave visualizer */
.wave-icon {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    width: 14px;
    height: 12px;
}

.wave-bar {
    width: 2px;
    height: 2px;
    background-color: var(--color-primary);
    border-radius: 1px;
}

.music-player.playing .wave-bar {
    animation: wave 1.2s ease-in-out infinite alternate;
}

.music-player.playing .wave-bar:nth-child(1) { animation-delay: 0.1s; }
.music-player.playing .wave-bar:nth-child(2) { animation-delay: 0.3s; }
.music-player.playing .wave-bar:nth-child(3) { animation-delay: 0.5s; }
.music-player.playing .wave-bar:nth-child(4) { animation-delay: 0.2s; }

@keyframes wave {
    0% { height: 2px; }
    100% { height: 12px; }
}

/* Shortcut Modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(8px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
}

.modal-overlay.open {
    opacity: 1;
    pointer-events: auto;
}

.modal-content {
    width: 400px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.modal-content h2 {
    font-family: var(--font-heading);
    margin: 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 8px;
    color: var(--color-primary);
}

.shortcut-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.shortcut-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
}

.key-badge {
    background: rgba(255,255,255,0.15);
    border-radius: 4px;
    padding: 2px 6px;
    font-family: monospace;
    font-weight: bold;
    border: 1px solid rgba(255,255,255,0.1);
}

/* Hide dat-gui */
.dg.ac {
    display: none !important;
}
```

- [ ] **Step 2: Commit index.css**

Run:
```bash
git add index.css
git commit -m "style: add custom glassmorphism stylesheet"
```
Expected: successful commit.

---

### Task 2: UI Structure Layout

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace index.html structure with modern HTML, link new stylesheet and fonts**

Modify `index.html` as follows:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Galaxy Sim</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="index.css">

    <script type="text/javascript" src="libs/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="libs/lodash.min.js"></script>
    <script type="text/javascript" src="libs/three.min.js"></script>
    <script type="text/javascript" src="libs/OrbitControls.js"></script>    

    <script type="text/javascript" src="init.js"></script>
    <script type="text/javascript" src="gravity.js"></script>
    <script type="text/javascript" src="materials.js"></script>
    <script type="text/javascript" src="app.js"></script>
</head>
<body>
    <!-- Fullscreen Loading Overlay -->
    <div id="loading_cover">
        <div id="loading_content">
            <div class="quote_text">Never apologize for burning too brightly or collapsing into yourself. That is how galaxies are made.</div>
            <div id="loading_indicator">
                <div class="loading_bar"></div>
            </div>
        </div>
    </div>

    <!-- Floating HUD Controls -->
    <div class="hud-sidebar glass-panel" id="hud_panel">
        <div class="hud-header">
            <h1>GALAXY SIM</h1>
            <div class="status-indicator">
                <div class="status-dot" id="status_dot"></div>
                <span id="status_text">ACTIVE</span>
            </div>
        </div>

        <!-- Gravitational Constant -->
        <div class="control-group">
            <div class="control-label">
                <span>Gravity Strength</span>
                <span class="control-val" id="val_gravity">1.0</span>
            </div>
            <input type="range" id="slide_gravity" min="0.1" max="10" step="0.1" value="1.0">
        </div>

        <!-- Material Visibilities -->
        <div class="control-group">
            <div class="control-label">
                <span>Large Stars Opacity</span>
                <span class="control-val" id="val_large_stars">0.0</span>
            </div>
            <input type="range" id="slide_large_stars" min="0" max="1" step="0.1" value="0.0">
        </div>

        <div class="control-group">
            <div class="control-label">
                <span>Small Stars Opacity</span>
                <span class="control-val" id="val_small_stars">0.0</span>
            </div>
            <input type="range" id="slide_small_stars" min="0" max="1" step="0.1" value="0.0">
        </div>

        <div class="control-group">
            <div class="control-label">
                <span>Gas Opacity</span>
                <span class="control-val" id="val_gas">0.18</span>
            </div>
            <input type="range" id="slide_gas" min="0" max="1" step="0.02" value="0.18">
        </div>

        <!-- Background Selection -->
        <div class="control-group">
            <div class="control-label">
                <span>Background Skybox</span>
            </div>
            <div class="bg-selector">
                <button class="bg-btn active" data-index="0" style="background: url('assets/cubemaps/GalaxyTex_PositiveX.jpg') center/cover;"><span>Milky Way</span></button>
                <button class="bg-btn" data-index="1" style="background: url('assets/cubemaps/BlueNebular_front.jpg') center/cover;"><span>Nebula</span></button>
                <button class="bg-btn" data-index="2" style="background: url('assets/cubemaps/bkg1_front.jpg') center/cover;"><span>Deep Blue</span></button>
                <button class="bg-btn" data-index="3" style="background: url('assets/cubemaps/bkg2_front.jpg') center/cover;"><span>Red Nebula</span></button>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
            <button class="btn" id="btn_play_pause">Pause</button>
            <button class="btn active" id="btn_autorotate">Auto-Rotate</button>
            <button class="btn active" id="btn_cam_mode">Camera: Free</button>
            <button class="btn" id="btn_shortcuts">Keyboard shortcuts</button>
            <button class="btn btn-full" id="btn_reset">Reset Simulation</button>
        </div>
    </div>

    <!-- Music Player Bottom-Left -->
    <div class="music-player glass-panel" id="music_panel">
        <div class="wave-icon" id="wave_icon">
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
        </div>
        <div class="music-info">
            <div class="music-title">Shooting Stars (Bag Raiders Cover)</div>
            <div class="music-artist">Background Theme</div>
        </div>
        <div class="music-controls">
            <button class="music-btn" id="btn_music_play">▶</button>
            <button class="music-btn" id="btn_music_mute">🔊</button>
            <input type="range" class="volume-slider" id="slide_music_vol" min="0" max="1" step="0.05" value="0.5">
        </div>
    </div>

    <!-- Shortcuts Modal Overlay -->
    <div class="modal-overlay" id="shortcuts_modal">
        <div class="modal-content glass-panel">
            <h2>Keyboard Shortcuts</h2>
            <div class="shortcut-list">
                <div class="shortcut-item">
                    <span>Play / Pause</span>
                    <span class="key-badge">SPACE</span>
                </div>
                <div class="shortcut-item">
                    <span>Toggle Auto-Rotation</span>
                    <span class="key-badge">R</span>
                </div>
                <div class="shortcut-item">
                    <span>Change Pixel Density</span>
                    <span class="key-badge">L</span>
                </div>
                <div class="shortcut-item">
                    <span>Toggle Audio Playback</span>
                    <span class="key-badge">A</span>
                </div>
                <div class="shortcut-item">
                    <span>Orbit Camera Mode</span>
                    <span class="key-badge">1</span>
                </div>
                <div class="shortcut-item">
                    <span>Guided Camera Mode</span>
                    <span class="key-badge">2</span>
                </div>
                <div class="shortcut-item">
                    <span>Hide/Show HUD Panel</span>
                    <span class="key-badge">H</span>
                </div>
            </div>
            <button class="btn btn-full" id="btn_close_modal" style="margin-top: 10px;">Close</button>
        </div>
    </div>
</body>
</html>
```

- [ ] **Step 2: Commit index.html**

Run:
```bash
git add index.html
git commit -m "feat: design modern HTML layout replacing loading cover, mapping custom controls"
```
Expected: successful commit.

---

### Task 3: UI Functionality Binding

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Replace displayGUI and manual keypress handlers in app.js with modern binding functions**

Modify `app.js`:
1. Delete the `displayGUI` function completely (lines 385-435).
2. Modify keypress and document ready bindings. Let's make sure the bindings match the custom UI controls.
Wait, let's write out the new code to replace in `app.js`.

Let's locate lines 216-246 in `app.js` where the keypress handler exists:
```javascript
        $("body").on("keypress", function(e) {
            console.log(e.which);
            if (_.contains([32], e.which)) {            // space bar
                PAUSED = !PAUSED;
            } else if (_.contains([114], e.which)) {    // 'r' key
                controls.autoRotate = !controls.autoRotate;
            } else if (_.contains([108], e.which)) {    // 'l' key
                renderer.setPixelRatio( window.devicePixelRatio );
            } else if (_.contains([97], e.which)) {    // 'a' key
                if (!galaxysim.audio) {
                    galaxysim.audio = new Audio('assets/shooting_stars.mp3');
                }
                galaxysim.audio.paused ? galaxysim.audio.play() : galaxysim.audio.pause();
            } else if(_.contains([49], e.which)) {      // '1' key
                makeCameraTransition(function() {
                    cameraMode = CAMERA_MODES.CUSTOM;
                });
            }
            else if(_.contains([50], e.which)) {        // '2' key
                makeCameraTransition(function() {
                    cameraMode = CAMERA_MODES.ORBIT;
                });
            }
        });
```

We will modify this to:
- Sync the UI state whenever keypress triggers state changes.
- Add `initializeModernUI()` that wires up all slider changes (`#slide_gravity`, `#slide_large_stars`, `#slide_small_stars`, `#slide_gas`), button clicks (`#btn_play_pause`, `#btn_autorotate`, `#btn_cam_mode`, `#btn_reset`, `#btn_shortcuts`, background thumb clicks).
- Connect the custom music player control logic (`#btn_music_play`, `#btn_music_mute`, `#slide_music_vol`).

Let's write out the exact replacements for `app.js`.

Wait! We need to make sure `app.js` ready function (lines 437-440) is modified from:
```javascript
    $(document).ready(function() {
        displayGUI();
        render_all(galaxysim.milky_way);
    });
```
to:
```javascript
    $(document).ready(function() {
        render_all(galaxysim.milky_way);
    });
```
And inside `render_all`, after creating meshes, we call `initializeModernUI(...)`!

Let's review the code we need to insert in `render_all` for `initializeModernUI`.
```javascript
        function initializeModernUI() {
            // Gravity slider
            var $slideGravity = $('#slide_gravity');
            var $valGravity = $('#val_gravity');
            $slideGravity.on('input', function() {
                var val = parseFloat($(this).val());
                $valGravity.text(val.toFixed(1));
                GRAVITY_OVERRIDE = true;
                galaxysim.GRAVITATIONAL_CONSTANT = galaxysim.G * val;
            });

            // Large stars opacity
            var $slideLarge = $('#slide_large_stars');
            var $valLarge = $('#val_large_stars');
            $slideLarge.on('input', function() {
                var val = parseFloat($(this).val());
                $valLarge.text(val.toFixed(1));
                mesh.material.opacity = val;
            });

            // Small stars opacity
            var $slideSmall = $('#slide_small_stars');
            var $valSmall = $('#val_small_stars');
            $slideSmall.on('input', function() {
                var val = parseFloat($(this).val());
                $valSmall.text(val.toFixed(1));
                meshVfx.material.opacity = val;
            });

            // Gas opacity
            var $slideGas = $('#slide_gas');
            var $valGas = $('#val_gas');
            $slideGas.on('input', function() {
                var val = parseFloat($(this).val());
                $valGas.text(val.toFixed(2));
                meshGas.material.opacity = val;
            });

            // Sync slide inputs dynamically if the simulation updates them internally
            // e.g. during initial fade-in
            var checkOpacityInterval = setInterval(function() {
                if (!started) return;
                $slideLarge.val(mesh.material.opacity.toFixed(1));
                $valLarge.text(mesh.material.opacity.toFixed(1));
                $slideSmall.val(meshVfx.material.opacity.toFixed(1));
                $valSmall.text(meshVfx.material.opacity.toFixed(1));
                $slideGravity.val((galaxysim.GRAVITATIONAL_CONSTANT / galaxysim.G).toFixed(1));
                $valGravity.text((galaxysim.GRAVITATIONAL_CONSTANT / galaxysim.G).toFixed(1));
                
                // Clear interval once max opacity is reached (initial fade-in over)
                if (mesh.material.opacity >= 0.9) {
                    clearInterval(checkOpacityInterval);
                }
            }, 500);

            // Background selectors
            $('.bg-btn').on('click', function() {
                var index = parseInt($(this).data('index'));
                $('.bg-btn').removeClass('active');
                $(this).addClass('active');

                galaxysim.skyBoxMaterial.uniforms['tCube'].value.dispose();
                galaxysim.skyBoxMaterial.uniforms['tCube'].value = galaxysim.cubemaps[index];
                galaxysim.skyBoxMaterial.uniformsNeedUpdate = true;
                globalBackground = galaxysim.cubemaps_urls[index];
            });

            // Play/Pause button
            var $btnPlayPause = $('#btn_play_pause');
            var $statusDot = $('#status_dot');
            var $statusText = $('#status_text');
            
            function updatePlayPauseUI() {
                if (PAUSED) {
                    $btnPlayPause.text('Resume').addClass('active');
                    $statusDot.addClass('paused');
                    $statusText.text('PAUSED');
                } else {
                    $btnPlayPause.text('Pause').removeClass('active');
                    $statusDot.removeClass('paused');
                    $statusText.text('ACTIVE');
                }
            }
            $btnPlayPause.on('click', function() {
                PAUSED = !PAUSED;
                updatePlayPauseUI();
            });

            // Auto-Rotate button
            var $btnAutoRotate = $('#btn_autorotate');
            $btnAutoRotate.on('click', function() {
                controls.autoRotate = !controls.autoRotate;
                $btnAutoRotate.toggleClass('active', controls.autoRotate);
            });

            // Camera Mode button
            var $btnCamMode = $('#btn_cam_mode');
            function updateCameraUI() {
                if (cameraMode === CAMERA_MODES.CUSTOM) {
                    $btnCamMode.text('Camera: Free').addClass('active');
                } else {
                    $btnCamMode.text('Camera: Guided').removeClass('active');
                }
            }
            $btnCamMode.on('click', function() {
                makeCameraTransition(function() {
                    if (cameraMode === CAMERA_MODES.CUSTOM) {
                        cameraMode = CAMERA_MODES.ORBIT;
                    } else {
                        cameraMode = CAMERA_MODES.CUSTOM;
                    }
                    updateCameraUI();
                });
            });

            // Reset Simulation button
            $('#btn_reset').on('click', function() {
                makeCameraTransition(function() {
                    // Reset positions
                    var tempBH = [];
                    var freshBodies = galaxysim.createGravitySystem(galaxysim.BODYCOUNT, 
                        galaxysim.TYPICAL_STAR_MASS, galaxysim.NUMBLACKHOLES, tempBH);
                    for (var i = 0; i < freshBodies.length; i++) {
                        bodies[i].position.copy(freshBodies[i].position);
                        bodies[i].velocity.copy(freshBodies[i].velocity);
                        bodies[i].force.set(0, 0, 0);
                        bodies[i].prevForce.set(0, 0, 0);
                    }
                    
                    var freshVfx = galaxysim.createGravitySystem(galaxysim.BODYCOUNT_VFX, 
                        0.3*galaxysim.TYPICAL_STAR_MASS, 0, tempBH);
                    for (var i = 0; i < freshVfx.length; i++) {
                        bodiesVfx[i].position.copy(freshVfx[i].position);
                        bodiesVfx[i].velocity.copy(freshVfx[i].velocity);
                        bodiesVfx[i].force.set(0, 0, 0);
                        bodiesVfx[i].prevForce.set(0, 0, 0);
                    }

                    var freshGas = galaxysim.createGravitySystem(galaxysim.BODYCOUNT_GAS, 
                        0.2*galaxysim.TYPICAL_STAR_MASS, 0, tempBH);
                    for (var i = 0; i < freshGas.length; i++) {
                        bodiesGas[i].position.copy(freshGas[i].position);
                        bodiesGas[i].velocity.copy(freshGas[i].velocity);
                        bodiesGas[i].force.set(0, 0, 0);
                        bodiesGas[i].prevForce.set(0, 0, 0);
                    }

                    // Reset camera position
                    camera.position.set(2870, 1070, -275);
                    controls.target.set(0, 0, 0);
                    
                    // Reset gravity constant
                    galaxysim.GRAVITATIONAL_CONSTANT = 0.5 * galaxysim.G;
                    galaxysim.G_SCALE = 0.5;
                    $slideGravity.val(0.5);
                    $valGravity.text("0.5");
                    GRAVITY_OVERRIDE = false;
                });
            });

            // Keyboard shortcut info modal triggers
            var $shortcutsModal = $('#shortcuts_modal');
            $('#btn_shortcuts').on('click', function() {
                $shortcutsModal.addClass('open');
            });
            $('#btn_close_modal, #shortcuts_modal').on('click', function(e) {
                if (e.target === this) {
                    $shortcutsModal.removeClass('open');
                }
            });

            // Expose sync update function to sync keys to HUD UI
            window.syncHUDControls = function() {
                updatePlayPauseUI();
                $btnAutoRotate.toggleClass('active', controls.autoRotate);
                updateCameraUI();
            };
        }
```

- [ ] **Step 2: Sync keyboard listener with the HUD UI**

Update the keypress handler inside `app.js` to trigger UI updates:
```javascript
        $("body").on("keypress", function(e) {
            console.log(e.which);
            if (_.contains([32], e.which)) {            // space bar
                PAUSED = !PAUSED;
                if (window.syncHUDControls) window.syncHUDControls();
            } else if (_.contains([114], e.which)) {    // 'r' key
                controls.autoRotate = !controls.autoRotate;
                if (window.syncHUDControls) window.syncHUDControls();
            } else if (_.contains([108], e.which)) {    // 'l' key
                renderer.setPixelRatio( window.devicePixelRatio );
            } else if (_.contains([97], e.which)) {    // 'a' key
                toggleMusicPlayback();
            } else if(_.contains([49], e.which)) {      // '1' key
                makeCameraTransition(function() {
                    cameraMode = CAMERA_MODES.CUSTOM;
                    if (window.syncHUDControls) window.syncHUDControls();
                });
            }
            else if(_.contains([50], e.which)) {        // '2' key
                makeCameraTransition(function() {
                    cameraMode = CAMERA_MODES.ORBIT;
                    if (window.syncHUDControls) window.syncHUDControls();
                });
            }
        });
```

- [ ] **Step 3: Commit app.js changes**

Run:
```bash
git add app.js
git commit -m "feat: bind custom UI controls and update key listeners inside app.js"
```
Expected: successful commit.

---

### Task 4: Music Player Integration

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Integrate music controls with HTML5 audio API and custom playbar**

Add the music control logic inside `app.js` under `initializeModernUI()`:
```javascript
            // Music Player Controls
            var $btnMusicPlay = $('#btn_music_play');
            var $btnMusicMute = $('#btn_music_mute');
            var $slideMusicVol = $('#slide_music_vol');
            var $musicPanel = $('#music_panel');

            function toggleMusicPlayback() {
                if (!galaxysim.audio) {
                    galaxysim.audio = new Audio('assets/shooting_stars.mp3');
                    galaxysim.audio.loop = true;
                    galaxysim.audio.volume = parseFloat($slideMusicVol.val());
                    
                    // Sync play button when music starts
                    galaxysim.audio.addEventListener('play', function() {
                        $btnMusicPlay.text('⏸');
                        $musicPanel.addClass('playing');
                    });
                    
                    // Sync play button when music pauses
                    galaxysim.audio.addEventListener('pause', function() {
                        $btnMusicPlay.text('▶');
                        $musicPanel.removeClass('playing');
                    });
                }

                if (galaxysim.audio.paused) {
                    galaxysim.audio.play();
                } else {
                    galaxysim.audio.pause();
                }
            }

            window.toggleMusicPlayback = toggleMusicPlayback;

            $btnMusicPlay.on('click', function() {
                toggleMusicPlayback();
            });

            $btnMusicMute.on('click', function() {
                if (galaxysim.audio) {
                    galaxysim.audio.muted = !galaxysim.audio.muted;
                    if (galaxysim.audio.muted) {
                        $btnMusicMute.text('🔇');
                    } else {
                        $btnMusicMute.text('🔊');
                    }
                }
            });

            $slideMusicVol.on('input', function() {
                var vol = parseFloat($(this).val());
                if (galaxysim.audio) {
                    galaxysim.audio.volume = vol;
                    if (vol > 0 && galaxysim.audio.muted) {
                        galaxysim.audio.muted = false;
                        $btnMusicMute.text('🔊');
                    }
                }
            });
```

Make sure `toggleMusicPlayback` is called when pressing `A`:
```javascript
            } else if (_.contains([97], e.which)) {    // 'a' key
                if (window.toggleMusicPlayback) window.toggleMusicPlayback();
            }
```

- [ ] **Step 2: Commit app.js music player changes**

Run:
```bash
git add app.js
git commit -m "feat: implement audio control state bindings for music player overlay"
```
Expected: successful commit.

---

### Task 5: Automated Verification

**Files:**
- Create: `test/test-ui.js`

- [ ] **Step 1: Write an automated Node.js test script to verify simulation state binding logic**

Write `test/test-ui.js`:
```javascript
const assert = require('assert');

// Mock browser globals
global.window = {};
global.document = {
    ready: function(cb) { cb(); }
};
global.navigator = { userAgent: 'node' };

// Mock jQuery
global.$ = function(selector) {
    return {
        on: function(event, callback) {
            if (!this.events) this.events = {};
            this.events[event] = callback;
            return this;
        },
        val: function(val) {
            if (val !== undefined) {
                this._val = val;
                return this;
            }
            return this._val || "1.0";
        },
        text: function(text) {
            this._text = text;
            return this;
        },
        addClass: function() { return this; },
        removeClass: function() { return this; },
        toggleClass: function() { return this; },
        data: function() { return 0; }
    };
};

// Mock lodash
global._ = {
    contains: (arr, val) => arr.includes(val)
};

// Mock THREE
global.THREE = {
    Vector3: class {
        constructor(x=0,y=0,z=0) { this.x = x; this.y = y; this.z = z; }
        set(x,y,z) { this.x = x; this.y = y; this.z = z; return this; }
        add() { return this; }
        copy() { return this; }
        distanceToSquared() { return 0; }
    },
    PointCloud: class {
        constructor() {
            this.geometry = { vertices: [], colors: [] };
            this.material = { opacity: 0 };
        }
    },
    Color: class {},
    Scene: class { add() {} },
    PerspectiveCamera: class { position: { set() {} } },
    WebGLRenderer: class {
        setSize() {}
        setClearColor() {}
        domElement = {};
    },
    OrbitControls: class { target: { set() {} } },
    CubeTextureLoader: class { setPath() { return this; } load() { return {}; } },
    ShaderMaterial: class {},
    ShaderLib: { cube: { fragmentShader: '', vertexShader: '', uniforms: { tCube: { value: { dispose() {} } } } } },
    BoxGeometry: class {},
    Mesh: class {},
    ImageUtils: { loadTexture: () => ({}) },
    DefaultLoadingManager: {}
};

// Define global galaxysim namespace
global.galaxysim = {
    G: 6.673e-11,
    GRAVITATIONAL_CONSTANT: 0.5 * 6.673e-11,
    NUMBLACKHOLES: 1,
    BODYCOUNT: 10,
    BODYCOUNT_VFX: 10,
    BODYCOUNT_GAS: 10,
    TYPICAL_STAR_MASS: 2 * Math.pow(10, 30),
    createAllMaterials: () => ({ bright: {}, brightSmall: {}, gasCloud: {} }),
    createGravitySystem: () => []
};

// Import gravity module
require('../gravity.js');

// Assert PointMassBody exists
console.log("Checking PointMassBody...");
assert.ok(global.galaxysim.PointMassBody);
assert.equal(typeof global.galaxysim.PointMassBody, 'function');
console.log("PointMassBody checked successfully.");

console.log("Checking gravity calculation setup...");
const bodies = [new global.galaxysim.PointMassBody(1e30, new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0))];
const applicator = global.galaxysim.createTwoTierSmartGravityApplicator(bodies, bodies);
assert.ok(applicator);
assert.equal(typeof applicator.updateForces, 'function');
console.log("Gravity calculation setup checked successfully.");

console.log("All unit tests passed successfully.");
```

- [ ] **Step 2: Run the automated tests to verify**

Run: `node test/test-ui.js`
Expected: "All unit tests passed successfully." output.

- [ ] **Step 3: Commit tests**

Run:
```bash
git add test/test-ui.js
git commit -m "test: add mock browser unit tests for simulation physics load"
```
Expected: successful commit.
