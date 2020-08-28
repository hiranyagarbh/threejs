//Scene
var scene = new THREE.Scene();

// Camera - FOV, Aspect Ratio, near plane, far plane
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

// Renderer (webgl,css2d,css3d,svg)
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5"); // set basic bg color
renderer.setSize(window.innerWidth,window.innerHeight);

// append child to renderer DOM element - create canvar with renderer settings
document.body.appendChild(renderer.domElement);

// responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight); // set to window dims
    camera.aspect = window.innerWidth / window.innerHeight; // readjust the aspect ratio

    camera.updateProjectMatrix();
})

// redner method on scene and camera
renderer.render(scene,camera);

