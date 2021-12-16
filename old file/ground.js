canvas = document.getElementById("mainCanvas");

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//camera
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 100 );
camera.position.set( 0, 20, 50 );
camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

// texture
const texture = new THREE.TextureLoader().load( 'floor.png' );
const graniteMaterial = new THREE.MeshBasicMaterial({map: texture});

//ground
var mesh = new THREE.Mesh(new THREE.PlaneGeometry(200,200), graniteMaterial)
mesh.rotation.x = - Math.PI /2;
scene.add(mesh);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(400,400);

//grid
var grid = new THREE.GridHelper( 200, 40, 0x000000, 0x000000 );
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add( grid );

//light
var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.5 );
hemiLight.position.set( 0, 10, 0 );
scene.add( hemiLight );

var dirLight = new THREE.DirectionalLight( 0xD9EBFA, 0.8 );
dirLight.position.set( 0, 10, 10 );
scene.add( dirLight );

// cube
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial( {color: 0xffffff} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//material dinding
const wallTexture = new THREE.TextureLoader().load('models/wall-texture.jpg');
const wallMaterial = new THREE.MeshPhongMaterial({map: wallTexture});

var geometry1 = new THREE.BoxGeometry( 20, 5, 0.2 );
var wallz = new THREE.Mesh( geometry1, wallMaterial );
wallz.position.set(0,2.5,7);
scene.add( wallz );
wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(400,400);

var geometry2 = new THREE.BoxGeometry( 20, 5, 0.2 );
var wallz1 = new THREE.Mesh( geometry2, material );
wallz1.position.set(0,2.5,-7);
scene.add( wallz1 );

var geometry3 = new THREE.BoxGeometry( 0.2, 5, 14.2);
var wallx = new THREE.Mesh( geometry3, material );
wallx.position.set(10,2.5,0);
scene.add( wallx );

var geometry4 = new THREE.BoxGeometry( 0.2, 5, 14.2 );
var wallx1 = new THREE.Mesh( geometry4, material );
wallx1.position.set(-10,2.5,0);
scene.add( wallx1 );

// //wall
// var loader = new THREE.GLTFLoader();
// loader.load('/models/room/room.gltf', function(gltf){
//   room = gltf.scene;
//   scene.add(gltf.scene);
  
// });

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

function drawScene(){
      renderer.render( scene, camera );
      requestAnimationFrame(drawScene);
};

drawScene();
