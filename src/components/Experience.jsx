import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Float, useScroll, Environment, MeshReflectorMaterial, ContactShadows, Scroll, Text } from '@react-three/drei';
import * as THREE from 'three';
import Model from './Model';
import Shop from './Shop';
import gsap from 'gsap';

const Experience = ({ entered, currentOutfit }) => {
  const group = useRef();
  const scroll = useScroll(); // Will be null if entered is false
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Cinematic camera transition
    const targetCameraPosition = entered ? new THREE.Vector3(0, 0.5, 4.5) : new THREE.Vector3(0, 1.5, 8);
    state.camera.position.lerp(targetCameraPosition, delta * 1.5);
    
    // Mouse Parallax dynamically easing
    if (entered) {
      state.camera.position.x += (mousePosition.x * 0.4 - state.camera.position.x) * 0.05;
      state.camera.position.y += (mousePosition.y * 0.2 + 0.5 - state.camera.position.y) * 0.05;
    }
    
    state.camera.lookAt(0, 0.5, 0);

    // If entered, use scroll to drive the rotation of the model smoothly
    if (entered && scroll) {
      const scrollOffset = scroll.offset; // 0 to 1
      const targetRotationY = scrollOffset * Math.PI * 2.5;
      
      if (group.current) {
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, delta * 3);
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -scrollOffset * 1.5, delta * 2);
      }
    } else {
      // Very slow cinematic idle rotation if not entered yet
      if (group.current) {
        group.current.rotation.y += delta * 0.05;
      }
    }
  });

  return (
    <>
      {/* Cinematic Lighting System */}
      <ambientLight intensity={0.1} />
      
      {/* Key light casting strong shadows */}
      <spotLight position={[4, 10, 5]} angle={0.2} penumbra={1} intensity={250} color="#ffffff" castShadow shadow-bias={-0.0001} />
      
      {/* Deep Neon Purple Rim Light */}
      <pointLight position={[-4, 2, -3]} intensity={180} color="#9d00ff" distance={15} />
      <spotLight position={[-5, 5, -2]} angle={0.4} penumbra={1} intensity={100} color="#a64dff" />
      
      {/* Crimson Red Back Light for striking contrast */}
      <pointLight position={[3, -1, -5]} intensity={150} color="#ff003c" distance={15} />

      <Environment preset="night" />

      {/* Floating typography background */}
      <Text 
        position={[0, 1.5, -5]} 
        rotation={[0, 0, 0]} 
        fontSize={3.0} 
        color="#ffffff" 
        material-toneMapped={false}
        fillOpacity={0.03}
      >
        G O T H
      </Text>

      {/* Volumetric anti-gravity dust */}
      <Sparkles count={150} scale={10} size={1.2} speed={0.2} opacity={0.6} color="#9d00ff" />
      <Sparkles count={100} scale={12} size={2} speed={0.1} opacity={0.3} color="#ffffff" />

      {/* Slow premium float effect on the main asset */}
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.6}>
        <group ref={group} position={[0, -1, 0]}>
          <Model currentOutfit={currentOutfit} />
        </group>
      </Float>

      {/* Mirror Hyper-reflective Floor */}
      <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#000000" />
      <mesh position={[0, -1.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[500, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          depthScale={1.5}
          minDepthThreshold={0.8}
          color="#030303"
          metalness={0.9}
          roughness={0.3}
          dithering={true}
        />
      </mesh>

      {entered && (
        <Scroll html style={{ width: '100vw' }}>
          <div style={{ paddingTop: '150vh', width: '100vw' }}>
            <Shop />
          </div>
        </Scroll>
      )}
    </>
  );
};

export default Experience;
