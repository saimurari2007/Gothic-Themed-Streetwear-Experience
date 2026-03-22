import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Cylinder, Sphere, useTexture, PivotControls } from '@react-three/drei';
import * as THREE from 'three';

// An ultra-premium, programmatic Cyber-Gothic Mannequin
// Built entirely out of Code to eliminate all .glb scaling/material fusion errors!
const Model = ({ currentOutfit }) => {
  // We know `/design.png` successfully exists in the public folder now.
  const designTexture = useTexture('/design.png');
  designTexture.colorSpace = THREE.SRGBColorSpace;

  // High-End Materials
  const materials = {
    skin: new THREE.MeshPhysicalMaterial({ 
      color: '#080808', 
      roughness: 0.1, 
      metalness: 0.9, 
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    }),
    visor: new THREE.MeshStandardMaterial({ 
      color: '#9d00ff', 
      emissive: '#9d00ff', 
      emissiveIntensity: 4,
      toneMapped: false
    }),
    pants: new THREE.MeshStandardMaterial({ 
      color: '#151515', 
      roughness: 0.9, 
      metalness: 0.1 
    })
  };

  // Garment Materials
  const getShirtMaterial = () => {
    switch (currentOutfit) {
      case 'hoodie': return new THREE.MeshStandardMaterial({ color: '#050505', roughness: 0.9 });
      case 'jacket': return new THREE.MeshPhysicalMaterial({ color: '#ff003c', roughness: 0.2, metalness: 0.5, clearcoat: 0.8 });
      case 'tshirt':
      default: return new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.8 });
    }
  };

  return (
    <group position={[0, -0.8, 0]} scale={1.5}>
      {/* 
        THE HIGH-FASHION MANNEQUIN 
      */}

      {/* Head / Helmet */}
      <Sphere args={[0.3, 64, 64]} position={[0, 1.8, 0]} castShadow receiveShadow material={materials.skin} />
      
      {/* Glowing Cyber-Gothic Visor Slice in the Helmet */}
      <mesh position={[0, 1.8, 0.25]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.4, 0.08, 0.2]} />
        <primitive object={materials.visor} attach="material" />
      </mesh>

      {/* Cyber Neck */}
      <Cylinder args={[0.12, 0.15, 0.3, 32]} position={[0, 1.45, 0]} castShadow material={materials.skin} />

      {/* Torso & Streetwear T-Shirt */}
      <RoundedBox args={[1.0, currentOutfit === 'tshirt' ? 1.0 : 1.3, 0.6]} radius={0.15} smoothness={8} position={[0, 0.7, 0]} castShadow receiveShadow>
        <primitive object={getShirtMaterial()} attach="material" />
      </RoundedBox>

      {/* Shoulders / Baggy Sleeves */}
      <Sphere args={[0.35, 32, 32]} position={[-0.6, 1.0, 0]} castShadow material={getShirtMaterial()} />
      <Sphere args={[0.35, 32, 32]} position={[0.6, 1.0, 0]} castShadow material={getShirtMaterial()} />

      {/* Arms (Skin exposing under sleeves) */}
      <Cylinder args={[0.15, 0.12, 1.0, 32]} position={[-0.7, 0.3, 0]} rotation={[0, 0, 0.2]} castShadow material={materials.skin} />
      <Cylinder args={[0.15, 0.12, 1.0, 32]} position={[0.7, 0.3, 0]} rotation={[0, 0, -0.2]} castShadow material={materials.skin} />

      {/* Baggy Trousers */}
      <Cylinder args={[0.3, 0.35, 1.2, 32]} position={[-0.3, -0.5, 0]} castShadow receiveShadow material={materials.pants} />
      <Cylinder args={[0.3, 0.35, 1.2, 32]} position={[0.3, -0.5, 0]} castShadow receiveShadow material={materials.pants} />

      {/* Heavy Cyber Boots */}
      <RoundedBox args={[0.4, 0.3, 0.5]} radius={0.05} position={[-0.3, -1.2, 0.1]} castShadow material={materials.skin} />
      <RoundedBox args={[0.4, 0.3, 0.5]} radius={0.05} position={[0.3, -1.2, 0.1]} castShadow material={materials.skin} />


      {/* 
        PORSCHE DESIGN PROJECTION GRAPHIC
      */}
      {currentOutfit === 'tshirt' && designTexture && (
        <group>
          <mesh position={[0, 0.8, 0.31]} rotation={[0, 0, 0]} castShadow>
            <planeGeometry args={[0.6, 0.6]} />
            <meshStandardMaterial map={designTexture} transparent alphaTest={0.1} roughness={0.8} />
          </mesh>
          
          <mesh position={[0, 0.8, -0.31]} rotation={[0, Math.PI, 0]} castShadow>
            <planeGeometry args={[0.7, 0.7]} />
            <meshStandardMaterial map={designTexture} transparent alphaTest={0.1} roughness={0.8} />
          </mesh>
        </group>
      )}

    </group>
  );
};

export default Model;
