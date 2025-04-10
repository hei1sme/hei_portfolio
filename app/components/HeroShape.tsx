'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface RotatingShapeProps {
  color?: string;
}

const RotatingShape: React.FC<RotatingShapeProps> = ({ color = '#a855f7' }) => {
  const meshRef = useRef<THREE.Mesh>(null!); // Use non-null assertion

  // Rotate the shape on each frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
      // meshRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    // Using a Torus geometry as an example
    <Torus ref={meshRef} args={[1, 0.3, 32, 50]} scale={1.0}> 
      {/* args: [radius, tubeRadius, radialSegments, tubularSegments] */}
      <meshStandardMaterial 
        color={color} 
        roughness={0.4} 
        metalness={1} 
        emissive={color} // Make it glow slightly
        emissiveIntensity={0.4}
      />
    </Torus>
  );
};

const HeroShape: React.FC = () => {
  const color = "#a855f7"; // Define the color variable

  return (
    <div className="absolute inset-0 z-0 opacity-30 md:opacity-40" style={{ pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={100} color="#ffffff" />
        <pointLight position={[-5, -5, 2]} intensity={80} color={color} /> {/* Purple light */}
        
        <RotatingShape color={color} />

        {/* Optional: Add controls for debugging */}
        {/* <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5}/> */}
      </Canvas>
    </div>
  );
};

export default HeroShape; 