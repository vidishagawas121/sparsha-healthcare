import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { QrCode, CheckCircle2, ShieldCheck, ArrowLeft, ArrowRight, Printer, Sparkles, AlertCircle } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    address: '',
    city: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

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
    if (!formData.mobileNumber.trim()) errs.mobileNumber = 'Please enter a 10-digit mobile number';
    if (!formData.email.trim()) errs.email = 'Please enter a valid email address';
    if (!formData.address.trim()) errs.address = 'Please enter your delivery address';
    if (!formData.city.trim()) errs.city = 'Please enter your city';
    if (!formData.pincode.trim()) errs.pincode = 'Please enter your postal pincode';
    return errs;
  };

  const handlePaymentCompleted = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // scroll to top of form
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const mockOrderId = `SP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // Optional background sync with mock Express backend if running
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: cartItems,
          total: subtotal,
          paymentMethod: 'UPI QR Payment'
        })
      }).catch(() => {});
    } catch (err) {
      // safe fallback for demo
    }

    setTimeout(() => {
      setCompletedOrder({
        orderId: mockOrderId,
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

  // If order is completed, display Order Placed Successfully Screen
  if (orderComplete && completedOrder) {
    return (
      <div className="checkout-success-page" style={{ padding: '80px 0 120px 0' }}>
        <div className="container">
          <div className="success-screen-card">
            <div className="success-icon-badge">
              <CheckCircle2 size={44} color="var(--color-primary)" />
            </div>

            <div className="eyebrow-tag" style={{ background: 'var(--color-sage-mist)', color: 'var(--color-primary)' }}>
              ✓ Payment Submitted
            </div>

            <h1 style={{ fontSize: '2.2rem', margin: '12px 0' }}>
              Order Placed Successfully
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
              Thank you for choosing Sparsha.
            </p>

            <div className="order-id-badge">
              Order ID: {completedOrder.orderId}
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto 28px auto' }}>
              Your order confirmation and tracking details have been logged for this client demonstration. A dispatch confirmation will be dispatched to <strong>{completedOrder.customer.email}</strong>.
            </p>

            <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'left', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>Delivery To:</span>
                <span>{completedOrder.customer.fullName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>Destination:</span>
                <span>{completedOrder.customer.city} ({completedOrder.customer.pincode})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>Payment Method:</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>UPI QR Code Payment</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                <span>Total Paid:</span>
                <span>₹{completedOrder.total}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Button to="/" variant="primary" size="md">
                Return to Home
              </Button>
              <Button to="/shop" variant="secondary" size="md">
                Continue Shopping
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
        <p style={{ margin: '16px 0 28px 0', color: 'var(--color-text-muted)' }}>
          Please add products to your cart before proceeding to checkout.
        </p>
        <Button to="/shop" variant="primary">
          Explore Herbal Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ padding: '56px 0 100px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Return to Cart
          </Link>
          <h1 style={{ marginTop: '12px' }}>Secure Checkout</h1>
        </div>

        <form onSubmit={handlePaymentCompleted}>
          <div className="cart-layout">
            {/* Left: Customer & Delivery Details */}
            <div style={{ background: '#ffffff', padding: '36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                1. Delivery Information
              </h3>

              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control"
                  placeholder="e.g. Ramesh Hegde"
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
                  <label className="form-label" htmlFor="mobileNumber">Mobile Number *</label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    className="form-control"
                    placeholder="e.g. 9876543210"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                  />
                  {errors.mobileNumber && (
                    <span style={{ color: '#b94a48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors.mobileNumber}
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
                    placeholder="e.g. ramesh@example.com"
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
                <label className="form-label" htmlFor="address">Street Address *</label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  rows="3"
                  placeholder="Apartment, building, street, and landmark..."
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
                  <label className="form-label" htmlFor="city">City / District *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    placeholder="e.g. Chikmagalur / Bangalore"
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
                    placeholder="e.g. 577101"
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
            </div>

            {/* Right: QR Code Payment Demonstration */}
            <div>
              <div style={{ background: '#ffffff', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '24px' }}>
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

                <div className="summary-row total" style={{ marginTop: '16px' }}>
                  <span>Total Due</span>
                  <span style={{ color: 'var(--color-primary)' }}>₹{subtotal}</span>
                </div>
              </div>

              {/* QR PAYMENT CARD (Core Requirement) */}
              <div className="qr-payment-card">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>
                  <QrCode size={16} /> Payment Method
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>
                  QR Code Payment
                </h3>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
                  Instant zero-fee payment via any UPI application
                </div>

                {/* Styled SVG UPI QR Code Graphic */}
                <div className="qr-code-box">
                  <svg viewBox="0 0 200 200" width="190" height="190" xmlns="http://www.w3.org/2000/svg">
                    {/* Background */}
                    <rect width="200" height="200" fill="#ffffff" />
                    {/* Corner Position Detection Squares */}
                    {/* Top-Left */}
                    <rect x="15" y="15" width="50" height="50" fill="#143324" rx="4" />
                    <rect x="23" y="23" width="34" height="34" fill="#ffffff" rx="2" />
                    <rect x="31" y="31" width="18" height="18" fill="#143324" rx="2" />

                    {/* Top-Right */}
                    <rect x="135" y="15" width="50" height="50" fill="#143324" rx="4" />
                    <rect x="143" y="23" width="34" height="34" fill="#ffffff" rx="2" />
                    <rect x="151" y="31" width="18" height="18" fill="#143324" rx="2" />

                    {/* Bottom-Left */}
                    <rect x="15" y="135" width="50" height="50" fill="#143324" rx="4" />
                    <rect x="23" y="143" width="34" height="34" fill="#ffffff" rx="2" />
                    <rect x="31" y="151" width="18" height="18" fill="#143324" rx="2" />

                    {/* Decorative QR Pattern Modules */}
                    <rect x="75" y="20" width="10" height="10" fill="#143324" />
                    <rect x="95" y="20" width="10" height="10" fill="#143324" />
                    <rect x="115" y="20" width="10" height="10" fill="#143324" />
                    <rect x="75" y="40" width="20" height="10" fill="#143324" />
                    <rect x="105" y="40" width="10" height="20" fill="#143324" />

                    {/* Middle Rows */}
                    <rect x="20" y="75" width="10" height="10" fill="#143324" />
                    <rect x="40" y="75" width="20" height="10" fill="#143324" />
                    <rect x="75" y="75" width="10" height="20" fill="#143324" />
                    <rect x="135" y="75" width="20" height="10" fill="#143324" />
                    <rect x="165" y="75" width="15" height="15" fill="#143324" />

                    {/* Center Brand Badge Circle */}
                    <circle cx="100" cy="100" r="24" fill="#143324" />
                    <circle cx="100" cy="100" r="20" fill="#c29b48" />
                    <text x="100" y="105" font-family="'Playfair Display', serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">S</text>

                    {/* Lower Modules */}
                    <rect x="75" y="115" width="20" height="10" fill="#143324" />
                    <rect x="105" y="115" width="10" height="20" fill="#143324" />
                    <rect x="135" y="115" width="15" height="15" fill="#143324" />
                    <rect x="165" y="115" width="15" height="10" fill="#143324" />

                    <rect x="75" y="145" width="15" height="15" fill="#143324" />
                    <rect x="100" y="145" width="20" height="10" fill="#143324" />
                    <rect x="135" y="145" width="20" height="20" fill="#143324" />
                    <rect x="165" y="145" width="15" height="15" fill="#143324" />

                    <rect x="75" y="170" width="10" height="15" fill="#143324" />
                    <rect x="95" y="170" width="25" height="10" fill="#143324" />
                    <rect x="135" y="175" width="45" height="10" fill="#143324" />
                  </svg>
                </div>

                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '6px' }}>
                  Pay ₹{subtotal} via UPI
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.5', margin: '0 auto 16px auto', maxWidth: '300px' }}>
                  Scan the QR code using any supported UPI application to complete the payment.
                </p>

                <div className="upi-logos-row">
                  <span className="upi-badge">Google Pay</span>
                  <span className="upi-badge">PhonePe</span>
                  <span className="upi-badge">Paytm</span>
                  <span className="upi-badge">BHIM</span>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <Button
                    type="submit"
                    variant="gold"
                    block
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing Payment...' : 'I Have Completed Payment'}
                  </Button>
                </div>

                <div style={{ marginTop: '16px', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Demo Notice: Simulates QR payment confirmation without deducting actual funds.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
