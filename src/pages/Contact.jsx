import React, { useState } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { centers } from '../data/centers';
import { CONTACT_INFO, buildWhatsAppUrl } from '../data/contactInfo';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Instagram, Facebook, Youtube, ExternalLink, MessageCircle, Navigation, Star } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInquiry = {
      id: 'INQ-CNT-' + Math.floor(100000 + Math.random() * 900000),
      name: formData.name,
      email: formData.email,
      mobile: formData.phone || 'Not specified',
      center: 'Online / Contact Page',
      service: formData.subject || 'General Enquiry',
      preferredDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      preferredTime: 'Any Time',
      message: formData.message,
      status: 'Forwarded to WhatsApp',
      createdAt: new Date().toISOString()
    };

    // Save to Admin inquiry store
    try {
      const existingInqs = JSON.parse(localStorage.getItem('sparsha_saved_inquiries') || '[]');
      localStorage.setItem('sparsha_saved_inquiries', JSON.stringify([newInquiry, ...existingInqs]));
      fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry)
      }).catch(() => {});
    } catch (err) {}

    const msg = `SPARSHA HEALTHCARE - GENERAL ENQUIRY\n------------------------------------\nName: ${formData.name}\nPhone: ${formData.phone || 'Not specified'}\nEmail: ${formData.email}\nTopic: ${formData.subject}\n\nMessage:\n${formData.message}\n------------------------------------\nPlease get back to me with details. Thank you.`;
    const url = buildWhatsAppUrl(msg);
    setWhatsappUrl(url);
    try {
      window.open(url, '_blank');
    } catch (err) {}
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
                    {center.rating && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#fef3c7', color: '#92400e', padding: '3px 10px', borderRadius: '16px', fontSize: '0.78rem', fontWeight: 700, width: 'fit-content' }}>
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <span>★ {center.rating}</span>
                        <span>({center.reviewCount} Google reviews)</span>
                      </div>
                    )}
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
                    {center.directionsUrl && (
                      <div style={{ marginTop: '8px', paddingTop: '10px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <a
                          href={center.directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-sm"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', padding: '5px 12px' }}
                        >
                          <Navigation size={13} /> Get Directions
                        </a>
                        {center.website && (
                          <a
                            href={center.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', padding: '5px 12px' }}
                          >
                            <ExternalLink size={13} /> Official Website
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Split: Contact Form + Stylized Map Placeholder */}
          <div className="split-grid">
            {/* Contact Form */}
            <div className="contact-form-box" style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
              <div className="eyebrow-tag" style={{ marginBottom: '10px' }}>
                <MessageSquare size={14} /> Send a Message
              </div>
              <h3 style={{ marginBottom: '12px' }}>General Inquiries</h3>
              <p style={{ marginBottom: '28px' }}>
                Have a general question or feedback? Leave a note and our care desk will respond within 24 hours.
              </p>

              {submitted ? (
                <div style={{ padding: '32px 20px', textAlign: 'center', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                  <CheckCircle2 size={40} color="var(--color-primary)" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Enquiry Prepared for WhatsApp</h4>
                  <p style={{ fontSize: '0.95rem', marginBottom: '20px' }}>
                    Thank you, {formData.name}. Your message has been formatted to connect directly with our care team on WhatsApp.
                  </p>
                  {whatsappUrl && (
                    <div style={{ marginBottom: '20px' }}>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{
                          background: '#25D366',
                          borderColor: '#25D366',
                          color: '#ffffff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          maxWidth: '100%',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        <MessageCircle size={18} />
                        <span>Send on WhatsApp</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ marginTop: '8px' }}
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                    }}
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 700 }}>
                        <MapPin size={20} color="var(--color-gold)" />
                        <span>Sparsha Health Care (Hospital)</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', margin: '4px 0 0 0', color: 'var(--color-text-muted)' }}>
                        Indira Gandhi Rd, next to Hotel Vishnu Delicacy, Joythinagar, Chikkamagaluru
                      </p>
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '16px', fontSize: '0.78rem', fontWeight: 700 }}>
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                      <span>5.0</span>
                      <span>(40 Google reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Google Maps Live Embed */}
                <div style={{ position: 'relative', width: '100%', height: '360px', overflow: 'hidden', background: '#e5e7eb' }}>
                  <iframe
                    title="Sparsha Health Care Chikkamagaluru Google Map"
                    src="https://maps.google.com/maps?q=Sparsha+Health+Care,+Indira+Gandhi+Rd,+next+to+Hotel+Vishnu+Delicacy,+Joythinagar,+Chikkamagaluru,+Karnataka+577101&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    style={{ width: '100%', height: '100%', border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div style={{ padding: '16px 24px', background: 'var(--color-bg-alt)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Direct Hospital Desk:</div>
                    <a href="tel:08262355225" style={{ color: 'var(--color-leaf)', fontWeight: 700, textDecoration: 'none' }}>
                      📞 082623 55225
                    </a>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Sparsha+Health+Care+Indira+Gandhi+Rd+Joythinagar+Chikkamagaluru+Karnataka+577101"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                    >
                      <Navigation size={13} /> Directions
                    </a>
                    <a
                      href="https://sparsha-hospital.grexa.site/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                    >
                      <ExternalLink size={13} /> Website
                    </a>
                  </div>
                </div>

                <div style={{ padding: '16px 24px', background: '#ffffff', fontSize: '0.82rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)' }}>
                  <strong>Travel Note:</strong> Situated on Indira Gandhi Rd, next to Hotel Vishnu Delicacy in Joythinagar, Chikkamagaluru (577101). Chikkolale Wellness Resort is 12 km further into the hills.
                </div>

                {/* Official Social Media Channels */}
                <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', background: '#ffffff' }}>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.92rem', marginBottom: '12px' }}>
                    Connect on Official Channels
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href="https://www.youtube.com/@DrSarjasHealthtips"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: '#fef2f2',
                        borderRadius: 'var(--radius-sm)',
                        color: '#b91c1c',
                        textDecoration: 'none',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        border: '1px solid #fecaca'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Youtube size={20} color="#dc2626" />
                        <span>YouTube: @DrSarjasHealthtips</span>
                      </div>
                      <ExternalLink size={14} />
                    </a>

                    <a
                      href="https://www.instagram.com/sparsha_hospital/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: '#fdf2f8',
                        borderRadius: 'var(--radius-sm)',
                        color: '#be185d',
                        textDecoration: 'none',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        border: '1px solid #fbcfe8'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Instagram size={20} color="#db2777" />
                        <span>Instagram: @sparsha_hospital</span>
                      </div>
                      <ExternalLink size={14} />
                    </a>

                    <a
                      href="https://www.facebook.com/Sparshaintegrated/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: '#eff6ff',
                        borderRadius: 'var(--radius-sm)',
                        color: '#1d4ed8',
                        textDecoration: 'none',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        border: '1px solid #bfdbfe'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Facebook size={20} color="#2563eb" />
                        <span>Facebook: @Sparshaintegrated</span>
                      </div>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
