import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Loader, Environment, Text, Float, ScrollControls } from '@react-three/drei';
import Effects from './components/Effects';
import Landing from './components/Landing';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Experience from './components/Experience';
import useCartStore from './store/useCartStore';
import { ShoppingCart } from 'lucide-react';
import * as THREE from 'three';

// Premium interactive background using React Three Fiber
const AestheticBackground = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[-4, 2, -3]} intensity={180} color="#9d00ff" distance={15} />
      <pointLight position={[3, -1, -5]} intensity={150} color="#ff003c" distance={15} />
      
      <Environment preset="night" />

      {/* Volumetric anti-gravity dust */}
      <Sparkles count={250} scale={15} size={1.5} speed={0.3} opacity={0.6} color="#9d00ff" />
      <Sparkles count={150} scale={20} size={2.5} speed={0.1} opacity={0.3} color="#ffffff" />
      
      <Text 
        position={[0, 0, -8]} 
        fontSize={3} 
        color="#ffffff" 
        material-toneMapped={false}
        fillOpacity={0.03}
        letterSpacing={0.2}
      >
        Y O U N G W E A R
      </Text>

      {/* Floating abstract structural elements substituting the humanoid */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[-3, 1, -4]} rotation={[0.4, 0.2, 0.1]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#9d00ff" wireframe />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.5}>
        <mesh position={[4, -2, -6]} rotation={[0.1, 0.6, 0.4]}>
          <torusGeometry args={[1.5, 0.05, 16, 32]} />
          <meshStandardMaterial color="#ff003c" wireframe transparent opacity={0.5} />
        </mesh>
      </Float>
    </>
  );
};

import { AnimatePresence, motion } from 'framer-motion';

// ... (code omitted for brevity but I need to replace from line 41 to line 66)

function App() {
  const [entered, setEntered] = useState(false);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItems = useCartStore((state) => state.cart);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="canvas-container" style={{ position: 'fixed', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 40 }} gl={{ powerPreference: "high-performance", antialias: false }}>
          <color attach="background" args={['#020202']} />
          <fog attach="fog" args={['#020202', 3, 15]} />
          
          <Suspense fallback={null}>
            {entered ? (
              <ScrollControls pages={5} damping={0.2} maxSpeed={0.5}>
                <Experience entered={entered} currentOutfit="tshirt" />
              </ScrollControls>
            ) : (
              <Experience entered={entered} currentOutfit="tshirt" />
            )}
            <Effects />
          </Suspense>
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', minHeight: '100vh', pointerEvents: 'none' }}>
        <AnimatePresence mode="wait">
          {!entered ? (
            <motion.div key="landing" style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}>
              <Landing onEnter={() => setEntered(true)} />
            </motion.div>
          ) : (
            <motion.div 
              key="shop-ui" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1.5 }}
              style={{ pointerEvents: 'none' }}
            >
              {/* Top Navigation */}
            <header style={{ 
              position: 'fixed', top: 0, left: 0, width: '100%', 
              padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              zIndex: 100, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
              backdropFilter: 'blur(4px)', pointerEvents: 'auto'
            }}>
              <h2 style={{ fontSize: '1.8rem', color: '#fff', letterSpacing: '4px', textShadow: '0 0 15px rgba(157,0,255,0.8)', fontFamily: '"Grenze Gotisch", cursive', fontWeight: 900 }}>
                GOTH
              </h2>
              
              {/* Floating Cart Icon */}
              <button 
                onClick={toggleCart}
                className="glass-panel"
                style={{ 
                  position: 'relative', padding: '1rem', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', 
                  background: 'rgba(10,10,10,0.5)', cursor: 'pointer', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(157,0,255,0.2)'
                }}
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <div style={{
                    position: 'absolute', top: -5, right: -5, background: '#ff003c', color: '#fff',
                    borderRadius: '50%', width: '22px', height: '22px', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold'
                  }}>
                    {totalItems}
                  </div>
                )}
              </button>
            </header>

            {/* Cart Modal Overlay */}
          </motion.div>
        )}
      </AnimatePresence>
      <Cart />
    </div>

    <Loader 
      containerStyles={{ background: '#020202', zIndex: 9999 }}
      innerStyles={{ width: '400px', background: 'rgba(255,255,255,0.1)', height: '2px' }}
      barStyles={{ background: '#9d00ff' }}
      dataInterpolation={(p) => `INITIALIZING GOTH // ${p.toFixed(0)}%`}
      dataStyles={{ color: '#9d00ff', fontFamily: 'Syncopate, sans-serif', letterSpacing: '4px', fontSize: '0.8rem' }}
    />
  </>
);
}

export default App;
