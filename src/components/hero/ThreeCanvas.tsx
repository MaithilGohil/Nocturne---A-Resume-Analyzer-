"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Assign color using hue cycling — multiple cycles across tubular + radial
// creates a fully blended/mixed rainbow look with no hard partitions
function rainbowColor(tubularIndex: number, tubularTotal: number, radialIndex: number, radialTotal: number): THREE.Color {
  // Cycle hue 4 times across the tube path, plus slight offset per radial ring
  const hue = ((tubularIndex / tubularTotal) * 4 + (radialIndex / radialTotal) * 0.6) % 1;
  return new THREE.Color().setHSL(hue, 1.0, 0.55);
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
    for (let j = 0; j <= radialSegments; j++) {
      const c = rainbowColor(i, tubularSegments, j, radialSegments);
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

    // Outer torus knot — fully mixed rainbow wireframe
    const geometry = buildRainbowGeometry(1, 0.32, 200, 20);
    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Inner torus knot — offset cycle for layered blending
    const innerGeo = buildRainbowGeometry(0.78, 0.22, 130, 12);
    const innerMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    // Rainbow particles
    const particleGeo = new THREE.BufferGeometry();
    const count = 800;
    const pos = new Float32Array(count * 3);
    const pCol = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const c = new THREE.Color().setHSL(Math.random(), 1.0, 0.55);
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
      opacity: 0.35,
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

    // Animation
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
