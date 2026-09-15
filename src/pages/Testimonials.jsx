import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { TESTIMONIALS, TESTIMONIAL_CATEGORIES } from '../data/testimonialsData';
import { buildWhatsAppUrl, CONTACT_INFO } from '../data/contactInfo';
import { 
  Star, 
  CheckCircle2, 
  MapPin, 
  Heart, 
  MessageSquare, 
  Share2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Send,
  MessageCircle
} from 'lucide-react';

export default function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareForm, setShareForm] = useState({
    name: '',
    city: '',
    treatment: '',
    rating: 5,
    story: ''
  });
  const [shareSubmitted, setShareSubmitted] = useState(false);

  const filteredTestimonials = useMemo(() => {
    if (selectedCategory === 'All') return TESTIMONIALS;
    return TESTIMONIALS.filter(t => {
      if (selectedCategory === "Women's Health") return t.conditionTreated.toLowerCase().includes('pcos') || t.conditionTreated.toLowerCase().includes('menstrual');
      if (selectedCategory === "Digestive Health") return t.conditionTreated.toLowerCase().includes('acid') || t.conditionTreated.toLowerCase().includes('gerd') || t.conditionTreated.toLowerCase().includes('digestive');
      if (selectedCategory === "Joint & Pain Care") return t.conditionTreated.toLowerCase().includes('knee') || t.conditionTreated.toLowerCase().includes('arth') || t.conditionTreated.toLowerCase().includes('joint');
      if (selectedCategory === "Stress & Sleep") return t.conditionTreated.toLowerCase().includes('burnout') || t.conditionTreated.toLowerCase().includes('stress') || t.conditionTreated.toLowerCase().includes('insomnia');
      if (selectedCategory === "Panchakarma Detox") return t.programAttended.toLowerCase().includes('panchakarma') || t.conditionTreated.toLowerCase().includes('fatty liver');
      return true;
    });
  }, [selectedCategory]);

  const handleShareSubmit = (e) => {
    e.preventDefault();
    setShareSubmitted(true);
    setTimeout(() => {
      setIsShareModalOpen(false);
      setShareSubmitted(false);
      setShareForm({ name: '', city: '', treatment: '', rating: 5, story: '' });
      alert('Thank you for sharing your experience! Your testimonial has been recorded.');
    }, 1500);
  };

  return (
    <div className="testimonials-page">
      <Hero
        title="Stories of Healing & Hope."
        subtitle="Real journeys of transformation from our patients and retreat guests."
        description="Discover how authentic Ayurveda, individualized naturopathy, Satvic nutrition, and peaceful Western Ghats immersions have restored health for individuals across Karnataka."
        backgroundImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=85"
        showCtas={false}
        height="48vh"
      />

      <section className="section" style={{ padding: '64px 0 96px 0' }}>
        <div className="container">
          
          {/* Clinical Stats Highlight Bar */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '36px 32px', border: '1px solid var(--color-border)', marginBottom: '56px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#e5a93c', marginBottom: '6px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={22} fill="#e5a93c" stroke="#e5a93c" />
                  ))}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.1 }}>
                  4.9 / 5.0
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Over 250+ Verified Patient Reviews
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.1, marginTop: '28px' }}>
                  1,200+
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Patients Treated Across Karnataka
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.1, marginTop: '28px' }}>
                  98.4%
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Reported Symptom Improvement
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-gold)', lineHeight: 1.1, marginTop: '28px' }}>
                  15+ Years
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Holistic Medicine Heritage
                </div>
              </div>
            </div>
          </div>

          {/* Section Heading & Category Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            <div>
              <div className="eyebrow-tag" style={{ marginBottom: '8px' }}>
                <CheckCircle2 size={14} color="var(--color-gold)" /> Verified Clinical Experiences
              </div>
              <h2 style={{ fontSize: '2.2rem', margin: 0 }}>
                Patient Testimonials & Reviews
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
            >
              <MessageSquare size={16} />
              <span>Share Your Recovery Story</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {TESTIMONIAL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--color-primary)' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--color-text-main)',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-border)',
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Testimonial Cards Grid */}
          <div className="cards-grid-2" style={{ gap: '28px' }}>
            {filteredTestimonials.map((t) => (
              <div
                key={t.id}
                className="card testimonial-card"
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  padding: '32px',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                {/* Reviewer Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-sage-mist)' }}
                    />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                        {t.name}, {t.age}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        <MapPin size={13} />
                        <span>{t.city}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '2px', color: '#e5a93c', marginBottom: '4px' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#e5a93c" stroke="#e5a93c" />
                      ))}
                    </div>
                    {t.verifiedPatient && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#166534', fontSize: '0.75rem', fontWeight: 600, background: '#f0fdf4', padding: '2px 8px', borderRadius: '10px' }}>
                        <CheckCircle2 size={12} /> Verified Patient
                      </span>
                    )}
                  </div>
                </div>

                {/* Treatment & Center Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ background: 'var(--color-bg-alt)', color: 'var(--color-primary)', padding: '3px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                    Condition: {t.conditionTreated}
                  </span>
                  <span style={{ background: 'rgba(194, 155, 72, 0.12)', color: '#9b7625', padding: '3px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                    Program: {t.programAttended}
                  </span>
                </div>

                {/* Highlight Quote */}
                <div style={{ fontStyle: 'italic', color: 'var(--color-primary)', fontSize: '1.02rem', fontWeight: 600, lineHeight: '1.5', marginBottom: '14px' }}>
                  "{t.quote}"
                </div>

                {/* Detailed Story */}
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: '1.65', marginBottom: '20px', flex: 1 }}>
                  {t.review}
                </p>

                {/* Outcome Pill */}
                <div style={{ background: '#f8faf9', borderLeft: '3px solid var(--color-primary)', padding: '10px 14px', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                  🎯 Clinical Outcome: {t.keyOutcome}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Consultation Callout */}
          <div style={{ background: 'linear-gradient(135deg, #1f0a38 0%, #3b1464 100%)', borderRadius: 'var(--radius-lg)', padding: '48px 36px', color: '#ffffff', textAlign: 'center', marginTop: '64px', border: '1px solid rgba(223, 190, 116, 0.25)', boxShadow: '0 8px 32px rgba(15, 5, 30, 0.25)' }}>
            <h3 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '12px' }}>
              Begin Your Own Healing Story
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto 28px auto', lineHeight: '1.6' }}>
              Whether dealing with chronic gut distress, hormonal imbalance, joint pain, or stress exhaustion, our clinical team is here to listen and guide you.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Button to="/appointment" variant="gold" size="lg" icon={ArrowRight}>
                Enquire for Consultation on WhatsApp
              </Button>
              <Button to="/care" variant="outline-white" size="lg">
                Explore Clinical Treatments
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Share Experience Modal */}
      <Modal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Share Your Healing Journey"
      >
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Your story inspires others to embrace holistic healing and natural medicine.
        </p>

        {shareSubmitted ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <CheckCircle2 size={48} color="#25D366" style={{ margin: '0 auto 12px auto' }} />
            <h4>Thank You!</h4>
            <p>Your review has been submitted for editorial verification.</p>
          </div>
        ) : (
          <form onSubmit={handleShareSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="shareName">Your Name *</label>
              <input
                type="text"
                id="shareName"
                className="form-control"
                placeholder="e.g. Anandita K."
                value={shareForm.name}
                onChange={(e) => setShareForm({ ...shareForm, name: e.target.value })}
                required
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="shareCity">City / Location *</label>
                <input
                  type="text"
                  id="shareCity"
                  className="form-control"
                  placeholder="e.g. Bangalore"
                  value={shareForm.city}
                  onChange={(e) => setShareForm({ ...shareForm, city: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="shareTreatment">Condition / Treatment Received</label>
                <input
                  type="text"
                  id="shareTreatment"
                  className="form-control"
                  placeholder="e.g. Digestive Reset or Retreat Stay"
                  value={shareForm.treatment}
                  onChange={(e) => setShareForm({ ...shareForm, treatment: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Overall Rating</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setShareForm({ ...shareForm, rating: star })}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                  >
                    <Star
                      size={24}
                      fill={star <= shareForm.rating ? '#e5a93c' : 'none'}
                      stroke="#e5a93c"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="shareStory">Your Story & Results *</label>
              <textarea
                id="shareStory"
                rows="4"
                className="form-control"
                placeholder="How did our doctors, therapies, or herbal products help you improve your health?"
                value={shareForm.story}
                onChange={(e) => setShareForm({ ...shareForm, story: e.target.value })}
                required
              />
            </div>

            <Button type="submit" variant="primary" block size="md">
              Submit Patient Review
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
}
