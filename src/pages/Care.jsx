import React, { useState } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { services, healthConditions } from '../data/services';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function Care() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);

  return (
    <div className="care-page">
      {/* Hero */}
      <Hero
        title="Integrated Care."
        subtitle="Bridging ancient healing with functional science."
        description="Our clinical care integrates Naturopathy, functional medicine, classical Ayurveda, physiotherapy, and restorative nutrition to address root causes."
        backgroundImage="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80"
        showCtas={true}
        height="55vh"
        primaryCtaText="Book a Consultation"
        primaryCtaLink="/appointment"
        secondaryCtaText="Explore Modalities"
        secondaryCtaLink="#disciplines"
      />

      {/* Services Grid */}
      <section id="disciplines" className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Clinical Disciplines"
            title="Our Care Modalities"
            subtitle="Explore each clinical discipline practiced by our multi-disciplinary medical team."
          />

          <div className="cards-grid-3" style={{ marginBottom: '36px' }}>
            {services.slice(0, 3).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onLearnMore={(s) => setSelectedService(s)}
              />
            ))}
          </div>

          <div className="cards-grid-2" style={{ maxWidth: '860px', margin: '0 auto 64px auto' }}>
            {services.slice(3, 5).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onLearnMore={(s) => setSelectedService(s)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Health Conditions Section */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow="Health Pathways"
            title="Conditions We Support"
            subtitle="Select a health area below to explore how our integrated modalities collaborate to support your recovery."
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
                    <span>View Care Pathway</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Button to="/appointment" variant="primary" size="lg">
              Book a Consultation Assessment
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
            <div style={{ color: 'var(--color-gold)', fontWeight: 600, marginBottom: '14px' }}>
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
              to={`/appointment?service=General%20Consultation`}
              variant="primary"
              block
              onClick={() => setSelectedCondition(null)}
            >
              Consult On {selectedCondition.title}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
