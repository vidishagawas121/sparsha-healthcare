import React from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import CenterCard from '../components/CenterCard';
import Button from '../components/Button';
import { centers } from '../data/centers';
import { Leaf, Award, HeartHandshake, ShieldCheck, ArrowRight, Eye, Compass } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <Hero
        title="About Sparsha."
        subtitle="Where ancient balance meets modern understanding."
        description="Sparsha Healthcare Group was founded to bridge the gap between traditional nature cures, classical Ayurveda, and the precision of modern functional medicine."
        backgroundImage="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=2000&q=80"
        showCtas={false}
        height="50vh"
      />

      {/* About Company Intro */}
      <section className="section">
        <div className="container">
          <div className="split-grid">
            <div>
              <div className="eyebrow-tag">
                <span>🌿</span> Our Genesis
              </div>
              <h2>Nurturing the Whole Human Being</h2>
              <p style={{ margin: '20px 0', fontSize: '1.15rem', lineHeight: '1.8' }}>
                Sparsha Healthcare Group brings together natural healing, modern functional healthcare and personalized wellness experiences under one integrated approach.
              </p>
              <p style={{ marginBottom: '20px' }}>
                Headquartered amidst the therapeutic foothills of Chikmagalur, Sparsha operates across four complementary verticals: clinical outpatient healthcare, residential wellness resorts, clean herbal product formulation, and urban multicare centers.
              </p>
              <p>
                We believe health is not merely the absence of disease, but a dynamic state of biological vitality, mental clarity, and harmony with nature's circadian rhythms.
              </p>
            </div>

            <div className="split-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=1200&q=80"
                alt="Herbal botanicals at Sparsha"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Vision */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow="Our Guiding North Star"
            title="Our Philosophy & Vision"
            subtitle="Built upon the foundational pillars of Nature, Science, and Expert Care."
          />

          <div className="cards-grid-3">
            {/* Philosophy Card 1 */}
            <div className="card">
              <div className="card-body">
                <div className="service-icon-wrap">
                  <Leaf size={28} />
                </div>
                <div className="card-subtitle">Pillar 01</div>
                <h3 className="card-title">Nature</h3>
                <p className="card-text">
                  Honoring the body’s innate biological capability to repair and restore when given natural nutrition, clean air, sunlight, and botanical synergy.
                </p>
              </div>
            </div>

            {/* Philosophy Card 2 */}
            <div className="card">
              <div className="card-body">
                <div className="service-icon-wrap">
                  <Compass size={28} />
                </div>
                <div className="card-subtitle">Pillar 02</div>
                <h3 className="card-title">Science</h3>
                <p className="card-text">
                  Grounding every recommendation in functional medicine insights, biochemical individuality, and evidence-informed movement rehabilitation.
                </p>
              </div>
            </div>

            {/* Philosophy Card 3 */}
            <div className="card">
              <div className="card-body">
                <div className="service-icon-wrap">
                  <Award size={28} />
                </div>
                <div className="card-subtitle">Pillar 03</div>
                <h3 className="card-title">Expert Care</h3>
                <p className="card-text">
                  Compassionate, attentive guidance by qualified doctors and therapists who listen to your unique life story and tailor solutions directly to you.
                </p>
              </div>
            </div>
          </div>

          {/* Vision Statement Banner */}
          <div
            style={{
              background: 'var(--color-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '48px 36px',
              marginTop: '56px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-light)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px' }}>
              <Eye size={18} /> Our Vision
            </div>
            <h3 style={{ color: '#ffffff', maxWidth: '820px', margin: '0 auto 20px auto', fontSize: '1.85rem' }}>
              "Making holistic wellness more accessible through integrated healthcare, personalized care and nature-based healing experiences."
            </h3>
            <p style={{ maxWidth: '680px', margin: '0 auto', color: 'rgba(250, 248, 244, 0.85)', fontSize: '1.1rem' }}>
              By unifying clinic care, residential wellness resorts, and home remedies, we empower individuals to take ownership of their health journey at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section founder-section">
        <div className="container">
          <div className="split-grid">
            <div className="founder-portrait-wrap">
              <img
                src="/images/dr_chandrashekar_sarja.png"
                alt="Dr. Chandrashekar Sarja"
              />
            </div>

            <div>
              <div className="eyebrow-tag">
                <span>👨‍⚕️</span> Leadership & Guidance
              </div>
              <h2>Dr. Chandrashekar Sarja</h2>
              <div style={{ fontSize: '1.15rem', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '20px' }}>
                Founder, Naturopath & Functional Medicine Specialist
              </div>

              <blockquote className="founder-quote">
                "Sparsha was built around a simple belief — true wellness comes from understanding the whole person, not simply treating symptoms."
              </blockquote>

              <p style={{ marginBottom: '20px' }}>
                With decades of integrative clinical observation, Dr. Chandrashekar Sarja established Sparsha to bring together traditional healing methods and contemporary functional evaluation.
              </p>
              <p style={{ marginBottom: '28px' }}>
                His approach ensures that patients do not merely receive temporary relief, but undergo sustained restorative shifts through personalized nutrition, herbal support, stress regulation, and therapeutic movement.
              </p>

              <div className="founder-pill-grid">
                <div className="founder-pill">
                  <ShieldCheck size={18} color="var(--color-gold)" />
                  <span>Evidence-Informed Naturopathy</span>
                </div>
                <div className="founder-pill">
                  <HeartHandshake size={18} color="var(--color-gold)" />
                  <span>Patient-Centered Journey</span>
                </div>
              </div>

              <Button to="/appointment" variant="primary" icon={ArrowRight}>
                Schedule a Consultation With Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Four Centers */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Our Presence"
            title="Our Centers Across Karnataka"
            subtitle="Explore our physical destinations in Chikmagalur, Chikkolale, and Bangalore."
          />

          <div className="cards-grid-2">
            {centers.map((center) => (
              <CenterCard key={center.id} center={center} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
