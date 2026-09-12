import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';

export default function Toast() {
  const { toasts } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      {toasts.map(toast => (
        <div key={toast.id} className="toast-item">
          <CheckCircle size={18} color="#c29b48" />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
