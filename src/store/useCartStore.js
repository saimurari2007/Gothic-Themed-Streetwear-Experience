import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set({ isOpen: !get().isOpen }),
      closeCart: () => set({ isOpen: false }),
      
      addToCart: (product) => {
        const cart = get().cart;
        const exists = cart.find(item => item.id === product.id);
        
        if (exists) {
          set({
            cart: cart.map(item => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            isOpen: true
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }], isOpen: true });
        }
      },
      
      removeFromCart: (id) => set({
        cart: get().cart.filter(item => item.id !== id)
      }),
      
      updateQuantity: (id, amount) => set({
        cart: get().cart.map(item => {
          if (item.id === id) {
            const newQuantity = item.quantity + amount;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
      }),
      
      getTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      clearCart: () => set({ cart: [] })
    }),
    {
      name: 'youngwear-cart-storage',
    }
  )
);

export default useCartStore;
