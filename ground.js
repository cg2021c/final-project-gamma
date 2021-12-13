canvas = document.getElementById("mainCanvas");

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//camera
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 100 );
camera.position.set( 50, 20, 0 );
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

//wall
var loader = new THREE.GLTFLoader();
loader.load('room.gltf', function(gltf){
  room = gltf.scene;
  scene.add(gltf.scene);
});

//controls
// const controls = new PointerLockControls(camera, renderer.domElement);
// var clock = new THREE.Clock();

function drawScene(){
      renderer.render( scene, camera );
      requestAnimationFrame(drawScene);
};

drawScene();
