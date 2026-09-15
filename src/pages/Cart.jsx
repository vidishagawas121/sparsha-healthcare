import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" style={{ padding: '100px 0 140px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '580px' }}>
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: 'var(--color-bg-alt)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto'
            }}
          >
            <ShoppingBag size={36} />
          </div>

          <h2 style={{ marginBottom: '14px' }}>Your Cart is Empty</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '32px', color: 'var(--color-text-muted)' }}>
            Explore our wellness products and find something for you.
          </p>

          <Button to="/shop" variant="primary" size="lg" icon={ArrowRight}>
            Shop Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ padding: '56px 0 100px 0' }}>
      <div className="container">
        <h1 style={{ marginBottom: '32px' }}>Your Wellness Cart</h1>

        <div className="cart-layout">
          {/* Cart Items List */}
          <div className="cart-items-card">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-thumb">
                  <img src={item.image} alt={item.name} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>
                    <Link to={`/product/${item.id}`} style={{ color: 'var(--color-primary)' }}>
                      {item.name}
                    </Link>
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                    ₹{item.price} each
                  </div>
                </div>

                <div className="quantity-stepper">
                  <button
                    className="stepper-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <div className="stepper-value">{item.quantity}</div>
                  <button
                    className="stepper-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>
                    ₹{item.price * item.quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'none', border: 'none', color: '#b94a48', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={14} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}

            <div style={{ padding: '18px 24px', background: 'var(--color-bg-alt)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/shop" style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 600 }}>
                ← Continue Shopping
              </Link>
              <button
                type="button"
                onClick={clearCart}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-card">
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              Order Summary
            </h3>

            <div className="summary-row">
              <span>Items Subtotal</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Standard Delivery</span>
              <span style={{ color: 'var(--color-sage)', fontWeight: 600 }}>FREE (Demo)</span>
            </div>

            <div className="summary-row">
              <span>Estimated Tax</span>
              <span style={{ color: 'var(--color-text-main)' }}>Included</span>
            </div>

            <div className="summary-row total">
              <span>Total Amount</span>
              <span>₹{subtotal}</span>
            </div>

            <div style={{ marginTop: '28px' }}>
              <Button to="/checkout" variant="gold" block size="lg" icon={ArrowRight}>
                Proceed to Checkout
              </Button>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              <ShieldCheck size={18} color="#25D366" />
              <span>Instant order confirmation & dispatch coordination via WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
