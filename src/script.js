import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Clock } from 'three';
// // Loading

// const textureLoader = new THREE.TextureLoader();
// const normalMap = textureLoader.load('/textures/SkinColor_metallicRoughness.png');
// // const color = textureLoader.load('/textures/ring1_low_defaultMat_BaseColor.png')
// // const roughness = textureLoader.load('/textures/ring1_low_defaultMat_Roughness.png')
// // const metalness = textureLoader.load('/textures/ring1_low_defaultMat_Metalic.png')

// // Debug
// const gui = new dat.GUI();

// // Canvas
// const canvas = document.querySelector('canvas.webgl');

// // Scene
// const scene = new THREE.Scene();

// scene.background = new THREE.Color(0x4c4c4c);

// // Objects
// const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

// const loader = new GLTFLoader();

// // const parrotData = loader.loadAsync('/scene.gltf');

// // console.log('Squaaawk!', parrotData);

// loader.load('/scene.gltf', (gltf) => {
// 	scene.add(gltf.scene);
// 	console.log(gltf)

// });

// const material = new THREE.MeshStandardMaterial();
// material.metalic = normalMap;
// // material.metalness = metalness;
// // material.roughness = roughness;
// // material.color = color;

// // Mesh
// const sphere = new THREE.Mesh(geometry);

// // Lights

// var hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
// scene.add(hemiLight);

// // var spotLight = new THREE.SpotLight(0xffffff);
// // spotLight.position.set(-80, 60, -50);

// // spotLight.castShadow = true;

// // scene.add(spotLight);

// /**
//  * Sizes
//  */
// const sizes = {
// 	width: window.innerWidth,
// 	height: window.innerHeight,
// };

// window.addEventListener('resize', () => {
// 	// Update sizes
// 	sizes.width = window.innerWidth;
// 	sizes.height = window.innerHeight;

// 	// Update camera
// 	camera.aspect = sizes.width / sizes.height;
// 	camera.updateProjectionMatrix();

// 	// Update renderer
// 	renderer.setSize(sizes.width, sizes.height);
// 	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(
// 	45,
// 	sizes.width / sizes.height,
// 	1,
// 	1000
// );
// camera.position.x = 0;
// camera.position.y = 0;
// camera.position.z = -60;
// scene.add(camera);

// const controls = new OrbitControls(camera, canvas);
// controls.update();

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
// 	canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// /**
//  * Animate
//  */

// const clock = new THREE.Clock();

// const tick = () => {
// 	const elapsedTime = clock.getElapsedTime();

// 	// Update objects
// 	sphere.rotation.y = 0.5 * elapsedTime;

// 	// Update Orbital Controls
// 	// controls.update()

// 	// Render
// 	renderer.render(scene, camera);

// 	// Call tick again on the next frame
// 	window.requestAnimationFrame(tick);
// };

// tick();

let scene, camera, renderer, controls, light, model;

function init() {
	scene = new THREE.Scene();
	// scene.background = new THREE.Color(0x404040);
	// const loader = new THREE.TextureLoader();
	// loader.load('/background.jpg', function (texture) {
	// 	scene.background = texture;
	// });


	camera = new THREE.PerspectiveCamera(
		60,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.set(0, 0, 0.3);

	// scene.add(new THREE.AxesHelper(500));

	light = new THREE.SpotLight(0xffa95c, 16);
	light.position.set(0,0.2, 0.3);
	// light.castShadow = true;
	// light.shadow.bias = -0.0001;
	// light.shadow.mapSize.width = 1024 * 4;
	// light.shadow.mapSize.height = 1024 * 4;
	scene.add(light);

	const hemiLight = new THREE.HemisphereLight(0xfffff, 2);
	scene.add(hemiLight);

	renderer = new THREE.WebGLRenderer();
	renderer.toneMapping = THREE.ReinhardToneMapping;
	renderer.toneMappingExposure = 2.6;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);

	controls = new OrbitControls(camera, renderer.domElement);

	// var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

	new GLTFLoader().load('/scene.gltf', (result) => {
		model = result.scene.children[0];
		model.position.set(0.1, 0, 0);
		// model.traverse((n) => {
		// 	if (n.isMesh) {
		// 		n.castShadow = true;
		// 		n.receiveShadow = true;
		// 		if (n.material.map) n.material.map.anisotropy = 1;
		// 	}
		// });
		scene.add(model);

		animate();
	});
}
function animate() {
	renderer.render(scene, camera);
	// light.position.set(
	// 	camera.position.x + 10,
	// 	camera.position.y + 10,
	// 	camera.position.z + 10
	// );
	// model.rotation.z += 0.005;
	requestAnimationFrame(animate);
}
init();
