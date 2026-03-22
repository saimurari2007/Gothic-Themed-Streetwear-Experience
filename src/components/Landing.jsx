import React from 'react';
import { motion } from 'framer-motion';

const Landing = ({ onEnter }) => {
  return (
    <motion.div
      className="landing-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 50,
        pointerEvents: 'auto',
        backgroundColor: '#020202'
      }}
    >
      <div className="fog-overlay"></div>
      
      <motion.div
        initial={{ y: 30, opacity: 0, filter: 'blur(5px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}
      >
        <div style={{ position: 'relative' }}>
          <h1 className="glow-text" style={{ fontFamily: '"Grenze Gotisch", cursive', fontWeight: 900, fontSize: '8vw', color: '#fff', textShadow: '0 0 40px rgba(157,0,255,0.8)', letterSpacing: '4px' }}>
            GOTH
          </h1>
          <h2 style={{ fontSize: '1rem', letterSpacing: '8px', color: '#888', marginTop: '1rem', fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase' }}>
            Enter a new world in streetwear
          </h2>
        </div>
        
        <button className="glitch-btn" onClick={onEnter}>
          ACCESS THE VOID
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
