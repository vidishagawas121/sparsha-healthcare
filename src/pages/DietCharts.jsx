import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { DIET_CHARTS } from '../data/dietChartsData';
import { buildWhatsAppUrl, CONTACT_INFO, generateWhatsAppDietEnquiryUrl } from '../data/contactInfo';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  MessageCircle, 
  Sparkles, 
  AlertCircle,
  Download,
  ExternalLink,
  BookOpen,
  Lock,
  Unlock,
  Check,
  ArrowDown,
  UserCheck
} from 'lucide-react';

const COUNTRIES = [
  'India',
  'United Arab Emirates',
  'United States',
  'United Kingdom',
  'Australia',
  'Canada',
  'Singapore',
  'Malaysia',
  'Germany',
  'Saudi Arabia',
  'Kuwait',
  'Qatar',
  'Oman',
  'Bahrain',
  'New Zealand',
  'South Africa',
  'Other'
];

export default function DietCharts() {
  const navigate = useNavigate();
  const [activeChartId, setActiveChartId] = useState(DIET_CHARTS[0].id);
  const [hasAccess, setHasAccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India',
    city: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const libraryRef = useRef(null);
  const formRef = useRef(null);

  // Check if user already submitted lead previously
  useEffect(() => {
    try {
      const savedLead = localStorage.getItem('sparsha_diet_lead');
      if (savedLead) {
        const parsed = JSON.parse(savedLead);
        if (parsed && parsed.firstName) {
          setFormData(parsed);
          setHasAccess(true);
        }
      }
    } catch (e) {
      // safe fallback
    }
  }, []);

  const currentChart = DIET_CHARTS.find(c => c.id === activeChartId) || DIET_CHARTS[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 8) newErrors.phone = 'Valid phone number is required';
    if (!formData.country.trim()) newErrors.country = 'Please select your country';
    if (!formData.city.trim()) newErrors.city = 'City name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const locationStr = [formData.city, formData.country].filter(Boolean).join(', ');
    const formattedDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const newInquiry = {
      id: 'INQ-DIET-' + Math.floor(100000 + Math.random() * 900000),
      name: fullName,
      email: formData.email,
      mobile: formData.phone,
      center: locationStr || 'India',
      service: 'Diet Charts Library & Clinical Nutrition Enquiry',
      preferredDate: formattedDate,
      preferredTime: 'Instant Access',
      message: `Patient ${fullName} from ${locationStr} filled the Diet Charts form and requested personalized consultation enquiry.`,
      status: 'Forwarded to WhatsApp',
      createdAt: new Date().toISOString()
    };

    // 1. Persist lead and admin inquiry in localStorage
    try {
      localStorage.setItem('sparsha_diet_lead', JSON.stringify(formData));
      const existingInqs = JSON.parse(localStorage.getItem('sparsha_saved_inquiries') || '[]');
      localStorage.setItem('sparsha_saved_inquiries', JSON.stringify([newInquiry, ...existingInqs.filter(i => i.email !== formData.email)]));
    } catch (e) {
      // offline safe
    }

    // 2. Dispatch to Admin backend endpoints (/api/appointments and /api/inquiries)
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry)
      }).catch(() => {});
    } catch (err) {
      // offline safe
    }

    // 3. Generate direct WhatsApp URL & launch WhatsApp chat with Admin / Doctor
    const whatsappUrl = generateWhatsAppDietEnquiryUrl(formData);
    try {
      localStorage.setItem('sparsha_diet_last_wa_url', whatsappUrl);
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      // popup block fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setHasAccess(true);
      setShowEditForm(false);
      // Navigate directly to the requested download files page
      navigate('/diet-charts/download-files');
    }, 300);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppDietRequest = (chart) => {
    const userSignature = formData.firstName ? `\nPatient Name: ${formData.firstName} ${formData.lastName} (${formData.city}, ${formData.country})` : '';
    const message = `SPARSHA HEALTHCARE - DIET REGIMEN CONSULTATION\n------------------------------------\nProtocol: ${chart.title}\nCategory: ${chart.category}${userSignature}\n\nHello Doctor, I have accessed this diet chart on your website and would like a personalized dosha-specific nutrition plan. Please guide me.`;
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="diet-charts-page">
      {/* SECTION 1: INTRODUCTORY SECTION & DOWNLOAD DIET CHARTS FORM */}
      <section className="diet-lead-section" ref={formRef}>
        <div className="container">
          
          {/* Top Intro Paragraph matching drmanojjohnson.com */}
          <div className="diet-lead-intro">
            Proper nutrition is the foundation of good health and healing. This page provides comprehensive diet charts designed to support various <strong>health conditions</strong>, lifestyle goals, and individual needs through evidence-based nutritional guidance and holistic dietary approaches.
          </div>

          {/* Split Layout: Image on Left + Form on Right */}
          <div className="diet-lead-split">
            {/* Left Column: Wholesome Nutrition Meal Image */}
            <div className="diet-lead-image-col">
              <img 
                src="/images/diet_healthy_meal.jpg" 
                alt="Wholesome healthy nutrition and balanced satvic diet meal"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/ayurveda_shirodhara.jpg';
                }}
              />
            </div>

            {/* Right Column: Download Diet Charts Form */}
            <div className="diet-lead-form-col">
              {hasAccess && !showEditForm ? (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '36px 30px', textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ color: '#166534', fontSize: '1.8rem', marginBottom: '8px' }}>
                    Access Granted!
                  </h3>
                  <p style={{ color: '#14532d', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    Welcome, <strong>{formData.firstName} {formData.lastName}</strong> ({formData.email}). Your access to the complete Sparsha clinical diet charts library is fully unlocked.
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => navigate('/diet-charts/download-files')}
                      className="btn btn-primary"
                      style={{ background: '#0047ab', borderColor: '#0047ab', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Sparkles size={16} />
                      <span>Go to Download Files Page</span>
                      <ExternalLink size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (libraryRef.current) {
                          libraryRef.current.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="btn btn-outline"
                      style={{ fontSize: '0.88rem' }}
                    >
                      <ArrowDown size={14} />
                      <span>View Charts Below</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowEditForm(true)}
                      className="btn btn-outline"
                      style={{ fontSize: '0.88rem' }}
                    >
                      Update Details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate>
                  <h2 className="diet-lead-title">
                    Download Diet Charts
                  </h2>

                  <p className="diet-lead-desc">
                    Enter your name, email, and phone number to access our complete library of diet charts. Once submitted, you’ll be taken to a download page where you can view and download any chart you need.
                  </p>

                  {/* Row 1: First Name & Last Name */}
                  <div className="diet-form-grid-2">
                    <div className="diet-form-field">
                      <label className="diet-form-label" htmlFor="firstName">
                        First Name <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="diet-form-input"
                        placeholder="Enter Your First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.firstName && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors.firstName}</span>
                      )}
                    </div>

                    <div className="diet-form-field">
                      <label className="diet-form-label" htmlFor="lastName">
                        Last Name <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="diet-form-input"
                        placeholder="Enter Your Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.lastName && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors.lastName}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="diet-form-grid-2">
                    <div className="diet-form-field">
                      <label className="diet-form-label" htmlFor="email">
                        Email <span className="required-star">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="diet-form-input"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.email && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors.email}</span>
                      )}
                    </div>

                    <div className="diet-form-field">
                      <label className="diet-form-label" htmlFor="phone">
                        Phone <span className="required-star">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="diet-form-input"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.phone && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Country & City */}
                  <div className="diet-form-grid-2">
                    <div className="diet-form-field">
                      <label className="diet-form-label" htmlFor="country">
                        Country <span className="required-star">*</span>
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="diet-form-input"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {errors.country && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors.country}</span>
                      )}
                    </div>

                    <div className="diet-form-field">
                      <label className="diet-form-label" htmlFor="city">
                        City <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="diet-form-input"
                        placeholder="Your City Name"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.city && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors.city}</span>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="diet-submit-btn"
                  >
                    {isSubmitting ? 'Accessing Library...' : 'VIEW DIET CHARTS'}
                  </button>

                  {hasAccess && showEditForm && (
                    <button
                      type="button"
                      onClick={() => setShowEditForm(false)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.85rem', cursor: 'pointer', marginTop: '12px', width: '100%', textAlign: 'center' }}
                    >
                      Cancel and return to Diet Charts library
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPLETE DIET CHARTS DOWNLOAD & PROTOCOL LIBRARY */}
      <section 
        className="section section-alt" 
        id="diet-library-section" 
        ref={libraryRef}
        style={{ padding: '64px 0 96px 0' }}
      >
        <div className="container">

          {/* Section Header */}
          <SectionTitle
            eyebrow="Clinical Diet Library"
            title="Evidence-Based Nutritional Protocols"
            subtitle="Explore whole-food schedules tailored to kindle digestive Agni, eliminate metabolic toxicity (Ama), and rebalance endocrine health."
          />

          {/* Unlocked Banner if user filled the form */}
          {hasAccess ? (
            <div className="diet-unlocked-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={24} color="#166534" />
                <div>
                  <strong style={{ color: '#166534', fontSize: '1.02rem', display: 'block' }}>
                    Library Access Unlocked for {formData.firstName} {formData.lastName}
                  </strong>
                  <span style={{ fontSize: '0.86rem', color: '#15803d' }}>
                    You can view hour-by-hour schedules, Pathya/Apathya foods, and click "Print / Save PDF" on any chart to save to your device.
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-outline btn-sm"
                  style={{ background: '#ffffff' }}
                >
                  <Printer size={15} /> Print Active Chart
                </button>
              </div>
            </div>
          ) : (
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#92400e', fontSize: '0.92rem' }}>
                <Lock size={18} />
                <span>Showing chart previews. Fill out the form above to access and download the complete PDF guides.</span>
              </div>
              <button
                type="button"
                onClick={scrollToForm}
                className="btn btn-sm btn-primary"
                style={{ background: '#0047ab', borderColor: '#0047ab' }}
              >
                Fill Form to Unlock
              </button>
            </div>
          )}

          {/* Diet Charts Selector Tabs */}
          <div className="diet-charts-tabs-wrapper" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
            {DIET_CHARTS.map((chart) => (
              <button
                key={chart.id}
                type="button"
                onClick={() => setActiveChartId(chart.id)}
                style={{
                  background: activeChartId === chart.id ? 'var(--color-primary)' : '#ffffff',
                  color: activeChartId === chart.id ? '#ffffff' : 'var(--color-text-main)',
                  border: '1px solid',
                  borderColor: activeChartId === chart.id ? 'var(--color-primary)' : 'var(--color-border)',
                  borderRadius: '30px',
                  padding: '12px 22px',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: activeChartId === chart.id ? '0 4px 12px rgba(59, 20, 100, 0.25)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{chart.icon}</span>
                <span>{chart.title.split('Diet Chart')[0].trim()}</span>
              </button>
            ))}
          </div>

          {/* Active Chart Presentation Box */}
          <div 
            className="diet-chart-container"
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '48px 40px',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {/* Header with Title & Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '24px', marginBottom: '32px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--color-sage-mist)', color: 'var(--color-primary)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                  <Sparkles size={14} /> Clinical Nutritional Protocol
                </div>
                <h1 style={{ fontSize: '2.2rem', marginBottom: '10px', color: 'var(--color-primary)' }}>
                  {currentChart.title}
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '720px', lineHeight: '1.6' }}>
                  {currentChart.description}
                </p>
                <div style={{ marginTop: '12px', fontSize: '0.88rem', color: 'var(--color-text-main)' }}>
                  <strong>Target Conditions:</strong> {currentChart.targetConditions}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}
                >
                  <Download size={16} />
                  <span>Download / Print PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsAppDietRequest(currentChart)}
                  style={{
                    background: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 18px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)'
                  }}
                >
                  <MessageCircle size={16} />
                  <span>Customize on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Hour-by-Hour Daily Meal Schedule Timeline */}
            <div style={{ marginBottom: '48px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-primary)' }}>
                <Clock size={20} color="var(--color-gold)" />
                <span>Hour-by-Hour Daily Routine</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {currentChart.schedule.map((slot, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '120px 1fr',
                      gap: '24px',
                      padding: '20px 24px',
                      background: index % 2 === 0 ? 'var(--color-bg-alt)' : '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      alignItems: 'center'
                    }}
                    className="diet-schedule-row"
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                        {slot.time}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Routine
                      </div>
                    </div>

                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--color-primary)', marginBottom: '4px' }}>
                        {slot.title}
                      </div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: '1.55', marginBottom: '6px' }}>
                        {slot.meal}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-sage)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>💡 Benefit:</span>
                        <span>{slot.benefit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Do's and Don'ts / Foods to Include vs Avoid Comparison Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }} className="diet-foods-grid">
              {/* Foods to Include */}
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '28px' }}>
                <h4 style={{ color: '#166534', fontSize: '1.2rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} color="#166534" />
                  <span>Foods to Emphasize (Pathya)</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {currentChart.foodsToInclude.map((item, i) => (
                    <div key={i} style={{ borderBottom: '1px solid #dcfce7', paddingBottom: '10px' }}>
                      <div style={{ fontWeight: 700, color: '#14532d', fontSize: '0.95rem' }}>
                        ✓ {item.food}
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#166534', marginTop: '2px' }}>
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Foods to Avoid */}
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '28px' }}>
                <h4 style={{ color: '#991b1b', fontSize: '1.2rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <XCircle size={20} color="#991b1b" />
                  <span>Foods to Strictly Avoid (Apathya)</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {currentChart.foodsToAvoid.map((item, i) => (
                    <div key={i} style={{ borderBottom: '1px solid #fee2e2', paddingBottom: '10px' }}>
                      <div style={{ fontWeight: 700, color: '#7f1d1d', fontSize: '0.95rem' }}>
                        ✗ {item.food}
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#991b1b', marginTop: '2px' }}>
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Doctor Note */}
            {currentChart.doctorNote && (
              <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)', padding: '20px 24px', borderLeft: '4px solid var(--color-gold)', display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '32px' }}>
                <AlertCircle size={20} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
                  <strong>Physician Clinical Note:</strong> {currentChart.doctorNote}
                </div>
              </div>
            )}

            {/* Consultation Callout Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1f0a38 0%, #3b1464 100%)', borderRadius: 'var(--radius-md)', padding: '36px', color: '#ffffff', textAlign: 'center', border: '1px solid rgba(223, 190, 116, 0.25)', boxShadow: '0 8px 32px rgba(15, 5, 30, 0.25)' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1.6rem', marginBottom: '10px' }}>
                Need a Personalized Diet Chart for Your Body Type?
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
                Every individual has a unique Prakriti (Vata, Pitta, or Kapha constitution). Consult with our certified clinical dietitians on WhatsApp for a custom meal plan.
              </p>
              <button
                type="button"
                className="btn"
                onClick={() => handleWhatsAppDietRequest(currentChart)}
                style={{
                  background: '#25D366',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px 28px',
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
                  maxWidth: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <MessageCircle size={20} />
                <span>Request Custom Diet on WhatsApp</span>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
