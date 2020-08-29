import * as THREE from './three/build/three.module.js';
import { EffectComposer } from './three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from './three/examples/jsm/postprocessing/GlitchPass.js';

var camera, scene, renderer;
var composer;
var glitchPass;

main();
animate();

function main() {

    // scene instance
    scene = new THREE.Scene();

    // camera instance (OPTIONS: FOV, Aspect Ratio, near plane, far plane)
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;

    // renderer (webgl,css2d,css3d,svg)
    renderer = new THREE.WebGLRenderer({antialias: true});  /* antialias to eliminate img tearing */
    renderer.setPixelRatio(window.devicePixelRatio);        // for high DPI device
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#000');
    document.body.appendChild(renderer.domElement);         // append child to renderer DOM element - create canvar with renderer settings

    
    // object
    var texture = new THREE.TextureLoader().load('../logo.png');

    var geometry = new THREE.PlaneBufferGeometry( 150, 50 );                            // def shape -> plane
    var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true});     // material == texture == img
    var mesh = new THREE.Mesh(geometry, material);                                      // mesh = geometry + material
    
    scene.add(mesh);

    // postprocessing
    composer = new EffectComposer(renderer);
    composer.addPass( new RenderPass(scene, camera) );

    glitchPass = new GlitchPass();
    composer.addPass( glitchPass );


    // make it responsive
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth,window.innerHeight); // set to window dimensions
        camera.aspect = window.innerWidth / window.innerHeight; // readjust the aspect ratio

        camera.updateProjectionMatrix();                        // keep updating
    })

}

function animate() {
    requestAnimationFrame(animate);                             // casuses the renderer to draw the scene everytime the screen refreshes at 60hz
    composer.render();

}