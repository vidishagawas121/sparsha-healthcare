import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { generateWhatsAppOrderUrl, CONTACT_INFO } from '../data/contactInfo';
import { 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  MessageCircle, 
  Send, 
  PackageCheck,
  Truck,
  ExternalLink
} from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) errs.phone = 'Please enter your mobile/WhatsApp number';
    if (!formData.email.trim()) errs.email = 'Please enter your email address';
    if (!formData.address.trim()) errs.address = 'Please enter your delivery address';
    if (!formData.city.trim()) errs.city = 'Please enter your city';
    if (!formData.pincode.trim()) errs.pincode = 'Please enter your postal pincode';
    return errs;
  };

  const handleWhatsAppOrderSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const orderId = `SP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const waUrl = generateWhatsAppOrderUrl(formData, cartItems, subtotal, orderId);
    setWhatsappRedirectUrl(waUrl);

    try {
      // Sync order with backend log
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: cartItems,
          total: subtotal,
          paymentMethod: 'WhatsApp Direct Dispatch'
        })
      }).catch(() => {});
    } catch (err) {
      // safe offline fallback
    }

    // Attempt direct WhatsApp launch in new window
    try {
      const waWindow = window.open(waUrl, '_blank');
      if (!waWindow || waWindow.closed || typeof waWindow.closed === 'undefined') {
        // Pop-up was blocked by browser; user will click the fallback button on success screen
      }
    } catch (e) {
      // fallback handled gracefully on screen
    }

    setTimeout(() => {
      setCompletedOrder({
        orderId,
        customer: formData,
        items: [...cartItems],
        total: subtotal,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      });
      clearCart();
      setIsSubmitting(false);
      setOrderComplete(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // If order is completed, display Order Placed & WhatsApp Dispatched Screen
  if (orderComplete && completedOrder) {
    return (
      <div className="checkout-success-page" style={{ padding: '80px 0 120px 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="success-screen-card" style={{ padding: '48px 36px' }}>
            <div className="success-icon-badge" style={{ background: 'rgba(37, 211, 102, 0.12)', color: '#25D366' }}>
              <PackageCheck size={48} color="#25D366" />
            </div>

            <div className="eyebrow-tag" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#128C7E' }}>
              ✓ WhatsApp Order Dispatched
            </div>

            <h1 style={{ fontSize: '2.2rem', margin: '12px 0' }}>
              Order Ready on WhatsApp!
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Thank you, <strong>{completedOrder.customer.fullName}</strong>. Your order has been pre-formatted for Sparsha Healthcare's dispensary team.
            </p>

            <div className="order-id-badge" style={{ display: 'inline-block', marginBottom: '24px' }}>
              Order ID: {completedOrder.orderId}
            </div>

            {/* Direct WhatsApp Callout Button */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '32px', textAlign: 'center' }}>
              <p style={{ color: '#166534', fontWeight: 600, fontSize: '1.05rem', marginBottom: '14px' }}>
                If WhatsApp did not open automatically, click the button below to send your order:
              </p>
              <a
                href={whatsappRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  background: '#25D366',
                  borderColor: '#25D366',
                  color: '#ffffff',
                  fontSize: '1.05rem',
                  padding: '14px 28px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)'
                }}
              >
                <MessageCircle size={22} />
                <span>Open WhatsApp & Send Order</span>
                <ExternalLink size={16} />
              </a>
              <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#15803d' }}>
                Connecting to {CONTACT_INFO.whatsappNumber}
              </div>
            </div>

            {/* Summary Details */}
            <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'left', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>Recipient:</span>
                <span>{completedOrder.customer.fullName} ({completedOrder.customer.phone})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>Destination:</span>
                <span>{completedOrder.customer.city} ({completedOrder.customer.pincode})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>Order Method:</span>
                <span style={{ color: '#128C7E', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageCircle size={15} /> WhatsApp Direct Order
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)', paddingTop: '4px' }}>
                <span>Total Order Value:</span>
                <span>₹{completedOrder.total}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Button to="/" variant="primary" size="md">
                Return to Home
              </Button>
              <Button to="/shop" variant="secondary" size="md">
                Explore More Remedies
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and user navigates directly
  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>
        <h2>No Items to Checkout</h2>
        <p style={{ margin: '16px 0 32px 0', color: 'var(--color-text-muted)' }}>
          Your shopping cart is currently empty. Add Shustha Herbal Remedies before proceeding.
        </p>
        <Button to="/shop" variant="primary" icon={ArrowRight}>
          Explore Herbal Dispensary
        </Button>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ padding: '48px 0 96px 0' }}>
      <div className="container">
        {/* Navigation back */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            to="/cart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem',
              color: 'var(--color-primary)',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} /> Return to Cart
          </Link>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>
            Product Order & WhatsApp Dispatch
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>
            Provide your delivery details below. Submitting will automatically format your order and connect you directly to our dispensary on WhatsApp for instant confirmation.
          </p>
        </div>

        <form onSubmit={handleWhatsAppOrderSubmit}>
          <div className="checkout-grid">
            {/* Left: Customer & Shipping Details Form */}
            <div style={{ background: '#ffffff', padding: '36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                1. Delivery & Contact Details
              </h3>

              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control"
                  placeholder="e.g. Ananditha Rao"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                {errors.fullName && (
                  <span style={{ color: '#b94a48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && (
                    <span style={{ color: '#b94a48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <span style={{ color: '#b94a48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">Full Delivery Street Address *</label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  rows="3"
                  placeholder="House/Apartment #, Street, Landmark, Area"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                {errors.address && (
                  <span style={{ color: '#b94a48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                    {errors.address}
                  </span>
                )}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="city">City / Town *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    placeholder="e.g. Bangalore or Chikmagalur"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  {errors.city && (
                    <span style={{ color: '#b94a48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors.city}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pincode">Postal Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    className="form-control"
                    placeholder="e.g. 560038"
                    value={formData.pincode}
                    onChange={handleInputChange}
                  />
                  {errors.pincode && (
                    <span style={{ color: '#b94a48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors.pincode}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="notes">Special Delivery Instructions / Questions (Optional)</label>
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  className="form-control"
                  placeholder="e.g. Call before delivery, morning preferred"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Right: Order Summary & WhatsApp Dispatch Card */}
            <div>
              <div style={{ background: '#ffffff', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                  2. Order Summary
                </h3>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--color-text-main)' }}>
                      {item.name} × {item.quantity}
                    </span>
                    <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}

                <div className="summary-row" style={{ marginTop: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                  <span>Delivery</span>
                  <span style={{ color: 'var(--color-sage)', fontWeight: 600 }}>FREE</span>
                </div>

                <div className="summary-row total" style={{ marginTop: '12px' }}>
                  <span>Total Amount</span>
                  <span style={{ color: 'var(--color-primary)', fontSize: '1.4rem' }}>₹{subtotal}</span>
                </div>
              </div>

              {/* WHATSAPP ORDER DISPATCH CARD (Replaces QR Code logic) */}
              <div 
                className="whatsapp-order-card"
                style={{
                  background: 'linear-gradient(135deg, #1f0a38 0%, #3b1464 100%)',
                  borderRadius: 'var(--radius-md)',
                  padding: '32px 28px',
                  color: '#ffffff',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(59, 20, 100, 0.25)',
                  border: '1px solid rgba(223, 190, 116, 0.25)'
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37, 211, 102, 0.2)', color: '#25D366', padding: '6px 14px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
                  <MessageCircle size={16} /> Direct WhatsApp Order
                </div>

                <h3 style={{ fontSize: '1.45rem', color: '#ffffff', marginBottom: '8px' }}>
                  Instant WhatsApp Confirmation
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.55', marginBottom: '20px' }}>
                  When you submit this form, your complete order breakdown and address will be automatically compiled and sent to our team at <strong>{CONTACT_INFO.whatsappNumber}</strong>.
                </p>

                <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-sm)', padding: '16px', textAlign: 'left', marginBottom: '24px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <CheckCircle2 size={16} color="#25D366" />
                    <span>Instant stock verification by apothecary staff</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <CheckCircle2 size={16} color="#25D366" />
                    <span>Direct payment links (UPI / NetBanking) sent in chat</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Truck size={16} color="#25D366" />
                    <span>Express dispatch from Bangalore / Chikmagalur</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    background: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '16px 20px',
                    fontSize: '1.08rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)'
                  }}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Formatting WhatsApp Order...' : 'Send Order on WhatsApp'}</span>
                </button>

                <div style={{ marginTop: '16px', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                  Free consultation on dosage included with every order.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
