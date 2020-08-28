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

// def shape and material
var geometry = new THREE.SphereGeometry(1,10,10);
var material = new THREE.MeshLambertMaterial({color: 0x266CAA});
// shape + material
var mesh = new THREE.Mesh(geometry, material);

// add light
var light = new THREE.PointLight(0XFFFFFF, 1.75, 500);
// set light x,y,z cordinates
light.position.set(10,0,25)
scene.add(light);

// add mesh to the scene
scene.add(mesh);

// render method on scene and camera
renderer.render(scene,camera);
