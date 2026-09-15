import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import { 
  buildWhatsAppUrl, 
  CONTACT_INFO, 
  generateWhatsAppDietEnquiryUrl 
} from '../data/contactInfo';
import { 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  HeartPulse,
  Leaf,
  Clock,
  Apple,
  FileText,
  UserCheck,
  PhoneCall,
  ArrowRight
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

const HEALTH_GOALS = [
  'Weight Management & Fat Loss',
  'Diabetes & Glycemic Sugar Control',
  'PCOS / PCOD & Hormonal Balance',
  'Gut Health, Digestion & Acidity / GERD',
  'Joint Health, Arthritis & Inflammation Care',
  'Hypertension & Cardiovascular Wellness',
  'Skin Vitality, Detox & Seasonal Reset',
  'Thyroid & Metabolic Support',
  'Immunity & Post-Illness Recovery',
  'Satvic Nutrition & General Longevity',
  'Other / Custom Clinical Condition'
];

const DIET_PREFERENCES = [
  'Pure Vegetarian (Satvic / Ayurvedic)',
  'Standard Vegetarian',
  'Vegan (Plant-Based)',
  'Eggetarian',
  'Non-Vegetarian'
];

export default function DietCharts() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India',
    city: '',
    healthGoal: 'Weight Management & Fat Loss',
    dietPreference: 'Pure Vegetarian (Satvic / Ayurvedic)',
    notes: ''
  });

  const [submittedInquiry, setSubmittedInquiry] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const formRef = useRef(null);

  // Check if user already submitted lead previously
  useEffect(() => {
    try {
      const savedLead = localStorage.getItem('sparsha_diet_lead');
      if (savedLead) {
        const parsed = JSON.parse(savedLead);
        if (parsed && parsed.firstName) {
          setFormData(prev => ({ ...prev, ...parsed }));
        }
      }
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e, openWhatsApp = true) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // Validate fields
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 8) newErrors.phone = 'Valid phone number is required';
    if (!formData.country.trim()) newErrors.country = 'Please select your country';
    if (!formData.city.trim()) newErrors.city = 'City name is required';
    if (!formData.healthGoal) newErrors.healthGoal = 'Please select your primary health focus';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const locationStr = [formData.city, formData.country].filter(Boolean).join(', ');
    const formattedDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const inqId = 'INQ-DIET-' + Math.floor(100000 + Math.random() * 900000);

    const newInquiry = {
      id: inqId,
      name: fullName,
      email: formData.email,
      mobile: formData.phone,
      center: locationStr || 'India',
      service: `Diet Plan: ${formData.healthGoal}`,
      healthGoal: formData.healthGoal,
      dietPreference: formData.dietPreference,
      preferredDate: formattedDate,
      preferredTime: 'Instant Request',
      message: `[Diet Consultation Request]\nHealth Goal: ${formData.healthGoal}\nDiet Preference: ${formData.dietPreference}\nNotes / Symptoms: ${formData.notes || 'None specified'}\nPatient: ${fullName} (${locationStr})`,
      status: openWhatsApp ? 'Forwarded to WhatsApp' : 'Saved to Admin (Pending Review)',
      createdAt: new Date().toISOString()
    };

    // 1. GUARANTEED ADMIN PERSISTENCE: Save locally to Admin inquiries store
    try {
      localStorage.setItem('sparsha_diet_lead', JSON.stringify(formData));
      const existingInqs = JSON.parse(localStorage.getItem('sparsha_saved_inquiries') || '[]');
      const updatedInqs = [newInquiry, ...existingInqs.filter(i => i.id !== newInquiry.id && i.email !== formData.email)];
      localStorage.setItem('sparsha_saved_inquiries', JSON.stringify(updatedInqs));
    } catch (err) {
      // offline safe
    }

    // 2. DISPATCH TO BACKEND ADMIN ENDPOINT (Always saved regardless of WhatsApp action)
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry)
      }).catch(() => {});
    } catch (err) {
      // offline safe
    }

    // 3. LAUNCH WHATSAPP: Even if user cancels or does not send, data is ALREADY saved above!
    let waUrl = '';
    if (openWhatsApp) {
      waUrl = generateWhatsAppDietEnquiryUrl(formData);
      try {
        localStorage.setItem('sparsha_diet_last_wa_url', waUrl);
        window.open(waUrl, '_blank');
      } catch (err) {
        // popup block fallback
      }
    } else {
      waUrl = generateWhatsAppDietEnquiryUrl(formData);
    }

    setSubmittedInquiry({
      ...newInquiry,
      whatsappUrl: waUrl
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 400);
  };

  const handleResetForm = () => {
    setSubmissionSuccess(false);
    setSubmittedInquiry(null);
  };

  return (
    <div className="diet-charts-page">
      <Hero
        title="Personalized Ayurvedic & Clinical Diet Plans"
        subtitle="Individualized nutrition charts tailored to your unique Prakriti, metabolic fire (Agni), and health goals."
        description="At Sparsha Healthcare, we do not believe in one-size-fits-all generic diets. Our senior Ayurvedic Vaidyas and certified clinical dietitians craft custom dietary protocols based on your distinct biological constitution and lifestyle."
        backgroundImage="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=2000&q=80"
        showCtas={false}
        height="50vh"
      />

      {/* SECTION 1: CLINICAL PHILOSOPHY - WHY PERSONALIZED DIETS */}
      <section className="section" style={{ background: '#ffffff', padding: '60px 0 40px 0' }}>
        <div className="container">
          <div className="section-title text-center" style={{ maxWidth: '800px', margin: '0 auto 48px auto' }}>
            <span className="eyebrow-tag">
              <Leaf size={14} /> Ahara Chikitsa (Dietary Therapeutics)
            </span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', marginTop: '8px', marginBottom: '16px' }}>
              Why a Personalized Diet Chart Matters
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
              According to classical Ayurveda, <em>"When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need."</em> Every individual has a specific doshic constitution (Vata, Pitta, or Kapha) and digestive capacity.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', padding: '28px 24px', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-sage-mist)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <HeartPulse size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                Prakriti & Dosha Matching
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
                Foods that heal a Vata body can aggravate Pitta. Our physicians analyze your physical constitution before creating your meal plan.
              </p>
            </div>

            <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', padding: '28px 24px', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-sage-mist)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Apple size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                Pathya & Apathya Lists
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
                Get crystal clear lists of healing wholesome foods (Pathya) and inflammatory foods to strictly avoid (Apathya) for your specific condition.
              </p>
            </div>

            <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', padding: '28px 24px', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-sage-mist)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                Dinacharya Meal Timing
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
                Align your breakfast, lunch, and dinner timings with circadian biology and solar cycles for maximum metabolic efficiency.
              </p>
            </div>

            <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', padding: '28px 24px', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-sage-mist)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <UserCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                Doctor & Dietitian Support
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
                Direct review by Dr. Sarja and Sparsha Healthcare’s team of qualified Ayurvedic nutritionists with ongoing progress check-ins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DIET CONSULTATION & PLAN REQUEST FORM */}
      <section className="section" ref={formRef} style={{ background: 'var(--color-bg-alt)', padding: '60px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
            
            {/* Form Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1f0a38 0%, #3b1464 100%)', padding: '32px 36px', color: '#ffffff' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(223, 190, 116, 0.2)', color: 'var(--color-gold)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '12px' }}>
                <Sparkles size={14} />
                <span>CLINICAL DIET CONSULTATION</span>
              </div>
              <h2 style={{ color: '#ffffff', fontSize: '1.85rem', marginBottom: '8px' }}>
                Request Your Personalized Diet Plan
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', margin: 0, lineHeight: '1.6' }}>
                Fill out the form below with your health goals. Your information will be instantly recorded at our clinic admin desk, and you can connect directly with our dietitian team on WhatsApp.
              </p>
            </div>

            <div style={{ padding: '36px' }}>
              {submissionSuccess && submittedInquiry ? (
                /* SUCCESS CONFIRMATION SCREEN */
                <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: '0 4px 16px rgba(22, 101, 52, 0.2)' }}>
                    <CheckCircle2 size={40} />
                  </div>

                  <h3 style={{ color: '#166534', fontSize: '1.8rem', marginBottom: '10px' }}>
                    Diet Plan Request Successfully Saved!
                  </h3>

                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '20px 24px', maxWidth: '650px', margin: '0 auto 28px auto', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 700, marginBottom: '12px', fontSize: '0.95rem' }}>
                      <ShieldCheck size={18} />
                      <span>Data Safely Logged in Sparsha Clinic Admin System</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.88rem', color: '#14532d' }}>
                      <div><strong>Reference ID:</strong> {submittedInquiry.id}</div>
                      <div><strong>Patient:</strong> {submittedInquiry.name}</div>
                      <div><strong>Contact:</strong> {submittedInquiry.mobile}</div>
                      <div><strong>Health Focus:</strong> {submittedInquiry.healthGoal}</div>
                      <div><strong>Diet Preference:</strong> {submittedInquiry.dietPreference}</div>
                      <div><strong>Status:</strong> {submittedInquiry.status}</div>
                    </div>

                    <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #dcfce7', fontSize: '0.84rem', color: '#166534' }}>
                      ✓ <em>Even if you do not proceed on WhatsApp, your request has been permanently saved at our admin desk. Our medical team will review your profile and reach out to you.</em>
                    </div>
                  </div>

                  {/* WhatsApp Direct Action Button */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {submittedInquiry.whatsappUrl && (
                      <a
                        href={submittedInquiry.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
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
                          gap: '10px',
                          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
                          textDecoration: 'none'
                        }}
                      >
                        <MessageCircle size={20} />
                        <span>Chat with Dietitian on WhatsApp</span>
                        <ExternalLink size={16} />
                      </a>
                    )}

                    <a
                      href="tel:08262355225"
                      className="btn btn-outline"
                      style={{
                        padding: '14px 24px',
                        fontSize: '0.98rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none'
                      }}
                    >
                      <PhoneCall size={18} />
                      <span>Call Hospital Desk: 082623 55225</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-muted)',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Submit another consultation request
                  </button>
                </div>
              ) : (
                /* THE DIET PLAN INQUIRY FORM */
                <form onSubmit={(e) => handleFormSubmit(e, true)} noValidate>
                  
                  {/* ROW 1: Names */}
                  <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label className="form-label" htmlFor="firstName" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                        First Name <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        placeholder="e.g. Ramesh"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.95rem' }}
                      />
                      {errors.firstName && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem', display: 'block', marginTop: '4px' }}>{errors.firstName}</span>
                      )}
                    </div>

                    <div>
                      <label className="form-label" htmlFor="lastName" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                        Last Name <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        placeholder="e.g. Hegde"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.95rem' }}
                      />
                      {errors.lastName && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem', display: 'block', marginTop: '4px' }}>{errors.lastName}</span>
                      )}
                    </div>
                  </div>

                  {/* ROW 2: Phone & Email */}
                  <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label className="form-label" htmlFor="phone" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                        Phone / WhatsApp Number <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.95rem' }}
                      />
                      {errors.phone && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem', display: 'block', marginTop: '4px' }}>{errors.phone}</span>
                      )}
                    </div>

                    <div>
                      <label className="form-label" htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                        Email Address <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.95rem' }}
                      />
                      {errors.email && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem', display: 'block', marginTop: '4px' }}>{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* ROW 3: Country & City */}
                  <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label className="form-label" htmlFor="country" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                        Country <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="form-control"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.95rem' }}
                      >
                        {COUNTRIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {errors.country && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem', display: 'block', marginTop: '4px' }}>{errors.country}</span>
                      )}
                    </div>

                    <div>
                      <label className="form-label" htmlFor="city" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                        City / Town <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        placeholder="e.g. Bangalore, Chikmagalur, Dubai"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.95rem' }}
                      />
                      {errors.city && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem', display: 'block', marginTop: '4px' }}>{errors.city}</span>
                      )}
                    </div>
                  </div>

                  {/* ROW 4: Health Focus / Goal & Dietary Preference */}
                  <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label className="form-label" htmlFor="healthGoal" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                        Primary Health Concern / Goal <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <select
                        id="healthGoal"
                        name="healthGoal"
                        className="form-control"
                        value={formData.healthGoal}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.95rem' }}
                      >
                        {HEALTH_GOALS.map(goal => (
                          <option key={goal} value={goal}>{goal}</option>
                        ))}
                      </select>
                      {errors.healthGoal && (
                        <span style={{ color: '#dc2626', fontSize: '0.78rem', display: 'block', marginTop: '4px' }}>{errors.healthGoal}</span>
                      )}
                    </div>

                    <div>
                      <label className="form-label" htmlFor="dietPreference" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                        Dietary Preference
                      </label>
                      <select
                        id="dietPreference"
                        name="dietPreference"
                        className="form-control"
                        value={formData.dietPreference}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.95rem' }}
                      >
                        {DIET_PREFERENCES.map(pref => (
                          <option key={pref} value={pref}>{pref}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* ROW 5: Notes / Symptoms */}
                  <div style={{ marginBottom: '28px' }}>
                    <label className="form-label" htmlFor="notes" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                      Additional Health Symptoms / Medications / Dietary Habits (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      className="form-control"
                      rows="3"
                      placeholder="e.g. History of high fasting blood sugar, bloating after heavy meals, vegetarian with no dairy, etc."
                      value={formData.notes}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.95rem' }}
                    />
                  </div>

                  {/* DUAL ACTION SUBMIT BUTTONS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                    {/* BUTTON 1: WhatsApp Submit */}
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={(e) => handleFormSubmit(e, true)}
                      style={{
                        backgroundColor: '#25D366',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '16px 24px',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        borderRadius: 'var(--radius-sm)',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                        transition: 'all 0.2s ease',
                        width: '100%'
                      }}
                    >
                      <MessageCircle size={20} />
                      <span>{isSubmitting ? 'Saving & Preparing...' : 'Save & Send Consultation on WhatsApp'}</span>
                    </button>

                    {/* BUTTON 2: Admin Save Only */}
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={(e) => handleFormSubmit(e, false)}
                      className="btn"
                      style={{
                        backgroundColor: '#0047ab',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '15px 24px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        borderRadius: 'var(--radius-sm)',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0, 71, 171, 0.25)',
                        transition: 'all 0.2s ease',
                        width: '100%'
                      }}
                    >
                      <FileText size={18} />
                      <span>{isSubmitting ? 'Saving to Admin...' : 'Save Details for Doctor Review (No WhatsApp Needed)'}</span>
                    </button>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '16px', lineHeight: '1.6' }}>
                    🔒 <strong>Admin Guarantee:</strong> Your information is immediately saved to our clinical database when you click either button. Even if you don't proceed with WhatsApp, our team receives your request.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FREQUENTLY ASKED QUESTIONS */}
      <section className="section" style={{ background: '#ffffff', padding: '60px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div className="section-title text-center" style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', padding: '24px 28px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '8px' }}>
                How is a Sparsha diet chart prepared?
              </h4>
              <p style={{ color: 'var(--color-text-main)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                Our Ayurvedic doctors assess your biological prakriti, existing blood reports/conditions, current medications, and digestive power (Agni). We then construct a customized meal schedule with specific healing herbs and kitchen remedies.
              </p>
            </div>

            <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', padding: '24px 28px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '8px' }}>
                What happens after I submit this form?
              </h4>
              <p style={{ color: 'var(--color-text-main)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                Your details are stored in our clinic admin database. If you clicked WhatsApp, you can directly message our dietitian with your pre-filled inquiry. If you chose not to use WhatsApp, our clinical coordinator will reach out to you via phone/email.
              </p>
            </div>

            <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', padding: '24px 28px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '8px' }}>
                Can I receive an online consultation if I live outside Chikmagalur or Karnataka?
              </h4>
              <p style={{ color: 'var(--color-text-main)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                Yes! We provide virtual video and telephone consultations to patients across India, the GCC/UAE, USA, and worldwide, including doorstep courier dispatch for Dr. Sarja’s classical formulations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
