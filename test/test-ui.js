const assert = require('assert');

// Mock browser globals
global.window = {};
global.document = {
    ready: function(cb) { cb(); }
};
global.navigator = { userAgent: 'node' };

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

global.window.galaxysim = global.galaxysim;

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
    contains: (arr, val) => arr.includes(val),
    map: (arr, fn) => arr.map(fn)
};

// Mock THREE
global.THREE = {
    Vector3: class {
        constructor(x=0,y=0,z=0) { this.x = x; this.y = y; this.z = z; }
        set(x,y,z) { this.x = x; this.y = y; this.z = z; return this; }
        add(other) { this.x += other.x; this.y += other.y; this.z += other.z; return this; }
        copy(other) { this.x = other.x; this.y = other.y; this.z = other.z; return this; }
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
    PerspectiveCamera: class {
        constructor() {
            this.position = {
                set: function() {},
                copy: function() {},
                add: function() {}
            };
        }
        lookAt() {}
    },
    WebGLRenderer: class {
        setSize() {}
        setClearColor() {}
        domElement = {};
    },
    OrbitControls: class {
        constructor() {
            this.target = { set: function() {} };
        }
    },
    CubeTextureLoader: class { setPath() { return this; } load() { return {}; } },
    ShaderMaterial: class {},
    ShaderLib: { cube: { fragmentShader: '', vertexShader: '', uniforms: { tCube: { value: { dispose() {} } } } } },
    BoxGeometry: class {},
    Mesh: class {},
    ImageUtils: { loadTexture: () => ({}) },
    DefaultLoadingManager: {}
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
