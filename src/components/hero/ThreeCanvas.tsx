"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// VIBGYOR colors
const VIBGYOR = [
  new THREE.Color(0x8B00FF), // Violet
  new THREE.Color(0x4B0082), // Indigo
  new THREE.Color(0x0000FF), // Blue
  new THREE.Color(0x00C800), // Green
  new THREE.Color(0xFFFF00), // Yellow
  new THREE.Color(0xFF7F00), // Orange
  new THREE.Color(0xFF0000), // Red
];

function lerpVibgyor(t: number): THREE.Color {
  const scaled = t * (VIBGYOR.length - 1);
  const lo = Math.floor(scaled);
  const hi = Math.min(lo + 1, VIBGYOR.length - 1);
  return VIBGYOR[lo].clone().lerp(VIBGYOR[hi], scaled - lo);
}

function buildRainbowGeometry(
  radius: number,
  tube: number,
  tubularSegments: number,
  radialSegments: number
): THREE.TorusKnotGeometry {
  const geo = new THREE.TorusKnotGeometry(radius, tube, tubularSegments, radialSegments);
  const colorArray: number[] = [];
  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    const c = lerpVibgyor(t);
    for (let j = 0; j <= radialSegments; j++) {
      colorArray.push(c.r, c.g, c.b);
    }
  }
  geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colorArray), 3));
  return geo;
}

export default function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // VIBGYOR outer wireframe torus knot
    const geometry = buildRainbowGeometry(1, 0.32, 180, 16);
    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // VIBGYOR inner torus knot (smaller, semi-transparent)
    const innerGeo = buildRainbowGeometry(0.78, 0.22, 120, 10);
    const innerMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    // Rainbow particle field
    const particleGeo = new THREE.BufferGeometry();
    const count = 800;
    const pos = new Float32Array(count * 3);
    const pCol = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const c = lerpVibgyor(Math.random());
      pCol[i * 3]     = c.r;
      pCol[i * 3 + 1] = c.g;
      pCol[i * 3 + 2] = c.b;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const particleMat = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.018,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    let rafId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      torusKnot.rotation.x = t * 0.12 + mouseY * 0.3;
      torusKnot.rotation.y = t * 0.18 + mouseX * 0.3;
      inner.rotation.x = -t * 0.1;
      inner.rotation.y = t * 0.15;
      particles.rotation.y = t * 0.03;
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
