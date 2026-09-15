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
import { ArrowRight, CheckCircle2, Award, Users, HeartHandshake, Sparkles, MapPin, Star, BookOpen, Utensils } from 'lucide-react';
import EventsSection from '../components/EventsSection';
import { TESTIMONIALS } from '../data/testimonialsData';

export default function Home() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

  return (
    <div className="home-page">
      {/* SECTION 1: HERO WITH LIVE NOTICE BOARD */}
      <Hero
        title="Heal Naturally."
        subtitle="Live Completely."
        description="Holistic wellness through nature, science and expert care. Discover personalized healing rooted in Naturopathy, functional medicine, Ayurveda, and tranquil Western Ghats retreat immersions."
        backgroundImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
        showCtas={true}
        showTrust={true}
        showNoticeBoard={true}
        showSocial={true}
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

              <div className="home-usp-grid">
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
                <span className="card-badge">Pillar 02</span>
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
          backgroundImage: `linear-gradient(rgba(24, 8, 48, 0.93), rgba(46, 16, 101, 0.90)), url(https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2000&q=85)`,
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
            <div className="card" style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(168, 85, 247, 0.25)', borderTop: '3px solid #a855f7', boxShadow: '0 8px 32px rgba(15, 5, 30, 0.4)' }}>
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

            <div className="card" style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(168, 85, 247, 0.25)', borderTop: '3px solid #a855f7', boxShadow: '0 8px 32px rgba(15, 5, 30, 0.4)' }}>
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

            <div className="card" style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(168, 85, 247, 0.25)', borderTop: '3px solid #a855f7', boxShadow: '0 8px 32px rgba(15, 5, 30, 0.4)' }}>
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
              Enquire on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS & RETREATS SECTION */}
      <EventsSection />

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

      {/* SECTION 8: DR. SARJA'S FORMULATIONS & SHOP PREVIEW */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow="Dr. Sarja’s Formulations & Herbal Apothecary"
            title="Bring Natural Healing Home"
            subtitle="Explore Dr. Sarja’s flagship clinical herbal powders and authentic Western Ghats remedies crafted for everyday vitality."
          />

          {/* Dr. Sarja's Featured Duo Spotlight Card Grid */}
          <div style={{ marginBottom: '56px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--color-primary)', color: 'var(--color-gold)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '24px' }}>
              <Sparkles size={16} /> Dr. Sarja's Flagship Formulations
            </div>

            <div className="cards-grid-2" style={{ gap: '28px' }}>
              {/* Product 1: Dia-Sparsh */}
              <div
                className="card"
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid #eab308',
                  boxShadow: '0 10px 30px rgba(234, 179, 8, 0.12)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden', background: '#fffbeb' }}>
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: '#b45309',
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      zIndex: 2
                    }}
                  >
                    100% HERBAL • LIMITED OFFER
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(255,255,255,0.92)',
                      color: '#15803d',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      zIndex: 2,
                      border: '1px solid #bbf7d0'
                    }}
                  >
                    FSSAI Certified
                  </span>
                  <Link to="/product/dr-sarja-dia-sparsh">
                    <img
                      src="/images/dia_sparsh.png"
                      alt="Dr. Sarja's Dia-Sparsh Herbal Powder"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px', transition: 'transform 0.3s ease' }}
                    />
                  </Link>
                </div>

                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Metabolic & Diabetes Care
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#e5a93c', fontSize: '0.88rem', fontWeight: 700 }}>
                      <Star size={15} fill="#e5a93c" stroke="#e5a93c" />
                      <span>5.0 (84)</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: '6px', color: 'var(--color-primary)' }}>
                    <Link to="/product/dr-sarja-dia-sparsh" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Dia-Sparsh Herbal Powder
                    </Link>
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-leaf)', fontWeight: 600, marginBottom: '12px' }}>
                    Formerly Jayla • Specially Designed for Healthy Disease-Free Life
                  </div>

                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: '1.6' }}>
                    100% pure herbal formulation recommended for managing blood sugar balance, healthy blood pressure, and metabolic weight care. Zero added sugars or preservatives.
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.86rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={15} color="var(--color-leaf)" />
                      <span>Recommended for Diabetes & Blood Sugar Care</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={15} color="var(--color-leaf)" />
                      <span>Supports Hypertension & Obesity Control</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={15} color="var(--color-leaf)" />
                      <span>Gurmar, Jamun Seed, Karela & Vijaysar extracts</span>
                    </li>
                  </ul>

                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Net Wt. 200g Eco-Canister</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>₹699</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link
                        to="/product/dr-sarja-dia-sparsh"
                        className="btn btn-outline btn-sm"
                      >
                        Details
                      </Link>
                      <a
                        href="https://wa.me/919986846635?text=Hello%20Dr.%20Sarja%27s%20Care%20Desk!%20I%20would%20like%20to%20order%20Dia-Sparsh%20Herbal%20Powder%20(Rs.%20699)."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        Order via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 2: LimCoCool */}
              <div
                className="card"
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid #84cc16',
                  boxShadow: '0 10px 30px rgba(132, 204, 22, 0.12)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden', background: '#f7fee7' }}>
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: '#4d7c0f',
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      zIndex: 2
                    }}
                  >
                    NEW PRODUCT LAUNCH
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(255,255,255,0.92)',
                      color: '#15803d',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      zIndex: 2,
                      border: '1px solid #bbf7d0'
                    }}
                  >
                    FSSAI Certified
                  </span>
                  <Link to="/product/dr-sarja-limcocool">
                    <img
                      src="/images/limcocool.jpg"
                      alt="Dr. Sarja's LimCoCool Pre-mix Juice Powder"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px', transition: 'transform 0.3s ease' }}
                    />
                  </Link>
                </div>

                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Tangy Masala Wellness Drink
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#e5a93c', fontSize: '0.88rem', fontWeight: 700 }}>
                      <Star size={15} fill="#e5a93c" stroke="#e5a93c" />
                      <span>4.9 (56)</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: '6px', color: 'var(--color-primary)' }}>
                    <Link to="/product/dr-sarja-limcocool" style={{ color: 'inherit', textDecoration: 'none' }}>
                      LimCoCool Pre-mix Juice Powder
                    </Link>
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-leaf)', fontWeight: 600, marginBottom: '12px' }}>
                    Refresh & Recharge Your Wellness • Instant Masala Drink
                  </div>

                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: '1.6' }}>
                    Your daily dose of natural zest and comfort. A refreshing instant pre-mix juice powder combining zesty lemon Vitamin C boost, pure coconut hydration, and a digestive masala blend.
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.86rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={15} color="var(--color-leaf)" />
                      <span>Vitamin C Boost with Zesty Lemon</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={15} color="var(--color-leaf)" />
                      <span>Natural Electrolyte Hydration from Coconut</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={15} color="var(--color-leaf)" />
                      <span>Ginger, Black Pepper, Rock Salt & Cumin Masala</span>
                    </li>
                  </ul>

                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Net Wt. 200g Jar</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>₹349</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link
                        to="/product/dr-sarja-limcocool"
                        className="btn btn-outline btn-sm"
                      >
                        Details
                      </Link>
                      <a
                        href="https://wa.me/919986846635?text=Hello%20Dr.%20Sarja%27s%20Care%20Desk!%20I%20would%20like%20to%20order%20LimCoCool%20Pre-mix%20Juice%20Powder%20(Rs.%20349)."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        Order via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More Botanical Remedies Grid */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '36px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '24px' }}>
              More Classical Shustha Herbal Formulations
            </h3>
            <div className="cards-grid-3" style={{ marginBottom: '48px' }}>
              {products.filter(p => !p.id.startsWith('dr-sarja-')).slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button to="/shop" variant="gold" size="lg" icon={ArrowRight}>
              View All Apothecary Products ({products.length})
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 9: PATIENT TESTIMONIALS SPOTLIGHT */}
      <section className="section" style={{ background: '#ffffff', padding: '96px 0' }}>
        <div className="container">
          <SectionTitle
            eyebrow="Patient Stories & Recovery"
            title="Real Experiences, Natural Healing"
            subtitle="Read how patients across Karnataka resolved hormonal imbalances, digestive issues, and joint pain through our integrative clinical care."
          />

          <div className="cards-grid-3" style={{ marginBottom: '48px' }}>
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="card"
                style={{
                  background: 'var(--color-bg-alt)',
                  borderRadius: 'var(--radius-md)',
                  padding: '28px',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-primary)' }}>{t.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t.city}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '2px', color: '#e5a93c' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#e5a93c" stroke="#e5a93c" />
                    ))}
                  </div>
                </div>

                <div style={{ fontStyle: 'italic', fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '12px' }}>
                  "{t.quote}"
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: '1.6', marginBottom: '16px', flex: 1 }}>
                  {t.review.length > 140 ? t.review.substring(0, 140) + '...' : t.review}
                </p>

                <div style={{ fontSize: '0.78rem', color: '#166534', background: '#f0fdf4', padding: '6px 10px', borderRadius: '6px', fontWeight: 600 }}>
                  ✓ {t.conditionTreated}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button to="/testimonials" variant="primary" size="lg" icon={ArrowRight}>
              Read All Patient Reviews (4.9 ★)
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 10: ARTICLES & DIET CHARTS RESOURCES SPOTLIGHT */}
      <section className="section" style={{ background: 'var(--color-bg-alt)', padding: '96px 0' }}>
        <div className="container">
          <SectionTitle
            eyebrow="Knowledge & Nutritional Guides"
            title="Evidence-Backed Healing Wisdom"
            subtitle="Access clinical diet charts, menstrual health guides, and Ayurvedic lifestyle protocols curated by our physicians."
          />

          <div className="cards-grid-2" style={{ gap: '32px' }}>
            {/* Articles Highlight Card */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '40px 32px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-sage-mist)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '18px' }}>
                  <BookOpen size={24} />
                </div>
                <div style={{ color: 'var(--color-gold)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  Clinical Articles
                </div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '12px', color: 'var(--color-primary)' }}>
                  Menstrual Health, Gut Care & Botanical Science
                </h3>
                <p style={{ color: 'var(--color-text-main)', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '24px' }}>
                  In-depth clinical protocols addressing dysmenorrhea, PMS, IBS, Panchakarma detoxification, and adrenal cortisol fatigue with holistic solutions.
                </p>
              </div>

              <Link
                to="/articles"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start' }}
              >
                <span>Browse Clinical Articles</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Diet Charts Highlight Card */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '40px 32px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(194, 155, 72, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', marginBottom: '18px' }}>
                  <Utensils size={24} />
                </div>
                <div style={{ color: 'var(--color-gold)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  Nutritional Prescriptions
                </div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '12px', color: 'var(--color-primary)' }}>
                  Therapeutic Diet Charts & Meal Routines
                </h3>
                <p style={{ color: 'var(--color-text-main)', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '24px' }}>
                  Structured hour-by-hour Satvic meal plans for hormonal balance, digestive rekindling, joint ease, healthy weight detox, and calming deep sleep.
                </p>
              </div>

              <Link
                to="/diet-charts"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start', borderRadius: 'var(--radius-full)' }}
              >
                <span>View Diet Charts (Printable)</span>
                <ArrowRight size={16} />
              </Link>
            </div>
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
