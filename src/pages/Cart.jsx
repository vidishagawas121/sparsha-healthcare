import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Info, CheckCircle2 } from 'lucide-react';

export default function Cart() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    clearCart,
    selectedCourierId,
    setSelectedCourierId,
    selectedCourierOption,
    courierCharge,
    totalAmount,
    COURIER_OPTIONS,
    itemCount
  } = useCart();

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
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/digestive_balance.jpg';
                    }}
                  />
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

                <div className="cart-item-actions">
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
              <span>Items Subtotal ({itemCount} {itemCount === 1 ? 'box' : 'boxes'})</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>₹{subtotal}</span>
            </div>

            {/* Mandatory Courier Selection Block */}
            <div style={{ margin: '18px 0', padding: '14px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Truck size={16} /> Mandatory Courier Charges:
                </span>
                <span style={{ fontSize: '0.78rem', background: 'rgba(59, 20, 100, 0.1)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                  {itemCount} {itemCount === 1 ? 'Box' : 'Boxes'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                {COURIER_OPTIONS.map((opt) => {
                  const isSelected = selectedCourierId === opt.id;
                  return (
                    <label
                      key={opt.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid rgba(0,0,0,0.08)',
                        background: isSelected ? '#ffffff' : 'rgba(255,255,255,0.6)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="radio"
                          name="courierOption"
                          value={opt.id}
                          checked={isSelected}
                          onChange={() => setSelectedCourierId(opt.id)}
                          style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                        />
                        <div style={{ fontSize: '0.82rem', lineHeight: '1.2' }}>
                          <div style={{ fontWeight: isSelected ? 700 : 500, color: 'var(--color-text-main)' }}>
                            {opt.name}
                          </div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                        ₹{opt.price}
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Courier Partner Policy Notice */}
              <div style={{ marginTop: '10px', display: 'flex', gap: '6px', fontSize: '0.76rem', color: 'var(--color-text-muted)', lineHeight: '1.35' }}>
                <Info size={14} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-gold)' }} />
                <span>
                  Courier partner fixed rates: <strong>₹100</strong> (1 box), <strong>₹150</strong> (2–3 boxes), <strong>₹200</strong> (4+ boxes). Weight & tracking receipt verified on WhatsApp dispatch.
                </span>
              </div>
            </div>

            <div className="summary-row">
              <span>Courier Delivery</span>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>₹{courierCharge}</span>
            </div>

            <div className="summary-row total" style={{ borderTop: '2px solid var(--color-border)', paddingTop: '12px', marginTop: '12px' }}>
              <span>Total Payable</span>
              <span style={{ color: 'var(--color-primary)', fontSize: '1.35rem', fontWeight: 700 }}>₹{totalAmount}</span>
            </div>

            <div style={{ marginTop: '24px' }}>
              <Button to="/checkout" variant="gold" block size="lg" icon={ArrowRight}>
                Proceed to Checkout (₹{totalAmount})
              </Button>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              <ShieldCheck size={18} color="#25D366" />
              <span>Instant order confirmation & dispatch coordination via WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
