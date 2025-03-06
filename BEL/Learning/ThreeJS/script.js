var panel = document.getElementById("panel");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, panel.offsetWidth / panel.offsetHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( panel.offsetWidth, panel.offsetHeight );
renderer.setAnimationLoop( animate );

const geometry = new THREE.BoxGeometry( 1, 1, 2 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

const geometry1 = new THREE.BoxGeometry( .5, .5, .5 );
const material1 = new THREE.MeshBasicMaterial( { color: "red", wireframe: false } );

const cube = new THREE.Mesh( geometry, material );
const cube1 = new THREE.Mesh( geometry1, material1 );

scene.add( cube );
scene.add( cube1 );

cube1.position.x=5;
cube1.rotation.x=45;

camera.position.z = 10;

function animate() {
	
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	
	renderer.render( scene, camera );
	
}

document.onkeydown = (e)=>{
	if(e.code = "Space"){
		myAnimate(cube1);
	}
}

function myAnimate(obj) {
	
	obj.rotation.x += 0.125;
	obj.rotation.y += 0.125;
	
	renderer.render( scene, camera );
	
}

panel.appendChild( renderer.domElement );