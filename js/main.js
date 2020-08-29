import * as THREE from './three/build/three.module.js';
import { EffectComposer } from './three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from './three/examples/jsm/postprocessing/GlitchPass.js';

var camera, scene, renderer;
var composer;
var glitchPass;

init();
animate();

function init() {

    //scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;

    // renderer
    renderer = new THREE.WebGLRenderer({antialias: true});  /* antialias to eliminate img tearing */
    renderer.setPixelRatio(window.devicePixelRatio);        // for high DPI device
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#000');
    document.body.appendChild(renderer.domElement);

    
    // object
    var texture = new THREE.TextureLoader().load('../logo.png');

    var geometry = new THREE.PlaneBufferGeometry( 150, 50 );                            // plane
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
    requestAnimationFrame(animate);
    composer.render();

}

/* ============= [ END ] ============= */

/* ==========================
    below is my learning function - may be ignored
========================== */

var learn = function() {

    // scene instance
    var scene = new THREE.Scene();

    // camera instance - FOV, Aspect Ratio, near plane, far plane
    var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.z = 5;

    // renderer (webgl,css2d,css3d,svg)
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#e5e5e5"); // set basic bg color
    renderer.setSize(window.innerWidth,window.innerHeight);

    // append child to renderer DOM element - create canvar with renderer settings
    document.body.appendChild(renderer.domElement);

    // responsive
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth,window.innerHeight); // set to window dims
        camera.aspect = window.innerWidth / window.innerHeight; // readjust the aspect ratio

        camera.updateProjectionMatrix();
    })

    // add sphere
    // def shape and material

    var sphere_geometry = new THREE.SphereGeometry(1,50,50); // shape
    var sp_material = new THREE.MeshLambertMaterial({color: 0x266CAA}); // material
    var sp_mesh = new THREE.Mesh(sphere_geometry, sp_material); // shape + material

    // add box
    var box_geometry = new THREE.BoxGeometry(1,1,1);
    var box_mesh = new THREE.Mesh(box_geometry, sp_material);

    // add light
    var light = new THREE.PointLight(0XFFFFFF, 1.75, 500);
    light.position.set(10,0,25) // set light x,y,z cordinates

    // add mesh and light to the scene
    scene.add(box_mesh, light);

    // render funct on scene and camera
    var render = function() {
        requestAnimationFrame(render); // casuses the renderer to draw the scene everytime the screen refreshes at 60hz
        renderer.render(scene,camera);

        //box_mesh.rotation.x += 0.05;
        //box_mesh.scale.x += 0.001;
    }
    render();
}