import React, { useState } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { centers } from '../data/centers';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <Hero
        title="We'd Love to Hear From You."
        subtitle="Connect with our doctors, retreat concierges, and herbalists."
        description="Whether you have questions regarding customized healing programs in Chikmagalur, outpatient appointments in Bangalore, or our herbal dispensary, our team is at your service."
        backgroundImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80"
        showCtas={false}
        height="45vh"
      />

      {/* Centers Contact Information Grid */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Our Regional Presence"
            title="Sparsha Centers Across Karnataka"
            subtitle="Visit our dedicated healthcare clinics, Western Ghats retreat sanctuary, and herbal formulation centers."
          />

          <div className="cards-grid-2" style={{ marginBottom: '80px' }}>
            {centers.map((center) => (
              <div key={center.id} className="card">
                <div className="card-body">
                  <div style={{ display: 'inline-block', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                    {center.category}
                  </div>
                  <h3 className="card-title">{center.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-sage)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '16px' }}>
                    <MapPin size={16} />
                    <span>{center.location}</span>
                  </div>

                  <p className="card-text">{center.description}</p>

                  <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <MapPin size={16} color="var(--color-primary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{center.address}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Phone size={16} color="var(--color-primary)" />
                      <span>{center.phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Mail size={16} color="var(--color-primary)" />
                      <span>{center.email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Clock size={16} color="var(--color-primary)" />
                      <span>{center.timings}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Split: Contact Form + Stylized Map Placeholder */}
          <div className="split-grid">
            {/* Contact Form */}
            <div style={{ background: '#ffffff', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
              <div className="eyebrow-tag" style={{ marginBottom: '10px' }}>
                <MessageSquare size={14} /> Send a Message
              </div>
              <h3 style={{ marginBottom: '12px' }}>General Inquiries</h3>
              <p style={{ marginBottom: '28px' }}>
                Have a general question or feedback? Leave a note and our care desk will respond within 24 hours.
              </p>

              {submitted ? (
                <div style={{ padding: '32px', textAlign: 'center', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                  <CheckCircle2 size={40} color="var(--color-primary)" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Message Received</h4>
                  <p style={{ fontSize: '0.95rem' }}>
                    Thank you, {formData.name}. Your inquiry has been noted for this demo.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ marginTop: '16px' }}
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Your Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      className="form-control"
                      placeholder="e.g. Ananya Rao"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">Email Address *</label>
                      <input
                        type="email"
                        id="contact-email"
                        className="form-control"
                        placeholder="ananya@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-phone">Phone Number</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        className="form-control"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-subject">Topic of Interest</label>
                    <select
                      id="contact-subject"
                      className="form-control"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Chikkolale Wellness Resort Stay">Chikkolale Wellness Resort Stay</option>
                      <option value="Clinical Care Consultation">Clinical Care Consultation</option>
                      <option value="Shustha Herbal Products">Shustha Herbal Products</option>
                      <option value="Corporate Wellness & Tie-ups">Corporate Wellness & Tie-ups</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      className="form-control"
                      rows="4"
                      placeholder="How can we assist your wellness journey today?"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" variant="primary" block size="md" icon={Send}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Stylized Google Maps Placeholder Frame */}
            <div>
              <div
                style={{
                  background: 'var(--color-bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 700 }}>
                    <MapPin size={20} color="var(--color-gold)" />
                    <span>Regional Map & Directions</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                    Chikmagalur, Chikkolale & Bangalore Locations
                  </p>
                </div>

                {/* Stylized Simulated Map Canvas */}
                <div
                  style={{
                    position: 'relative',
                    flex: 1,
                    minHeight: '360px',
                    background: 'linear-gradient(135deg, #e5efe9 0%, #d5e5dc 50%, #cadcd2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px'
                  }}
                >
                  {/* Decorative Map Contour Lines & Location Pins */}
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(8px)',
                      padding: '24px',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      maxWidth: '340px',
                      textAlign: 'center',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-primary)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                      <MapPin size={24} />
                    </div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '6px' }}>
                      Interactive Map Placeholder
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                      Easily embed Google Maps iframe or Mapbox API with actual coordinates for Chikmagalur and Bangalore facilities.
                    </p>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-gold)' }}>
                      📍 13.3161° N, 75.7720° E (Chikmagalur)
                    </div>
                  </div>
                </div>

                <div style={{ padding: '20px 24px', background: 'var(--color-bg-alt)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <strong>Travel Note:</strong> Chikkolale Retreat is situated 12 km from Chikmagalur town. Private transfers can be arranged from Bangalore International Airport (BLR) or Mangalore Airport (IXE).
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
