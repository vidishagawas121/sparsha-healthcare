import React from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { retreatPrograms, retreatFacilities } from '../data/retreat';
import { Home, Sparkles, Utensils, Sun, Compass, Activity, ArrowRight, CheckCircle2, Trees, Shield } from 'lucide-react';

const facilityIconMap = {
  Home,
  Sparkles,
  Utensils,
  Sun,
  Compass,
  Activity
};

export default function Retreat() {
  return (
    <div className="retreat-page">
      {/* Hero */}
      <Hero
        title="Sparsha Wellness Resort."
        subtitle="Chikkolale, Western Ghats • Where Healing Meets Nature"
        description="An exclusive residential wellness resort nestled amidst the misty coffee hills of Chikmagalur. Enjoy private sanctuary stays, doctor-guided Ayurvedic & Naturopathy therapies, 100% organic Satvic dining, and deep natural restoration."
        backgroundImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85"
        showCtas={true}
        height="70vh"
        primaryCtaText="Enquire About a Stay"
        primaryCtaLink="/appointment?service=Resort%20Stay%20Enquiry&center=Sparsha%20Wellness%20Resort"
        secondaryCtaText="Explore Resort Programs"
        secondaryCtaLink="#programs"
      />

      {/* Why the Resort? */}
      <section className="section">
        <div className="container">
          <div className="split-grid">
            <div>
              <div className="eyebrow-tag">
                <span>⛰️</span> The Chikkolale Sanctuary
              </div>
              <h2>Why Choose Our Western Ghats Wellness Resort?</h2>
              <p style={{ margin: '20px 0', fontSize: '1.15rem', lineHeight: '1.8' }}>
                Modern life constantly demands our cognitive and emotional energy. In the tranquil embrace of Chikkolale's rolling hills, time slows down to allow your biological rhythms to synchronize once again.
              </p>
              <p style={{ marginBottom: '24px' }}>
                Unlike a conventional commercial hotel, Sparsha Wellness Resort is doctor-governed. Your entire stay — from private hillside cottages and farm-to-table Satvic meals to warm medicated oil therapies and sunrise yoga — is curated by wellness doctors to relieve burnout, restore metabolic harmony, and rejuvenate your body.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Home size={20} color="var(--color-leaf)" />
                  <span style={{ fontWeight: 600 }}>Serene private stone cottages & forest-facing residential suites</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Shield size={20} color="var(--color-leaf)" />
                  <span style={{ fontWeight: 600 }}>Doctor-monitored, evidence-informed personalized therapies</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Utensils size={20} color="var(--color-leaf)" />
                  <span style={{ fontWeight: 600 }}>100% Satvic organic farm-to-table cuisine prepared fresh daily</span>
                </div>
              </div>

              <Button
                to="/appointment?service=Resort%20Stay%20Enquiry&center=Sparsha%20Wellness%20Resort"
                variant="primary"
                icon={ArrowRight}
              >
                Enquire About Your Stay
              </Button>
            </div>

            <div className="split-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                alt="Chikkolale Retreat Experience"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Programs */}
      <section id="programs" className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow="Residential Stay Packages"
            title="Our Wellness Resort Programs"
            subtitle="All-inclusive residential programs combining luxury resort accommodation, doctor consultations, Ayurvedic therapies, and organic Satvic dining."
          />

          <div className="cards-grid-3">
            {retreatPrograms.map((prog) => (
              <div key={prog.id} className="card">
                <div className="card-image-wrap">
                  <span className="card-badge gold">{prog.badge}</span>
                  <img src={prog.image} alt={prog.title} />
                </div>
                <div className="card-body">
                  <div className="card-subtitle">{prog.title}</div>
                  <h3 className="card-title">{prog.tagline}</h3>
                  <p className="card-text">{prog.shortDescription}</p>

                  <div style={{ margin: '16px 0', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '10px' }}>
                      Package Highlights:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {prog.highlights.map((h, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
                          <CheckCircle2 size={14} color="var(--color-leaf)" style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--color-sage)', fontStyle: 'italic', marginBottom: '20px' }}>
                    <strong>Ideal for:</strong> {prog.idealFor}
                  </p>

                  <div className="card-footer">
                    <Button
                      to={`/appointment?service=Resort%20Stay%20Enquiry&center=Sparsha%20Wellness%20Resort&program=${encodeURIComponent(prog.title)}`}
                      variant="primary"
                      block
                      icon={ArrowRight}
                    >
                      Enquire for {prog.title}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Resort Amenities"
            title="World-Class Resort & Healing Facilities"
            subtitle="Thoughtfully constructed using sustainable stone and cedar wood to harmonize with the Western Ghats landscape."
          />

          <div className="cards-grid-3">
            {retreatFacilities.map((fac, idx) => {
              const FacIcon = facilityIconMap[fac.iconName] || Sparkles;
              return (
                <div key={idx} className="card">
                  <div className="card-body">
                    <div className="service-icon-wrap">
                      <FacIcon size={26} />
                    </div>
                    <h3 className="card-title">{fac.title}</h3>
                    <p className="card-text">{fac.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking CTA Banner */}
      <section className="section" style={{ background: 'var(--color-primary)', color: '#ffffff', textAlign: 'center', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="eyebrow-tag" style={{ background: 'rgba(194, 155, 72, 0.25)', color: '#dfbe74' }}>
            <span>🌿</span> Begin Your Stay Experience
          </div>
          <h2 style={{ color: '#ffffff', marginBottom: '20px' }}>Ready to Experience Sparsha Wellness Resort?</h2>
          <p style={{ color: 'rgba(250, 248, 244, 0.85)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '36px' }}>
            Our residential resort maintains intimate guest accommodation to ensure undivided medical and therapeutic attention. Contact our resort concierge team to verify stay availability.
          </p>
          <Button
            to="/appointment?service=Resort%20Stay%20Enquiry&center=Sparsha%20Wellness%20Resort"
            variant="gold"
            size="lg"
            icon={ArrowRight}
          >
            Enquire About a Resort Stay
          </Button>
        </div>
      </section>
    </div>
  );
}
