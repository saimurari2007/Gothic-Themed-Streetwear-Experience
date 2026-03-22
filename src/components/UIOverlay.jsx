import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Check, ShoppingCart, Activity } from 'lucide-react';

const UIOverlay = ({ currentOutfit, setOutfit }) => {

  const options = [
    { id: 'tshirt', name: 'OVERSIZED TEE' },
    { id: 'hoodie', name: 'CYBER HOODIE' },
    { id: 'jacket', name: 'NEON JACKET' }
  ];

  const handleCapture = () => {
    // Cinematic Flashbang effect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = 0;
    flash.style.backgroundColor = '#ffffff';
    flash.style.zIndex = 9999;
    flash.style.pointerEvents = 'none';
    flash.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    document.body.appendChild(flash);
    
    // Add screen-tearing/camera shutter sound here eventually
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 600);
    }, 50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem'
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#fff', letterSpacing: '8px', textShadow: '0 0 15px rgba(157,0,255,0.8)' }}>
          YOUNGWEAR_
        </h2>
        <nav style={{ pointerEvents: 'auto', display: 'flex', gap: '1rem' }}>
          <button className="glass-panel" style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', borderRadius: '50%' }}>
            <Activity size={18} />
          </button>
          <button className="glass-panel" style={{ padding: '1rem', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', cursor: 'pointer', borderRadius: '50%' }}>
            <ShoppingCart size={18} />
          </button>
        </nav>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '2rem' }}>
        
        {/* Minimal Futuristic Outfit Selection */}
        <div className="glass-panel pointer-events-auto" style={{ padding: '2rem', width: '320px', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h3 style={{ fontSize: '0.8rem', color: '#fff', letterSpacing: '4px', marginBottom: '1rem', opacity: 0.6 }}>SYSTEM.GEAR.SELECT</h3>
          
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setOutfit(opt.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.2rem',
                backgroundColor: currentOutfit === opt.id ? 'rgba(157, 0, 255, 0.15)' : 'transparent',
                border: `1px solid ${currentOutfit === opt.id ? 'rgba(157, 0, 255, 0.6)' : 'rgba(255,255,255,0.05)'}`,
                color: currentOutfit === opt.id ? '#fff' : '#666',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: currentOutfit === opt.id ? '600' : '300',
                letterSpacing: '2px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: '2px',
                boxShadow: currentOutfit === opt.id ? 'inset 0 0 20px rgba(157,0,255,0.2)' : 'none'
              }}
              onMouseOver={(e) => {
                if(currentOutfit !== opt.id) {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }
              }}
              onMouseOut={(e) => {
                if(currentOutfit !== opt.id) {
                  e.currentTarget.style.color = '#666';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                }
              }}
            >
              <span style={{ fontSize: '0.85rem' }}>{opt.name}</span>
              {currentOutfit === opt.id && <Check size={16} color="#9d00ff" />}
            </button>
          ))}
        </div>

        {/* Cinematic Capture Loop Button */}
        <div className="pointer-events-auto">
          <button 
            onClick={handleCapture}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.2rem 2.5rem',
              backgroundColor: 'rgba(255, 0, 60, 0.05)',
              border: '1px solid rgba(255, 0, 60, 0.5)',
              color: '#fff',
              fontFamily: 'Syncopate, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 0, 60, 0.2)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 0, 60, 0.4)';
              e.currentTarget.style.borderColor = '#ff003c';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 0, 60, 0.05)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(255, 0, 60, 0.5)';
            }}
          >
            <Camera size={18} color="#ff003c" />
            <span>CAPTURE_FRAME</span>
          </button>
        </div>

      </div>
      
      {/* Cinematic scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
        style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
      >
        <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '6px', color: '#fff' }}>Initialize Scroll Sequence</p>
        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, #9d00ff, transparent)' }}></div>
      </motion.div>
    </motion.div>
  );
};

export default UIOverlay;
