import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ThreeBackgroundCanvasProps {
  activeSlide?: number;
}

export const ThreeBackgroundCanvas: React.FC<ThreeBackgroundCanvasProps> = ({ activeSlide = 0 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);
  const forgeObjectRef = useRef<THREE.Mesh | null>(null);
  const ringsRef = useRef<THREE.Group | null>(null);
  const cursorLightRef = useRef<THREE.PointLight | null>(null);

  // Target colors for different slides (Sophisticated Monochrome & Silver Tones)
  const slideColors = [
    { primary: 0xffffff, secondary: 0x94a3b8, bgTint: 0x080c14 }, // Slide 0: Crisp White & Slate
    { primary: 0xe2e8f0, secondary: 0x64748b, bgTint: 0x060b14 }, // Slide 1: Silver Portfolio
    { primary: 0xf8fafc, secondary: 0x94a3b8, bgTint: 0x060e18 }, // Slide 2: White Process
    { primary: 0xe2e8f0, secondary: 0x64748b, bgTint: 0x090b18 }, // Slide 3: Silver Services
    { primary: 0xffffff, secondary: 0x94a3b8, bgTint: 0x080c18 }, // Slide 4: White Packages
    { primary: 0xe2e8f0, secondary: 0x475569, bgTint: 0x080e1a }  // Slide 5: Silver Contact
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x080c14, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 22;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // --- Particles Constellation ---
    const particleCount = 850;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorObj = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 70;

      const lightness = 0.6 + Math.random() * 0.4;
      colorObj.setHSL(0, 0, lightness);
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture creation
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.4, 'rgba(226,232,240,0.8)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.6,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const particlesMesh = new THREE.Points(geometry, particleMaterial);
    scene.add(particlesMesh);
    particlesMeshRef.current = particlesMesh;

    // --- Central 3D Wireframe Object ---
    const forgeGeo = new THREE.IcosahedronGeometry(6, 2);
    const forgeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      metalness: 0.8,
      roughness: 0.2
    });
    const forgeMesh = new THREE.Mesh(forgeGeo, forgeMat);
    scene.add(forgeMesh);
    forgeMesh.position.set(12, -2, -5);
    forgeObjectRef.current = forgeMesh;

    // --- Orbital Concentric Rings ---
    const ringsGroup = new THREE.Group();
    for (let r = 0; r < 3; r++) {
      const ringGeo = new THREE.TorusGeometry(8 + r * 3, 0.03, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.22 - r * 0.05
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3 + r * 0.2;
      ringMesh.rotation.y = r * 0.5;
      ringsGroup.add(ringMesh);
    }
    scene.add(ringsGroup);
    ringsGroup.position.set(12, -2, -5);
    ringsRef.current = ringsGroup;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 3, 50);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Interactive Cursor Light following mouse in 3D
    const cursorLight = new THREE.PointLight(0xffffff, 3, 30);
    scene.add(cursorLight);
    cursorLightRef.current = cursorLight;

    // Mouse Tracking Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.001;

      // Project mouse into 3D light position
      if (cursorLightRef.current) {
        cursorLightRef.current.position.x = (e.clientX / window.innerWidth - 0.5) * 30;
        cursorLightRef.current.position.y = -(e.clientY / window.innerHeight - 0.5) * 20;
        cursorLightRef.current.position.z = 10;
      }
    };

    const handleMouseClick = () => {
      // Pulse animation on click
      if (forgeObjectRef.current) {
        gsap.to(forgeObjectRef.current.scale, {
          x: 1.25,
          y: 1.25,
          z: 1.25,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    // --- GSAP ScrollTrigger for 3D Background Reactivity ---
    let scrollProgress = 0;

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgress = self.progress;
      }
    });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse tracking
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Particles respond to mouse + scroll progress
      if (particlesMeshRef.current) {
        particlesMeshRef.current.rotation.y = elapsedTime * 0.03 + targetX * 1.5 + scrollProgress * Math.PI;
        particlesMeshRef.current.rotation.x = elapsedTime * 0.01 + targetY * 1.5;
      }

      // Central Forge mesh rotates & floats
      if (forgeObjectRef.current) {
        forgeObjectRef.current.rotation.x = elapsedTime * 0.15 + targetY;
        forgeObjectRef.current.rotation.y = elapsedTime * 0.2 + targetX;
        forgeObjectRef.current.position.y = -2 + Math.sin(elapsedTime * 0.8) * 0.8 + scrollProgress * 2;
      }

      // Rings rotate dynamically
      if (ringsRef.current) {
        ringsRef.current.rotation.z = elapsedTime * 0.08 + scrollProgress * 2;
        ringsRef.current.rotation.y = elapsedTime * 0.05 + targetX;
      }

      // Camera parallax tilt based on mouse position & scroll
      camera.position.x += (targetX * 8 - camera.position.x) * 0.04;
      camera.position.y += (-targetY * 8 - camera.position.y) * 0.04;
      camera.position.z = 22 - scrollProgress * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!renderer || !container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('resize', handleResize);
      scrollTriggerInstance.kill();
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Handle active slide color transitions
  useEffect(() => {
    const config = slideColors[activeSlide % slideColors.length];
    if (forgeObjectRef.current && ringsRef.current && sceneRef.current) {
      const targetColor = new THREE.Color(config.primary);

      if (forgeObjectRef.current.material instanceof THREE.MeshStandardMaterial) {
        forgeObjectRef.current.material.color.lerp(targetColor, 0.8);
      }

      ringsRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          child.material.color.lerp(targetColor, 0.8);
        }
      });

      if (activeSlide === 0) {
        forgeObjectRef.current.position.set(12, -2, -5);
      } else if (activeSlide === 1) {
        forgeObjectRef.current.position.set(-14, 2, -4);
      } else if (activeSlide === 2) {
        forgeObjectRef.current.position.set(0, 8, -6);
      } else if (activeSlide === 3) {
        forgeObjectRef.current.position.set(14, -3, -5);
      } else if (activeSlide === 4) {
        forgeObjectRef.current.position.set(-12, -2, -5);
      } else {
        forgeObjectRef.current.position.set(0, -6, -4);
      }
    }
  }, [activeSlide]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
    />
  );
};
