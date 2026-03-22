import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const Cart = () => {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, getTotal, clearCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 999,
              pointerEvents: 'auto'
            }}
          />

          {/* Futuristic Cart Sidebar */}
          <motion.div
            initial={{ x: '100%', opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: '100%', opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="glass-panel"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth: '450px',
              height: '100vh',
              zIndex: 1000,
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid rgba(157, 0, 255, 0.4)',
              boxShadow: '-20px 0 60px rgba(157, 0, 255, 0.1)',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              pointerEvents: 'auto'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontFamily: 'Syncopate, sans-serif', color: '#fff', letterSpacing: '6px', textShadow: '0 0 15px rgba(157,0,255,0.8)' }}>
                YOUR GEAR //
              </h2>
              <button 
                onClick={closeCart} 
                style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', transition: 'color 0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ff003c'}
                onMouseOut={(e) => e.currentTarget.style.color = '#888'}
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cart.length === 0 ? (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontFamily: 'Syncopate, sans-serif', letterSpacing: '4px', fontSize: '0.8rem' }}>
                  CART IS EMPTY _
                </div>
              ) : (
                cart.map(item => (
                  <motion.div 
                    layout
                    key={item.id} 
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      padding: '1.5rem',
                      background: 'rgba(20,20,20,0.5)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '4px',
                      position: 'relative'
                    }}
                  >
                    {/* Item Image Placeholder / Actual load */}
                    <div style={{ 
                      width: '80px', 
                      height: '100px', 
                      background: `url(${item.image}) center/contain no-repeat, linear-gradient(45deg, #111, #222)`,
                      borderRadius: '4px',
                      flexShrink: 0
                    }} />
                    
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                      <div>
                        <h3 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.4rem' }}>{item.name}</h3>
                        <p style={{ color: '#9d00ff', fontFamily: 'Syncopate, sans-serif', fontSize: '0.8rem', fontWeight: 700 }}>₹{item.price}</p>
                      </div>
                      
                      {/* Controls */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', background: 'rgba(0,0,0,0.5)', padding: '0.4rem 0.8rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><Minus size={14}/></button>
                          <span style={{ color: '#fff', fontSize: '0.9rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><Plus size={14}/></button>
                        </div>
                        
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', transition: 'color 0.3s' }}
                          onMouseOver={(e) => e.currentTarget.style.color = '#ff003c'}
                          onMouseOut={(e) => e.currentTarget.style.color = '#555'}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <span style={{ color: '#888', letterSpacing: '2px', fontSize: '0.9rem' }}>TOTAL (INR)</span>
                  <span style={{ color: '#fff', fontSize: '1.8rem', fontFamily: 'Syncopate, sans-serif', textShadow: '0 0 15px rgba(157,0,255,0.8)' }}>
                    ₹{getTotal().toLocaleString()}
                  </span>
                </div>
                
                <button 
                  onClick={clearCart}
                  style={{
                    width: '100%',
                    padding: '1.2rem',
                    background: '#fff',
                    color: '#000',
                    border: 'none',
                    borderRadius: '4px',
                    fontFamily: 'Syncopate, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 0 20px rgba(255,255,255,0.2)'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#9d00ff'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 0 30px rgba(157,0,255,0.6)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)'; }}
                >
                  <CreditCard size={20} />
                  SECURE CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
