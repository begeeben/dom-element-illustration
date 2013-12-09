var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.domElement: A canvas element to draw WebGL output
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
// new THREE.PerspectiveCamera(fov, aspect, near, far)
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, 3000);

// Load ufo image.
// var ufoMap = THREE.ImageUtils.loadTexture('models/ufo/textures/ufo.png');
// var ufoMaterial = new THREE.MeshPhongMaterial({
//     map: ufoMap
// });
var material = new THREE.MeshLambertMaterial({color: 0x996600});
// Load ufo 3D JSON model.
var ufo;
var loader = new THREE.JSONLoader();
loader.load('scripts/test.js', function(geometry) {
    ufo = new THREE.Mesh(geometry, material);
    ufo.scale.normalize();
    scene.add(ufo);
});

var geometry = new THREE.CubeGeometry(1, 1, 1);
//                         // var material = new THREE.MeshBasicMaterial({color: 0x996600});

                        var mesh1 = new THREE.Mesh(geometry, material);
                        // mesh1.position.set(0, 0, 0);
                        scene.add(mesh1);

// Directional light affects objects using MeshLambertMaterial or MeshPhongMaterial.
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1);
scene.add(light);

var clock = new THREE.Clock();

function render() {
    requestAnimationFrame(render);

    if (ufo) {
        ufo.rotation.y += 0.01;
        ufo.rotation.x = Math.sin(clock.getElapsedTime()) / 2;
        // ufo.scale = Math.sin(clock.getElapsedTime()) / 2;
    }

    // if (mesh1) {
    //     mesh1.scale.add(new THREE.Vector3( 1, 1, 1 ));
    // }
    renderer.render(scene, camera);
}

render();