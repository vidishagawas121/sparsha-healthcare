import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Button from '../components/Button';
import { products } from '../data/products';
import { 
  generateWhatsAppServiceUrl, 
  generateWhatsAppProductUrl,
  CONTACT_INFO 
} from '../data/contactInfo';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  ArrowRight, 
  ShieldCheck,
  MessageCircle,
  Send,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Appointment() {
  const [searchParams] = useSearchParams();

  // Mode: 'service' or 'product'
  const [inquiryType, setInquiryType] = useState('service');

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    center: 'Sparsha Health Care (Hospital - Joythinagar, Chikkamagaluru)',
    service: 'General Consultation',
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM - 12:00 PM)',
    message: '',
    // product inquiry specific
    selectedProduct: 'Shustha Digestive Balance',
    productQuantity: 1
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  useEffect(() => {
    const centerRaw = searchParams.get('center');
    const serviceRaw = searchParams.get('service');
    const programParam = searchParams.get('program');
    const typeParam = searchParams.get('type');

    if (typeParam === 'product') {
      setInquiryType('product');
    }

    const centerParam = centerRaw === 'Sparsha Wellness Retreat' ? 'Sparsha Wellness Resort (Chikkolale)' : centerRaw;
    const serviceParam = serviceRaw === 'Retreat Enquiry' ? 'Wellness Resort Stay Enquiry' : serviceRaw;

    setFormData(prev => ({
      ...prev,
      center: centerParam || prev.center,
      service: serviceParam || prev.service,
      message: programParam ? `Interested in the ${programParam} Wellness Resort Package.` : prev.message
    }));
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.mobile.trim()) errs.mobile = 'Please enter your mobile / WhatsApp number';
    if (!formData.email.trim()) errs.email = 'Please enter your email address';
    if (inquiryType === 'service' && !formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred consultation date';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    let generatedWaUrl = '';
    if (inquiryType === 'service') {
      generatedWaUrl = generateWhatsAppServiceUrl(formData);
    } else {
      // product inquiry
      const matchedProd = products.find(p => p.name === formData.selectedProduct) || {
        name: formData.selectedProduct,
        price: 499,
        category: 'Herbal Remedy'
      };
      generatedWaUrl = generateWhatsAppProductUrl(matchedProd, formData.productQuantity);
    }

    setWhatsappUrl(generatedWaUrl);

    try {
      // Background log to Express server
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          inquiryType
        })
      }).catch(() => {});
    } catch (err) {
      // safe fallback
    }

    // Try opening WhatsApp directly
    try {
      window.open(generatedWaUrl, '_blank');
    } catch (e) {}

    setTimeout(() => {
      setSubmittedData({ ...formData, inquiryType });
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 500);
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="appointment-success-page" style={{ padding: '80px 0 120px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="success-screen-card" style={{ padding: '48px 36px' }}>
            <div className="success-icon-badge" style={{ background: 'rgba(37, 211, 102, 0.12)', color: '#25D366' }}>
              <CheckCircle2 size={46} color="#25D366" />
            </div>

            <div className="eyebrow-tag" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#128C7E' }}>
              ✓ WhatsApp Enquiry Formatted
            </div>

            <h1 style={{ fontSize: '2.3rem', margin: '14px 0' }}>
              Enquiry Ready on WhatsApp!
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '20px' }}>
              Thank you, {submittedData.name}. Your details have been compiled for our care team.
            </p>

            {/* Direct WhatsApp Action Button */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '32px', textAlign: 'center' }}>
              <p style={{ color: '#166534', fontWeight: 600, fontSize: '1.05rem', marginBottom: '14px' }}>
                If WhatsApp did not open automatically, tap below to send your request:
              </p>
              <a
                href={whatsappUrl}
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
                <span>Open WhatsApp & Send Enquiry</span>
                <ExternalLink size={16} />
              </a>
              <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#15803d' }}>
                Connecting with Sparsha Healthcare ({CONTACT_INFO.whatsappNumber})
              </div>
            </div>

            <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'left', marginBottom: '32px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ marginBottom: '16px', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                Request Summary Details:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.92rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Client:</span>
                  <strong>{submittedData.name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>WhatsApp Contact:</span>
                  <strong>{submittedData.mobile}</strong>
                </div>
                {submittedData.inquiryType === 'service' ? (
                  <>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Center:</span>
                      <strong>{submittedData.center}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Service:</span>
                      <strong>{submittedData.service}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Preferred Date:</span>
                      <strong>{submittedData.preferredDate}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Time Slot:</span>
                      <strong>{submittedData.preferredTime}</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Product Inquired:</span>
                      <strong>{submittedData.selectedProduct}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Quantity:</span>
                      <strong>{submittedData.productQuantity}</strong>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Button to="/" variant="primary">
                Return to Homepage
              </Button>
              <Button to="/care" variant="secondary">
                Explore Care Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-page">
      <Hero
        title="Connect With Our Care Team."
        subtitle="Direct consultations, customized herbal advice, and resort stays."
        description="Fill out your requirements below to instantly format and send your enquiry to Sparsha Healthcare's doctors and concierges on WhatsApp."
        backgroundImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80"
        showCtas={false}
        height="45vh"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ background: '#ffffff', padding: '44px 38px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
            
            {/* Inquiry Type Tabs */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', background: 'var(--color-bg-alt)', padding: '6px', borderRadius: '30px' }}>
              <button
                type="button"
                onClick={() => setInquiryType('service')}
                style={{
                  flex: 1,
                  padding: '12px 18px',
                  borderRadius: '24px',
                  border: 'none',
                  background: inquiryType === 'service' ? 'var(--color-primary)' : 'transparent',
                  color: inquiryType === 'service' ? '#ffffff' : 'var(--color-text-muted)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>🩺</span>
                <span>Doctor Consultation & Services</span>
              </button>

              <button
                type="button"
                onClick={() => setInquiryType('product')}
                style={{
                  flex: 1,
                  padding: '12px 18px',
                  borderRadius: '24px',
                  border: 'none',
                  background: inquiryType === 'product' ? 'var(--color-primary)' : 'transparent',
                  color: inquiryType === 'product' ? '#ffffff' : 'var(--color-text-muted)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>🌿</span>
                <span>Herbal Products & Remedies</span>
              </button>
            </div>

            <div className="eyebrow-tag" style={{ marginBottom: '12px', background: 'rgba(37, 211, 102, 0.15)', color: '#128C7E' }}>
              <MessageCircle size={15} /> WhatsApp Instant Coordination
            </div>
            
            <h2 style={{ marginBottom: '8px', fontSize: '1.9rem' }}>
              {inquiryType === 'service' ? 'Service & Consultation Enquiry' : 'Herbal Remedy & Dosage Enquiry'}
            </h2>
            <p style={{ marginBottom: '32px', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Submit your inquiry details below. Your information will be organized and forwarded to our official WhatsApp channel for prompt attention.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <span style={{ color: '#b94a48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="mobile">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    className="form-control"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                  {errors.mobile && (
                    <span style={{ color: '#b94a48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors.mobile}
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

              {inquiryType === 'service' ? (
                <>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="center">Select Center *</label>
                      <select
                        id="center"
                        name="center"
                        className="form-control"
                        value={formData.center}
                        onChange={handleInputChange}
                      >
                        <option value="Sparsha Health Care (Hospital - Joythinagar, Chikkamagaluru)">Sparsha Health Care (Hospital - Joythinagar, Chikkamagaluru)</option>
                        <option value="Sparsha Multicare Center (Bangalore ORR)">Sparsha Multicare Center (Bangalore ORR)</option>
                        <option value="Sparsha Wellness Resort (Chikkolale)">Sparsha Wellness Resort (Chikkolale)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="service">Select Service or Stay *</label>
                      <select
                        id="service"
                        name="service"
                        className="form-control"
                        value={formData.service}
                        onChange={handleInputChange}
                      >
                        <option value="General Consultation">General Consultation</option>
                        <option value="Naturopathy Consultation">Naturopathy Consultation</option>
                        <option value="Ayurvedic Panchakarma">Ayurvedic Panchakarma</option>
                        <option value="Functional Medicine Screening">Functional Medicine Screening</option>
                        <option value="Physiotherapy & Ergonomics">Physiotherapy & Ergonomics</option>
                        <option value="Wellness Resort Stay Enquiry">Wellness Resort Stay Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="preferredDate">Preferred Date *</label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        className="form-control"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.preferredDate && (
                        <span style={{ color: '#b94a48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                          {errors.preferredDate}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="preferredTime">Preferred Time Slot</label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        className="form-control"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                      >
                        <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                        <option value="Evening (4:30 PM - 7:30 PM)">Evening (4:30 PM - 7:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Health Concerns or Specific Inquiries</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      rows="3"
                      placeholder="Briefly describe your symptoms, previous treatments, or goals..."
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="selectedProduct">Select Product Formulation *</label>
                      <select
                        id="selectedProduct"
                        name="selectedProduct"
                        className="form-control"
                        value={formData.selectedProduct}
                        onChange={handleInputChange}
                      >
                        {products.map(p => (
                          <option key={p.id} value={p.name}>
                            {p.name} - ₹{p.price}
                          </option>
                        ))}
                        <option value="Custom Herbal Blend Request">Custom Herbal Blend Request</option>
                        <option value="Doctor Recommended Prescription">Doctor Recommended Prescription</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="productQuantity">Quantity Desired</label>
                      <input
                        type="number"
                        id="productQuantity"
                        name="productQuantity"
                        className="form-control"
                        min="1"
                        max="20"
                        value={formData.productQuantity}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Questions about dosage, ingredients or delivery town</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      rows="3"
                      placeholder="e.g. Can this be taken alongside modern medication? Delivery to Mysore."
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}

              <div style={{ marginTop: '32px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    background: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '16px 24px',
                    fontSize: '1.08rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Formatting WhatsApp Message...' : 'Send Enquiry on WhatsApp'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                <ShieldCheck size={16} color="var(--color-gold)" />
                <span>Direct WhatsApp connection to {CONTACT_INFO.whatsappNumber}</span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
