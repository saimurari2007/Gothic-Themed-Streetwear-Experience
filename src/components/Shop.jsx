import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const products = [
  {
    id: 't-mockup',
    name: 'THE ESSENTIAL MOCKUP',
    price: 899,
    desc: 'The blank slate. Flawless oversized core geometry.',
    image: '/t/MOCKUP.png'
  },
  {
    id: 't-acdc',
    name: 'HIGH VOLTAGE AC/DC',
    price: 999,
    desc: 'Vintage acid wash. The sound of raw thunder.',
    image: '/t/AC DC.png'
  },
  {
    id: 't-overlord',
    name: 'ABSOLUTE OVERLORD',
    price: 1049,
    desc: 'Dominate the architecture. Heavyweight box cut.',
    image: '/t/Absolute Overlord.png'
  },
  {
    id: 't-alpha',
    name: 'ALPHA PROTOCOL',
    price: 949,
    desc: 'Leading the pack. Premium structured jersey layers.',
    image: '/t/Alpha.png'
  },
  {
    id: 't-porsche',
    name: 'CYBER PORSCHE LOOP',
    price: 1199,
    desc: 'Zero to 100 aesthetics. Engineered for the neon future.',
    image: '/t/Porsche.png'
  },
  {
    id: 't-raw',
    name: 'RAW VOLTAGE',
    price: 899,
    desc: 'Unfiltered gothic energy. Distressed heavy seams.',
    image: '/t/Raw Voltage.png'
  },
  {
    id: 't-thick',
    name: 'THICK N THIN',
    price: 999,
    desc: 'Loyalty mapped directly into the weaving. Built to last.',
    image: '/t/Through thick and thin.png'
  }
];

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3rem 2rem',
        gap: '2rem',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = '#9d00ff';
        e.currentTarget.style.boxShadow = '0 0 40px rgba(157,0,255,0.15), inset 0 0 20px rgba(157,0,255,0.05)';
        // Target image float effect
        const img = e.currentTarget.querySelector('.product-img');
        if (img) img.style.transform = 'translateY(-10px) scale(1.05)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.boxShadow = 'none';
        const img = e.currentTarget.querySelector('.product-img');
        if (img) img.style.transform = 'translateY(0) scale(1)';
      }}
    >
      {/* Glow Effect Behing Image */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(157,0,255,0.3) 0%, transparent 70%)', filter: 'blur(30px)', zIndex: 0, pointerEvents: 'none' }} />

      {/* Floating T-Shirt Image */}
      <div style={{ position: 'relative', zIndex: 1, height: '300px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-img"
          style={{
            maxWidth: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.8))'
          }}
          onError={(e) => {
            // Fallback if user hasn't added images to /t folder yet
            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="250" viewBox="0 0 200 250"><rect width="200" height="250" fill="%23111"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23555" font-family="sans-serif" font-size="12">NO IMAGE</text><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="%23555" font-family="sans-serif" font-size="10">add to /t/1.png</text></svg>';
          }}
        />
      </div>

      {/* Details */}
      <div style={{ width: '100%', zIndex: 1, textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Syncopate, sans-serif', fontSize: '1.2rem', color: '#fff', letterSpacing: '4px', marginBottom: '0.8rem', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>
          {product.name}
        </h2>
        <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.5', padding: '0 1rem', height: '45px', fontStyle: 'italic' }}>
          "{product.desc}"
        </p>
      </div>

      {/* Price & Add to Cart */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1, marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9d00ff', textShadow: '0 0 15px rgba(157,0,255,0.6)' }}>
          ₹{product.price}
        </span>
        <button 
          onClick={() => addToCart(product)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            padding: '0.8rem 1.5rem',
            background: 'transparent',
            border: '1px solid #9d00ff',
            color: '#fff',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            cursor: 'pointer',
            borderRadius: '2px',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(157,0,255,0.15)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(157,0,255,0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ADD <ShoppingCart size={16} color="#9d00ff" />
        </button>
      </div>

    </motion.div>
  );
};

const Shop = () => {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      padding: '4rem 10vw',
      paddingTop: '6rem',
      paddingBottom: '10rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '4rem',
      position: 'relative',
      zIndex: 10,
    }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
