var globalBackground = galaxysim.milky_way;
galaxysim.mesh = new THREE.PointCloud();
galaxysim.meshGas = new THREE.PointCloud();
galaxysim.meshVfx = new THREE.PointCloud();

(function() {

    galaxysim.updateViewport = function(window, renderer, camera, skybox) {
        var w = window.innerWidth;
        var h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        skybox.camera.aspect = w / h;
        skybox.camera.updateProjectionMatrix();
    };

    function createCloudGeometryFromBodies(bodies) {
        // create the particle variables
        var particleCount = bodies.length;
        var particles = new THREE.Geometry();
        var colors = new Array(particleCount);

        // now create the individual particles
        for (var p = 0; p < particleCount; p++) {
            particle = bodies[p].position;
            // add it to the geometry
            particles.vertices.push(particle);
            colors[p] = new THREE.Color(1,1,1);
        }
        particles.colors = colors;
        return particles;
    }

    function colorParticles(bodies, pointCloud, colorSelectingFunc) {
        var particleCount = bodies.length;
        var particles = new THREE.Geometry();

        for (var p = 0; p < particleCount; p++) {
            particle = bodies[p].position;
            var massFactor = bodies[p].mass / galaxysim.TYPICAL_STAR_MASS;

            colorSelectingFunc(bodies[p], pointCloud.geometry.colors[p]);
        }
        pointCloud.geometry.colorsNeedUpdate = true;
    }

    function colorStar(body, existingColor) {
        if(body.mass > 0.9999*galaxysim.TYPICAL_STAR_MASS * 100) {
            // Black hole color
            existingColor.setRGB(0,0,0);
        }
        else {
            var dist = body.position.length();
            var maxDist = 2150.0;
            var r = dist / maxDist; // Normalized distance (approx 0 to 1)

            var rand = Math.random();

            if (r < 0.18) {
                // Core: Super bright white and pink glowing stars
                if (rand < 0.6) {
                    existingColor.setRGB(1.0, 0.95, 0.9); // Bright white-yellow
                } else {
                    existingColor.setRGB(1.0, 0.5, 0.85); // Glowing hot pink
                }
            }
            else if (r < 0.45) {
                // Inner arms / disc: Magenta, violet, and deep hot pink
                if (rand < 0.55) {
                    existingColor.setRGB(0.9, 0.1, 0.6); // Hot Pink / Magenta
                } else if (rand < 0.8) {
                    existingColor.setRGB(0.6, 0.2, 0.9); // Purple / Violet
                } else {
                    existingColor.setRGB(1.0, 0.95, 0.9); // White hot stars scattered
                }
            }
            else {
                // Outer arms: Neon cyan and electric space blue
                if (rand < 0.6) {
                    existingColor.setRGB(0.0, 0.85, 1.0); // Vibrant Cyan
                } else if (rand < 0.85) {
                    existingColor.setRGB(0.25, 0.4, 1.0); // Electric Blue
                } else {
                    existingColor.setRGB(0.7, 0.2, 0.9); // Deep violet highlights
                }
            }
        }
    }

    function colorGasCloud(body, existingColor) {
        var dist = body.position.length();
        var maxDist = 2150.0;
        var r = dist / maxDist;

        if (r < 0.35) {
            // Inner nebula: magenta/violet
            existingColor.setHSL(0.8 + Math.random() * 0.1, 0.9, 0.45 + 0.15 * Math.random());
        } else {
            // Outer nebula: deep space blue/cyan
            existingColor.setHSL(0.55 + Math.random() * 0.15, 0.9, 0.4 + 0.2 * Math.random());
        }
    }



    function createSkyboxStuff(urls) {
        // Make a skybox

        var skyboxScene = new THREE.Scene();
        var skyboxCamera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            100,
            60000
        );

        var cubemap = new THREE.CubeTextureLoader()
            .setPath(galaxysim.cubemap_path)
            .load(urls);

        cubemap.format = THREE.RGBFormat;

        var skyboxShader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
        skyboxShader.uniforms['tCube'].value = cubemap; // apply textures to shader

        // create shader material
        var skyBoxMaterial = new THREE.ShaderMaterial( {
          fragmentShader: skyboxShader.fragmentShader,
          vertexShader: skyboxShader.vertexShader,
          uniforms: skyboxShader.uniforms,
          depthWrite: false,
          side: THREE.BackSide
        });

        // create skybox mesh
        var skybox = new THREE.Mesh(
          new THREE.BoxGeometry(50000,50000,50000),
          skyBoxMaterial
        );
        skyboxScene.add(skybox);

        galaxysim.skyBoxMaterial = skyBoxMaterial;

        return { scene: skyboxScene, camera: skyboxCamera };
    }


    function render_all(urls) {
        function toggleHUDPanel(forceState) {
            var $hud = $('#hud_panel');
            var isMobile = window.innerWidth <= 768;
            if (isMobile) {
                $hud.show();
                if (forceState !== undefined) {
                    $hud.toggleClass('open', forceState);
                } else {
                    $hud.toggleClass('open');
                }
            } else {
                $hud.removeClass('open');
                if (forceState !== undefined) {
                    if (forceState) $hud.fadeIn(300);
                    else $hud.fadeOut(300);
                } else {
                    $hud.fadeToggle(300);
                }
            }
        }

        var renderer = new THREE.WebGLRenderer({antialias: false});
        renderer.setSize( 300, 200 );
        renderer.setClearColor(0x000000);
        renderer.sortObjects = false;
        document.body.appendChild(renderer.domElement);
        var scene = new THREE.Scene();

        

        var camera = new THREE.PerspectiveCamera(
            45,         // Field of view
            1200 / 800,  // Aspect ratio
            .0001 * galaxysim.MILKY_WAY_DIAMETER * galaxysim.UNIVERSE_SCALE,         // Near
            20 * galaxysim.MILKY_WAY_DIAMETER * galaxysim.UNIVERSE_SCALE       // Far
        );

        var controls = new THREE.OrbitControls( camera, renderer.domElement );

        controls.minDistance = 300;
        controls.maxDistance = 7000;

        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.2;

        camera.position.set(2870, 1070, -275);

        var skybox = createSkyboxStuff(urls);
        galaxysim.updateViewport(window, renderer, camera, skybox);
        window.addEventListener('resize', function() {
            galaxysim.updateViewport(window, renderer, camera, skybox)}
        );


        var materials = galaxysim.createAllMaterials();

        var FAR_UPDATE_PERIOD = 2.0; // How long between updates of far interactions
        var FAR_BODYCOUNT_PER_60FPS_FRAME = Math.max(1, Math.ceil(galaxysim.BODYCOUNT / 
            (120*FAR_UPDATE_PERIOD)));

        var blackholearray =[]
        var bodies = galaxysim.createGravitySystem(galaxysim.BODYCOUNT, 
            galaxysim.TYPICAL_STAR_MASS, galaxysim.NUMBLACKHOLES, blackholearray);
        for (var i = 0; i < galaxysim.NUMBLACKHOLES; i ++ ){
            blackholearray.push(bodies[i].position)
        }
        var bodiesVfx = galaxysim.createGravitySystem(galaxysim.BODYCOUNT_VFX, 
            0.3*galaxysim.TYPICAL_STAR_MASS, 0, blackholearray);
        var bodiesGas = galaxysim.createGravitySystem(galaxysim.BODYCOUNT_GAS, 
            0.2*galaxysim.TYPICAL_STAR_MASS, 0, blackholearray);


        var mesh = new THREE.PointCloud( createCloudGeometryFromBodies(bodies), 
            materials.bright );
        mesh.frustumCulled = false;
        galaxysim.mesh = mesh;
        var meshVfx = new THREE.PointCloud( createCloudGeometryFromBodies(bodiesVfx), 
            materials.brightSmall );
        meshVfx.frustumCulled = false;
        galaxysim.meshVfx = meshVfx;
        var meshGas = new THREE.PointCloud( createCloudGeometryFromBodies(bodiesGas), 
            materials.gasCloud );
        meshGas.frustumCulled = false;
        galaxysim.meshGas = meshGas;


        colorParticles(bodies, mesh, colorStar);
        colorParticles(bodiesVfx, meshVfx, colorStar);
        colorParticles(bodiesGas, meshGas, colorGasCloud);

        // Add desired order of rendering
        scene.add(meshGas);
        scene.add(mesh);
        scene.add(meshVfx);

        var CAMERA_MODES = {ORBIT: 0, CUSTOM: 2}
        var cameraMode = CAMERA_MODES.CUSTOM;

        var TIME_SCALE = Math.pow(10, 9);
        var timeScale = TIME_SCALE;

        // reset initial parameters (in case of restart of scene)
        galaxysim.GRAVITATIONAL_CONSTANT = 0.5 * galaxysim.G;
        galaxysim.G_SCALE = 0.5; 
               
        var PAUSED = false;
        var GRAVITY_OVERRIDE = false;

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
                if (window.toggleMusicPlayback) window.toggleMusicPlayback();
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
            } else if (_.contains([104], e.which)) {    // 'h' key
                toggleHUDPanel();
            }
        });

        function makeCameraTransition(transitionFunc) {
            $("#loading_cover").fadeIn(300, function() {
                transitionFunc();
                $("#loading_cover").fadeOut(300);
            });
        }

        function render() {
            renderer.autoclear = false;
            renderer.autoClearColor = false;
            skybox.camera.quaternion.copy(camera.quaternion);
            renderer.render(skybox.scene, skybox.camera);
            renderer.render(scene, camera);
        }

        var lastT = 0.0;
        var accumulatedFarDt = 0.0;
        var update_counter = 0;
        var accumulatedRealDtTotal = 0.0;
        var gravityApplicator = galaxysim.createTwoTierSmartGravityApplicator(bodies, bodies);
        var gravityApplicatorVfx = galaxysim.createTwoTierSmartGravityApplicator(bodiesVfx, bodies);
        var gravityApplicatorGas = galaxysim.createTwoTierSmartGravityApplicator(bodiesGas, bodies);
        gravityApplicator.updateForces(bodies.length);
        gravityApplicatorVfx.updateForces(bodiesVfx.length);
        gravityApplicatorGas.updateForces(bodiesGas.length);

        var started = false;
        THREE.DefaultLoadingManager.onProgress = function (item, loaded, total) {
            var loadingMessage = `Never apologize for burning too brightly or collapsing 
                                 into yourself. That is how galaxies are made.`;
            $("#loading_indicator .loading_text").text(loadingMessage);
            $("#loading_indicator .loading_bar").width(100*loaded/total + "%");
            if(loaded === total && !started) {
                started = true;
                $("#loading_indicator").delay(200).fadeOut(400);
                $("#loading_cover").delay(600).fadeOut(1000);
                $("#footnote").delay(5000).fadeOut(2000);
                startGalaxySimulation();
            }
        };

        function flattenToDisk(bodies) {
            for (var i=0; i < bodies.length; i++) {
                if (Math.abs(bodies[i].position.y) > 100 &&
                  (bodies[i].position.y > 0 && bodies[i].velocity.y > 0
                  || bodies[i].position.y < 0 && bodies[i].velocity.y < 0))
                    bodies[i].velocity.y /= 2;
            }
        }

        function startGalaxySimulation() {
            function update(t) {
                var dt = (t - lastT) * 0.001;
                dt = Math.min(1 / 60.0, dt); // Clamp
                accumulatedRealDtTotal += dt;

                var positionScale = 1.5 * galaxysim.MILKY_WAY_DIAMETER * galaxysim.UNIVERSE_SCALE;

                if (cameraMode === CAMERA_MODES.ORBIT) {
                    var cameraRotationSpeed = 0.01; // default: 0.03
                    camera.position.copy(bodies[0].position);
                    camera.position.add(new THREE.Vector3(
                        Math.cos(accumulatedRealDtTotal*cameraRotationSpeed) * positionScale,
                        0.5 * positionScale * 0.7 * Math.sin(accumulatedRealDtTotal * 0.2),
                        Math.sin(accumulatedRealDtTotal*cameraRotationSpeed) * positionScale
                    ));

                    var cameraLookatRotationSpeed = 0; // default: 0.01
                    var cameraLookAtScale = 0.2 * positionScale;
                    var cameraLookAtPos = new THREE.Vector3().copy(bodies[0].position);
                    cameraLookAtPos.add(new THREE.Vector3(
                        Math.cos(accumulatedRealDtTotal*cameraLookatRotationSpeed) * cameraLookAtScale, 
                        -positionScale * 0.07 * Math.sin(accumulatedRealDtTotal * 0.2), 
                        Math.sin(accumulatedRealDtTotal*cameraLookatRotationSpeed) * cameraLookAtScale
                    ))
                    camera.lookAt(cameraLookAtPos);
                }


                dt *= timeScale;
                accumulatedFarDt += dt;

                // This step updates positions
                galaxysim.PointMassBody.velocityVerletUpdate(bodies, dt, true);
                galaxysim.PointMassBody.velocityVerletUpdate(bodiesVfx, dt, true);
                galaxysim.PointMassBody.velocityVerletUpdate(bodiesGas, dt, true);

                for(var i=0, len=bodies.length; i<len; i++) {
                    mesh.geometry.vertices[i].copy(bodies[i].position);
                }

                for(var i=0, len=bodiesVfx.length; i<len; i++) {
                    meshVfx.geometry.vertices[i].copy(bodiesVfx[i].position);
                }

                for(var i=0, len=bodiesGas.length; i<len; i++) {
                    meshGas.geometry.vertices[i].copy(bodiesGas[i].position);
                }

                if (accumulatedFarDt >= TIME_SCALE / 60.0) {
                    gravityApplicator.updateForces(FAR_BODYCOUNT_PER_60FPS_FRAME);
                    gravityApplicatorVfx.updateForces(FAR_BODYCOUNT_PER_60FPS_FRAME*20);
                    gravityApplicatorGas.updateForces(FAR_BODYCOUNT_PER_60FPS_FRAME);
                    accumulatedFarDt -= TIME_SCALE/60;
                    update_counter = (update_counter + 1) % 100;
                }

                if (update_counter === 0 && galaxysim.G_SCALE < 2.0) {
                    if (!GRAVITY_OVERRIDE) 
                        galaxysim.GRAVITATIONAL_CONSTANT = galaxysim.G_SCALE * galaxysim.G;
                    galaxysim.G_SCALE += 0.05;
                    mesh.material.opacity += 0.034;
                    meshVfx.material.opacity += 0.034;
                }

                if (update_counter === 0) {
                    flattenToDisk(bodies);
                    flattenToDisk(bodiesVfx);
                    flattenToDisk(bodiesGas);
                }

                galaxysim.PointMassBody.velocityVerletUpdate(bodies, dt, false);
                galaxysim.PointMassBody.velocityVerletUpdate(bodiesVfx, dt, false);
                galaxysim.PointMassBody.velocityVerletUpdate(bodiesGas, dt, false);

                mesh.geometry.verticesNeedUpdate = true;
                meshVfx.geometry.verticesNeedUpdate = true;
                meshGas.geometry.verticesNeedUpdate = true;
                lastT = t;
            };

            function handleAnimationFrame(dt) {
                if (!PAUSED) {
                    update(dt);
                    controls.update();
                }
                render();
                window.requestAnimationFrame(handleAnimationFrame);
            };
            window.requestAnimationFrame(handleAnimationFrame);

        };

        // Initialize our custom glassmorphic HUD controls
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

            // Sync slide inputs dynamically if the simulation updates them internally (fade-in)
            var checkOpacityInterval = setInterval(function() {
                if (!started) return;
                $slideLarge.val(mesh.material.opacity.toFixed(1));
                $valLarge.text(mesh.material.opacity.toFixed(1));
                $slideSmall.val(meshVfx.material.opacity.toFixed(1));
                $valSmall.text(meshVfx.material.opacity.toFixed(1));
                $slideGravity.val((galaxysim.GRAVITATIONAL_CONSTANT / galaxysim.G).toFixed(1));
                $valGravity.text((galaxysim.GRAVITATIONAL_CONSTANT / galaxysim.G).toFixed(1));
                
                if (mesh.material.opacity >= 0.9) {
                    clearInterval(checkOpacityInterval);
                }
            }, 500);

            // Background selectors
            $('.bg-btn').on('click', function() {
                var index = parseInt($(this).data('index'));
                $('.bg-btn').removeClass('active');
                $(this).addClass('active');

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

                    camera.position.set(2870, 1070, -275);
                    controls.target.set(0, 0, 0);
                    
                    galaxysim.GRAVITATIONAL_CONSTANT = 0.5 * galaxysim.G;
                    galaxysim.G_SCALE = 0.5;
                    $slideGravity.val(0.5);
                    $valGravity.text("0.5");
                    GRAVITY_OVERRIDE = false;
                });
            });

            // Keyboard shortcut modal
            var $shortcutsModal = $('#shortcuts_modal');
            $('#btn_shortcuts').on('click', function() {
                $shortcutsModal.addClass('open');
            });
            $('#btn_close_modal, #shortcuts_modal').on('click', function(e) {
                if (e.target === this) {
                    $shortcutsModal.removeClass('open');
                }
            });

            // Music Player Controls
            var $btnMusicPlay = $('#btn_music_play');
            var $btnMusicMute = $('#btn_music_mute');
            var $slideMusicVol = $('#slide_music_vol');
            var $musicPanel = $('#music_panel');

            function toggleMusicPlayback() {
                if (!galaxysim.audio) {
                    galaxysim.audio = new Audio('assets/mysterious_music.mp3');
                    galaxysim.audio.loop = true;
                    galaxysim.audio.volume = parseFloat($slideMusicVol.val());
                    
                    galaxysim.audio.addEventListener('play', function() {
                        $btnMusicPlay.text('⏸');
                        $musicPanel.addClass('playing');
                    });
                    
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
                    $btnMusicMute.text(galaxysim.audio.muted ? '🔇' : '🔊');
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

            // Mobile HUD toggle and close buttons
            $('#btn_hud_toggle').on('click', function() {
                toggleHUDPanel(true);
            });
            $('#btn_hud_close').on('click', function() {
                toggleHUDPanel(false);
            });

            // Expose UI Sync helper
            window.syncHUDControls = function() {
                updatePlayPauseUI();
                $btnAutoRotate.toggleClass('active', controls.autoRotate);
                updateCameraUI();
            };
        }

        initializeModernUI();
    };

    $(document).ready(function() {
        render_all(galaxysim.milky_way);
    });
})();
