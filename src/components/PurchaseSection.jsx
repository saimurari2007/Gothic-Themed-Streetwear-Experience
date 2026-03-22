import React from 'react';

const PurchaseSection = ({ currentOutfit }) => {

  const products = {
    tshirt: { name: 'PORSCHE GT3RS TEE', price: '$85.00', desc: 'Heavyweight cotton loaded with high-octane graphic front and back prints. Designed for speed.', feature: 'OVERSIZED FIT' },
    hoodie: { name: 'CYBER HOODIE V2', price: '$140.00', desc: 'Tech-fleece material featuring deep neon structural alignments. Maximum stealth.', feature: 'DROPPED SHOULDERS' },
    jacket: { name: 'NEON BOMBER JACKET', price: '$220.00', desc: 'Reflective ultra-panels and hyper-resistant shell. The ultimate street armor.', feature: 'REFLECTIVE' }
  };

  const product = products[currentOutfit] || products.tshirt;

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingBottom: '8vh',
      paddingLeft: '10vw',
      paddingRight: '10vw'
    }}>
      <div 
        className="glass-panel" 
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '4rem 3rem',
          backdropFilter: 'blur(30px) saturate(200%)',
          backgroundColor: 'rgba(5, 5, 5, 0.4)',
          borderTop: '2px solid rgba(157, 0, 255, 0.8)',
          boxShadow: '0 -30px 60px rgba(157, 0, 255, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
          borderRadius: '4px'
        }}
      >
        <span style={{ fontSize: '0.75rem', letterSpacing: '8px', color: '#ff003c', fontFamily: 'Syncopate, sans-serif' }}>{product.feature}</span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '1.5rem', color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.2)', fontFamily: 'Syncopate, sans-serif' }}>
          {product.name}
        </h2>
        
        <p style={{ color: '#aaa', lineHeight: '1.8', marginBottom: '3rem', fontSize: '0.95rem', fontWeight: '300' }}>
          {product.desc}
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#666', letterSpacing: '4px', textTransform: 'uppercase' }}>Purchase Config</span>
          <span style={{ fontSize: '1.8rem', fontWeight: '300', color: '#fff', textShadow: '0 0 15px rgba(157, 0, 255, 0.8)' }}>
            {product.price}
          </span>
        </div>

        <button 
          style={{ 
            width: '100%',
            padding: '1.5rem', 
            background: 'linear-gradient(45deg, #7e00cc, #9d00ff)', 
            color: '#fff', 
            border: 'none', 
            fontFamily: 'Syncopate, sans-serif',
            fontSize: '1.1rem',
            letterSpacing: '5px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(157, 0, 255, 0.4)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            borderRadius: '2px'
            }}
          onMouseOver={(e) => {
            e.currentTarget.style.filter = 'brightness(1.2) hue-rotate(10deg)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(157, 0, 255, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.filter = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(157, 0, 255, 0.4)';
          }}
          >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default PurchaseSection;
