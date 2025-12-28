const canvas = document.querySelector('#scene');

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

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(5, 5, 10);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
fillLight.position.set(-5, -3, 5);
scene.add(fillLight);

// Load Font & Create Text
const loader = new THREE.FontLoader();
loader.load(
  'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
  (font) => {
    const geometry = new THREE.TextGeometry('SEVAK', {
      font: font,
      size: 3,
      height: 0.9,
      curveSegments: 24,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.04,
      bevelOffset: 0,
      bevelSegments: 10
    });

    geometry.center();

    const material = new THREE.MeshStandardMaterial({
      color: 0x47243C,
      metalness: 0.4,
      roughness: 0.25
    });

    const textMesh = new THREE.Mesh(geometry, material);
    scene.add(textMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Animate
    const animate = () => {
      textMesh.rotation.y += (mouseX - textMesh.rotation.y) * 0.05;
      textMesh.rotation.x += (-mouseY - textMesh.rotation.x) * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
  }
);

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
