import './styles.css';
import * as THREE from 'three';
import { OrbitControls, STLLoader } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();

function main() {
  scene.background = new THREE.Color('gray');

  renderer.setSize(1600, 750);
  document.querySelector('.model-3d')?.appendChild(renderer.domElement);

  new OrbitControls(camera, renderer.domElement);

  let light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 0, 10);
  scene.add(light);

  let light2 = new THREE.DirectionalLight(0xffffff);
  light2.position.set(0, 0, -10);
  scene.add(light2);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.onload = () => {
  let loader = new STLLoader();
  loader.load('./upperjaw.stl', (model) => {
    const object = new THREE.Mesh(
      model,
      new THREE.MeshLambertMaterial({ color: 'red' })
    );

    scene.add(object);

    main();
  });
};
