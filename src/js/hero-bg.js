import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#hero-canvas'),
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.PlaneGeometry(20, 10, 128, 128);

const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#0b5394") },
        uColor2: { value: new THREE.Color("#2E8B57") }
    },
    vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        
        void main() {
            vUv = uv;
            vec3 pos = position;
            float freq = 0.5;
            float amp = 0.5;
            pos.z += sin(pos.x * freq + uTime) * amp;
            pos.z += sin(pos.y * freq * 0.8 + uTime * 1.2) * amp * 0.5;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uTime;
        
        void main() {
            vec3 color = mix(uColor1, uColor2, mixer);
            gl_FragColor = vec4(color, 0.12); // Slightly more visible for light mode
        }
    `,
    transparent: true,
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -Math.PI * 0.2;
scene.add(mesh);

camera.position.z = 5;

const animate = () => {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value += 0.01;
    renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
