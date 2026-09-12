import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { services, healthConditions } from '../data/services';
import { products } from '../data/products';
import { ArrowRight, CheckCircle2, Award, Users, HeartHandshake, Sparkles, MapPin } from 'lucide-react';

export default function Home() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

  return (
    <div className="home-page">
      {/* SECTION 1: HERO */}
      <Hero
        title="Heal Naturally."
        subtitle="Live Completely."
        description="Holistic wellness through nature, science and expert care. Discover personalized healing rooted in Naturopathy, functional medicine, Ayurveda, and tranquil Western Ghats retreat immersions."
        backgroundImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
        showCtas={true}
        showTrust={true}
      />

      {/* SECTION 2: INTRODUCTION */}
      <section className="section">
        <div className="container">
          <div className="split-grid">
            <div className="split-image-wrap">
              <img
                src="/images/ayurveda_shirodhara.jpg"
                alt="Authentic Ayurvedic Shirodhara and botanical wellness therapy at Sparsha Chikmagalur"
                loading="lazy"
              />
              <div className="split-accent-frame">
                <div className="split-accent-title">Authentic Ayurveda & Naturopathy</div>
                <div className="split-accent-desc">Classical Shirodhara, herbal oils & Western Ghats botanicals in Chikmagalur.</div>
              </div>
            </div>

            <div>
              <div className="eyebrow-tag">
                <span>🌿</span> Welcome to Sparsha
              </div>
              <h2>Integrated Wellness Rooted in Nature & Science</h2>
              <p style={{ margin: '20px 0', fontSize: '1.15rem', lineHeight: '1.8' }}>
                Sparsha Healthcare Group brings together natural healing, modern functional healthcare and personalized wellness experiences under one integrated approach.
              </p>
              <p style={{ marginBottom: '32px' }}>
                We bridge the wisdom of traditional therapeutic disciplines with rigorous functional diagnostics. Rather than addressing symptoms in isolation, we walk beside you on a complete journey to restore internal balance, physical vitality, and deep mental calm.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--color-leaf)" />
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Personalized Protocols</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--color-leaf)" />
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Non-Invasive Healing</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--color-leaf)" />
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Chikmagalur Wellness Resort</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--color-leaf)" />
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Pure Herbal Remedies</span>
                </div>
              </div>

              <Button to="/about" variant="primary" icon={ArrowRight}>
                Discover Sparsha
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FOUR SPARSHA EXPERIENCES */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow="Our Four Pillars"
            title="Four Sparsha Experiences"
            subtitle="From intensive outpatient care and serene residential wellness resorts to pure botanical remedies and urban multi-specialty care."
          />

          <div className="cards-grid-4">
            {/* CARD 1: Healthcare */}
            <div className="card">
              <div className="card-image-wrap">
                <span className="card-badge">Pillar 01</span>
                <img
                  src="/images/pillar_healthcare.jpg"
                  alt="Sparsha Health Care Center - Naturopathy & Ayurveda"
                />
              </div>
              <div className="card-body">
                <div className="card-subtitle">Healthcare</div>
                <h3 className="card-title">Sparsha Health Care Center</h3>
                <p className="card-text">
                  Naturopathy, functional medicine, Ayurveda and physiotherapy conveniently integrated in Chikmagalur.
                </p>
                <div className="card-footer">
                  <Button to="/care" variant="secondary" size="sm" block icon={ArrowRight}>
                    Explore Care
                  </Button>
                </div>
              </div>
            </div>

            {/* CARD 2: Wellness Resort */}
            <div className="card">
              <div className="card-image-wrap">
                <span className="card-badge gold">Pillar 02</span>
                <img
                  src="/images/pillar_retreat.jpg"
                  alt="Sparsha Wellness Resort - Ayurvedic Rejuvenation"
                />
              </div>
              <div className="card-body">
                <div className="card-subtitle">Wellness Resort</div>
                <h3 className="card-title">Sparsha Wellness Resort</h3>
                <p className="card-text">
                  Personalized residential healing and nature stay programs surrounded by the serene coffee hills of Chikmagalur.
                </p>
                <div className="card-footer">
                  <Button to="/retreat" variant="secondary" size="sm" block icon={ArrowRight}>
                    Explore Wellness Resort
                  </Button>
                </div>
              </div>
            </div>

            {/* CARD 3: Herbal Products */}
            <div className="card">
              <div className="card-image-wrap">
                <span className="card-badge">Pillar 03</span>
                <img
                  src="/images/pillar_herbal.jpg"
                  alt="Shustha Herbal Remedies - Ayurvedic Botanicals"
                />
              </div>
              <div className="card-body">
                <div className="card-subtitle">Herbal Products</div>
                <h3 className="card-title">Shustha Herbal Remedies</h3>
                <p className="card-text">
                  Herbal wellness products crafted thoughtfully from Western Ghats botanicals to complement a healthy lifestyle.
                </p>
                <div className="card-footer">
                  <Button to="/shop" variant="secondary" size="sm" block icon={ArrowRight}>
                    Shop Products
                  </Button>
                </div>
              </div>
            </div>

            {/* CARD 4: Multicare */}
            <div className="card">
              <div className="card-image-wrap">
                <span className="card-badge">Pillar 04</span>
                <img
                  src="/images/pillar_multicare.jpg"
                  alt="Sparsha Multicare Center"
                />
              </div>
              <div className="card-body">
                <div className="card-subtitle">Multicare</div>
                <h3 className="card-title">Sparsha Multicare Center</h3>
                <p className="card-text">
                  Integrated healthcare conveniently available in Bangalore Outer Ring Road for busy modern lives.
                </p>
                <div className="card-footer">
                  <Button to="/contact" variant="secondary" size="sm" block icon={ArrowRight}>
                    View Center
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR APPROACH */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Integrative Methodology"
            title="One Journey. Many Paths to Wellness."
            subtitle="At Sparsha, different healing disciplines work together to create a more complete and personalized wellness experience."
          />

          <div className="cards-grid-3" style={{ marginBottom: '32px' }}>
            {services.slice(0, 3).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onLearnMore={(s) => setSelectedService(s)}
              />
            ))}
          </div>

          <div className="cards-grid-2" style={{ maxWidth: '860px', margin: '0 auto' }}>
            {services.slice(3, 5).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onLearnMore={(s) => setSelectedService(s)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Button to="/care" variant="primary" icon={ArrowRight}>
              Explore All Care Disciplines
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 5: FOUNDER */}
      <section className="section founder-section">
        <div className="container">
          <div className="split-grid">
            <div className="founder-portrait-wrap">
              <img
                src="/images/dr_chandrashekar_sarja.png"
                alt="Dr. Chandrashekar Sarja"
                loading="lazy"
              />
            </div>

            <div>
              <div className="eyebrow-tag">
                <span>👨‍⚕️</span> Meet the Founder
              </div>
              <h2>Dr. Chandrashekar Sarja</h2>
              <div style={{ fontSize: '1.1rem', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '16px' }}>
                Naturopath & Functional Medicine Specialist
              </div>

              <blockquote className="founder-quote">
                "Sparsha was built around a simple belief — true wellness comes from understanding the whole person, not simply treating symptoms."
              </blockquote>

              <p style={{ marginBottom: '24px' }}>
                With a deep dedication to non-invasive therapeutics and personalized wellness blueprints, Dr. Chandrashekar Sarja conceptualized Sparsha as an oasis where modern functional diagnostics meet timeless healing wisdom.
              </p>

              <div className="founder-pill-grid">
                <div className="founder-pill">
                  <Award size={18} color="var(--color-gold)" />
                  <span>Expert-Led Care</span>
                </div>
                <div className="founder-pill">
                  <HeartHandshake size={18} color="var(--color-gold)" />
                  <span>Personalized Wellness</span>
                </div>
                <div className="founder-pill">
                  <Users size={18} color="var(--color-gold)" />
                  <span>Compassionate Guidance</span>
                </div>
              </div>

              <Button to="/about" variant="primary" icon={ArrowRight}>
                Learn More About Our Founder
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WELLNESS RETREAT */}
      <section
        className="section section-dark"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 34, 23, 0.9), rgba(20, 51, 36, 0.88)), url(https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2000&q=85)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container">
          <SectionTitle
            eyebrow="Sanctuary in the Western Ghats"
            title="Escape to Chikkolale"
            subtitle="Where healing meets nature."
            light={true}
          />

          <div style={{ maxWidth: '800px', margin: '0 auto 56px auto', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: 'rgba(250, 248, 244, 0.9)', lineHeight: '1.8' }}>
              Experience personalized wellness programs, therapeutic care, nourishing food and peaceful surroundings designed to help you slow down, restore and reconnect.
            </p>
          </div>

          <div className="cards-grid-3" style={{ marginBottom: '56px' }}>
            <div className="card" style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
              <div className="card-body">
                <div className="service-icon-wrap" style={{ background: 'rgba(194, 155, 72, 0.2)', color: '#dfbe74' }}>
                  <Sparkles size={28} />
                </div>
                <h3 className="card-title" style={{ color: '#ffffff' }}>Personalized Programs</h3>
                <p className="card-text" style={{ color: 'rgba(250, 248, 244, 0.8)' }}>
                  Wellness experiences designed around individual needs, doshic constitution, and personal restoration goals.
                </p>
              </div>
            </div>

            <div className="card" style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
              <div className="card-body">
                <div className="service-icon-wrap" style={{ background: 'rgba(194, 155, 72, 0.2)', color: '#dfbe74' }}>
                  <MapPin size={28} />
                </div>
                <h3 className="card-title" style={{ color: '#ffffff' }}>Nature & Relaxation</h3>
                <p className="card-text" style={{ color: 'rgba(250, 248, 244, 0.8)' }}>
                  A peaceful environment surrounded by greenery, crisp coffee plantations, and pure mountain air in Chikkolale.
                </p>
              </div>
            </div>

            <div className="card" style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
              <div className="card-body">
                <div className="service-icon-wrap" style={{ background: 'rgba(194, 155, 72, 0.2)', color: '#dfbe74' }}>
                  <HeartHandshake size={28} />
                </div>
                <h3 className="card-title" style={{ color: '#ffffff' }}>Complete Wellness</h3>
                <p className="card-text" style={{ color: 'rgba(250, 248, 244, 0.8)' }}>
                  Therapy, organic nutrition, conscious movement and mindful living guided daily by experienced doctors.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Button to="/retreat" variant="gold" size="lg">
              Explore Wellness Resort
            </Button>
            <Button to="/appointment?service=Resort%20Stay%20Enquiry&center=Sparsha%20Wellness%20Resort" variant="outline-white" size="lg">
              Book Your Stay Experience
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7: HEALTHCARE / CONDITIONS */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Targeted Wellness"
            title="What Are You Looking to Improve?"
            subtitle="Explore our integrated therapeutic pathways designed around common lifestyle and physiological health focus areas."
          />

          <div className="cards-grid-3">
            {healthConditions.map((cond) => (
              <div
                key={cond.id}
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedCondition(cond)}
              >
                <div className="card-body">
                  <div className="card-subtitle">{cond.subtitle}</div>
                  <h3 className="card-title">{cond.title}</h3>
                  <p className="card-text">{cond.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                    <span>Learn More</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Button to="/appointment" variant="primary">
              Discuss Your Goals With Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 8: SHOP PREVIEW */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow="Shustha Herbal Remedies"
            title="Bring Wellness Home"
            subtitle="Explore Shustha Herbal Remedies — clean botanical formulations crafted to complement your daily wellness routine."
          />

          <div className="cards-grid-3" style={{ marginBottom: '48px' }}>
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button to="/shop" variant="gold" size="lg" icon={ArrowRight}>
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <Modal
        isOpen={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title}
      >
        {selectedService && (
          <div>
            <div style={{ color: 'var(--color-gold)', fontWeight: 600, marginBottom: '12px' }}>
              {selectedService.tagline}
            </div>
            <p style={{ marginBottom: '20px', lineHeight: '1.7' }}>
              {selectedService.fullDescription}
            </p>

            <h4 style={{ marginBottom: '10px', color: 'var(--color-primary)' }}>Core Principles</h4>
            <ul style={{ marginBottom: '20px', paddingLeft: '20px', color: 'var(--color-text-muted)' }}>
              {selectedService.principles?.map((p, i) => (
                <li key={i} style={{ marginBottom: '6px' }}>{p}</li>
              ))}
            </ul>

            <h4 style={{ marginBottom: '10px', color: 'var(--color-primary)' }}>Therapies Included</h4>
            <ul style={{ marginBottom: '28px', paddingLeft: '20px', color: 'var(--color-text-muted)' }}>
              {selectedService.therapiesIncluded?.map((t, i) => (
                <li key={i} style={{ marginBottom: '6px' }}>{t}</li>
              ))}
            </ul>

            <Button
              to={`/appointment?service=${encodeURIComponent(selectedService.title)}`}
              variant="primary"
              block
              onClick={() => setSelectedService(null)}
            >
              Book {selectedService.title} Consultation
            </Button>
          </div>
        )}
      </Modal>

      {/* Condition Detail Modal */}
      <Modal
        isOpen={Boolean(selectedCondition)}
        onClose={() => setSelectedCondition(null)}
        title={selectedCondition?.title}
      >
        {selectedCondition && (
          <div>
            <div style={{ color: 'var(--color-gold)', fontWeight: 600, marginBottom: '14px' }}>
              {selectedCondition.subtitle}
            </div>
            <p style={{ marginBottom: '20px', lineHeight: '1.7' }}>
              {selectedCondition.description}
            </p>

            <h4 style={{ marginBottom: '10px', color: 'var(--color-primary)' }}>Recommended Care Modalities</h4>
            <ul style={{ marginBottom: '28px', paddingLeft: '20px', color: 'var(--color-text-muted)' }}>
              {selectedCondition.recommendedCare?.map((care, i) => (
                <li key={i} style={{ marginBottom: '6px' }}>{care}</li>
              ))}
            </ul>

            <Button
              to="/appointment"
              variant="primary"
              block
              onClick={() => setSelectedCondition(null)}
            >
              Schedule an Assessment for {selectedCondition.title}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
