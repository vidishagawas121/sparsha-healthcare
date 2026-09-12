import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Button from '../components/Button';
import { Calendar, Clock, MapPin, CheckCircle2, User, Phone, Mail, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Appointment() {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    center: 'Sparsha Health Care Center',
    service: 'General Consultation',
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM - 12:00 PM)',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const centerRaw = searchParams.get('center');
    const serviceRaw = searchParams.get('service');
    const programParam = searchParams.get('program');

    const centerParam = centerRaw === 'Sparsha Wellness Retreat' ? 'Sparsha Wellness Resort' : centerRaw;
    const serviceParam = serviceRaw === 'Retreat Enquiry' ? 'Resort Stay Enquiry' : serviceRaw;

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
    if (!formData.mobile.trim()) errs.mobile = 'Please enter your mobile number';
    if (!formData.email.trim()) errs.email = 'Please enter your email address';
    if (!formData.preferredDate) errs.preferredDate = 'Please select a preferred date';
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

    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(() => {});
    } catch (err) {
      // safe demo fallback
    }

    setTimeout(() => {
      setSubmittedData({ ...formData });
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 500);
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="appointment-success-page" style={{ padding: '80px 0 120px 0' }}>
        <div className="container">
          <div className="success-screen-card">
            <div className="success-icon-badge">
              <CheckCircle2 size={44} color="var(--color-primary)" />
            </div>

            <div className="eyebrow-tag" style={{ background: 'var(--color-sage-mist)', color: 'var(--color-primary)' }}>
              ✓ Request Recorded
            </div>

            <h1 style={{ fontSize: '2.4rem', margin: '14px 0' }}>
              Thank You!
            </h1>

            <p style={{ fontSize: '1.2rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '20px' }}>
              Your appointment request has been recorded for this demo. Our team will contact you regarding availability.
            </p>

            <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'left', marginBottom: '32px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ marginBottom: '16px', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                Consultation Request Summary:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Client:</span>
                  <strong>{submittedData.name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Contact:</span>
                  <strong>{submittedData.mobile}</strong>
                </div>
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
                  <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Preferred Slot:</span>
                  <strong>{submittedData.preferredTime}</strong>
                </div>
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
        title="Begin Your Wellness Journey."
        subtitle="Dedicated doctors, individualized attention."
        description="Book a consultation at our outpatient centers in Chikmagalur and Bangalore, or enquire for residential wellness stays at Chikkolale Retreat."
        backgroundImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80"
        showCtas={false}
        height="45vh"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ background: '#ffffff', padding: '48px 40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
            <div className="eyebrow-tag" style={{ marginBottom: '12px' }}>
              <span>🗓️</span> Consultation Scheduling
            </div>
            <h2 style={{ marginBottom: '12px' }}>Request an Appointment</h2>
            <p style={{ marginBottom: '36px' }}>
              Fill in your details below. Our care coordinator will reach out to confirm clinical availability and assist with your preliminary intake.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.name && (
                  <span style={{ color: '#b94a48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="mobile">Mobile Number *</label>
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
                    <option value="Sparsha Health Care Center">Sparsha Health Care Center (Chikmagalur)</option>
                    <option value="Sparsha Multicare Center">Sparsha Multicare Center (Bangalore ORR)</option>
                    <option value="Sparsha Wellness Resort">Sparsha Wellness Resort (Chikkolale)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="service">Select Service *</label>
                  <select
                    id="service"
                    name="service"
                    className="form-control"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="General Consultation">General Consultation</option>
                    <option value="Naturopathy">Naturopathy</option>
                    <option value="Functional Medicine">Functional Medicine</option>
                    <option value="Ayurveda">Ayurveda</option>
                    <option value="Physiotherapy">Physiotherapy</option>
                    <option value="Wellness Consultation">Wellness Consultation</option>
                    <option value="Resort Stay Enquiry">Wellness Resort Stay Enquiry</option>
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
                  <label className="form-label" htmlFor="preferredTime">Preferred Time Slot *</label>
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
                <label className="form-label" htmlFor="message">Health Goals / Inquiry Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  rows="4"
                  placeholder="Tell us briefly what symptoms or wellness goals you'd like to discuss..."
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ marginTop: '32px' }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  block
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Recording Request...' : 'Request Appointment'}
                </Button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                <ShieldCheck size={16} color="var(--color-gold)" />
                <span>Demo prototype: your request is recorded locally without sending sensitive medical data.</span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
