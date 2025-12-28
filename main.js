const canvas = document.getElementById('scene');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 18;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(5, 5, 10);
scene.add(keyLight);

// Text
const text = new TroikaThreeText.Text();
text.text = 'SEVAK';
text.fontSize = 3;
text.color = 0x47243C;
text.anchorX = 'center';
text.anchorY = 'middle';
text.position.set(0, 0, 0);
text.material.metalness = 0.4;
text.material.roughness = 0.25;

scene.add(text);
text.sync();

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 1.2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 1.2;
});

// Animate
function animate() {
  text.rotation.y += (mouseX - text.rotation.y) * 0.05;
  text.rotation.x += (-mouseY - text.rotation.x) * 0.05;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

