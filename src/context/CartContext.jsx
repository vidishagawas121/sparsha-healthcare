import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export const COURIER_OPTIONS = [
  {
    id: 'single',
    price: 100,
    name: 'Standard Courier (1 Box)',
    shortName: '1 Box Parcel',
    description: 'Standard pan-India express courier for 1 product box (up to 1 kg).',
    badge: '₹100 (Single Box)',
    boxLimit: '1 Box'
  },
  {
    id: 'medium',
    price: 150,
    name: 'Medium Parcel (2–3 Boxes)',
    shortName: '2–3 Boxes Parcel',
    description: 'Combined parcel packaging for 2 to 3 product boxes (1–2 kg).',
    badge: '₹150 (2–3 Boxes)',
    boxLimit: '2–3 Boxes'
  },
  {
    id: 'bulk',
    price: 200,
    name: 'Multi-Box Parcel (4+ Boxes / Express)',
    shortName: '4+ Boxes Parcel',
    description: 'Consolidated heavy parcel dispatch. Partner base rate for 4+ boxes.',
    badge: '₹200 (4+ Boxes)',
    boxLimit: '4+ Boxes'
  }
];

export function getRecommendedCourierId(boxCount) {
  if (boxCount <= 1) return 'single';
  if (boxCount <= 3) return 'medium';
  return 'bulk';
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('sparsha_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);
  const [selectedCourierId, setSelectedCourierId] = useState('single');

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Auto-update recommended courier tier when box count changes
  useEffect(() => {
    if (itemCount > 0) {
      const recommended = getRecommendedCourierId(itemCount);
      setSelectedCourierId(recommended);
    }
  }, [itemCount]);

  useEffect(() => {
    try {
      localStorage.setItem('sparsha_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to persist cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added "${product.name}" to your cart`);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const selectedCourierOption = useMemo(() => {
    return COURIER_OPTIONS.find(opt => opt.id === selectedCourierId) || COURIER_OPTIONS[0];
  }, [selectedCourierId]);

  const courierCharge = selectedCourierOption.price;
  const totalAmount = subtotal + courierCharge;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        subtotal,
        selectedCourierId,
        setSelectedCourierId,
        selectedCourierOption,
        courierCharge,
        totalAmount,
        COURIER_OPTIONS,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toasts,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
