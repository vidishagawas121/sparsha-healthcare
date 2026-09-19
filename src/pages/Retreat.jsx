import React, { useState } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { retreatPrograms, retreatGallery, retreatFacilities } from '../data/retreat';
import { 
  Home, Sparkles, Utensils, Sun, Compass, Activity, ArrowRight, 
  CheckCircle2, Trees, Shield, Maximize2, ChevronLeft, ChevronRight, 
  MapPin, Camera, Info, PhoneCall
} from 'lucide-react';

const facilityIconMap = {
  Home,
  Sparkles,
  Utensils,
  Sun,
  Compass,
  Activity
};

export default function Retreat() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const categories = ['All', 'Campus & Entrance', 'Therapy & Healing Suites', 'Pavilions & Sports Arena', 'Accommodations & Walkways', 'Nature & Scenery'];

  const filteredPhotos = activeCategory === 'All'
    ? retreatGallery
    : retreatGallery.filter(item => item.category === activeCategory);

  const openLightbox = (indexInFiltered) => {
    const photo = filteredPhotos[indexInFiltered];
    const fullIndex = retreatGallery.findIndex(item => item.id === photo.id);
    setSelectedPhotoIndex(fullIndex);
  };

  const handleNextPhoto = (e) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % retreatGallery.length);
    }
  };

  const handlePrevPhoto = (e) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + retreatGallery.length) % retreatGallery.length);
    }
  };

  const currentPhoto = selectedPhotoIndex !== null ? retreatGallery[selectedPhotoIndex] : null;

  return (
    <div className="retreat-page">
      {/* Hero */}
      <Hero
        title="Sparsha Wellness Retreat."
        subtitle="@ Pepper Peak Home Stay • Chikkolale, Chikmagalur"
        description="An exclusive residential sanctuary nestled amidst the coffee-clad hills and pristine air of the Western Ghats. Experience bespoke doctor-guided Ayurvedic therapies, tranquil nature stays, Sattvic organic dining, and complete nervous system restoration."
        backgroundImage="/images/retreat_nature_view.jpg"
        showCtas={true}
        height="75vh"
        primaryCtaText="Enquire About a Stay"
        primaryCtaLink="/appointment?service=Resort%20Stay%20Enquiry&center=Sparsha%20Wellness%20Retreat"
        secondaryCtaText="Explore Photo Gallery"
        secondaryCtaLink="#gallery"
      />

      {/* Why the Retreat? */}
      <section className="section">
        <div className="container">
          <div className="split-grid">
            <div>
              <div className="eyebrow-tag">
                <span>⛰️</span> The Chikkolale Sanctuary
              </div>
              <h2>Why Choose Sparsha Wellness Retreat at Pepper Peak?</h2>
              <p style={{ margin: '20px 0', fontSize: '1.15rem', lineHeight: '1.8' }}>
                Surrounded by sprawling coffee groves and mist-kissed mountain ridges in Chikkolale, time slows down to allow your biological rhythms to harmonize with nature.
              </p>
              <p style={{ marginBottom: '24px' }}>
                Unlike a conventional commercial hotel, Sparsha Wellness Retreat is doctor-governed. In partnership with Pepper Peak Home Stay, your entire experience — from peaceful hillside living suites and 100% Sattvic farm meals to individualized Ayurvedic Panchakarma, herbal hydrotherapy, and silent forest walks — is personalized for deep physical, metabolic, and mental rejuvenation.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Home size={20} color="var(--color-leaf)" />
                  <span style={{ fontWeight: 600 }}>Peaceful Pepper Peak homestay suites & shaded nature verandas</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Shield size={20} color="var(--color-leaf)" />
                  <span style={{ fontWeight: 600 }}>Doctor-supervised, authentic Ayurvedic & Naturopathy protocols</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Utensils size={20} color="var(--color-leaf)" />
                  <span style={{ fontWeight: 600 }}>100% Satvic organic farm cuisine freshly prepared every day</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Button
                  to="/appointment?service=Resort%20Stay%20Enquiry&center=Sparsha%20Wellness%20Retreat"
                  variant="primary"
                  icon={ArrowRight}
                >
                  Enquire About Your Stay
                </Button>
                <a
                  href="#gallery"
                  className="btn btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Camera size={18} /> View Retreat Photos
                </a>
              </div>
            </div>

            <div className="split-image-wrap">
              <img
                src="/images/retreat_corridor_walkway.jpg"
                alt="Sparsha Wellness Retreat Corridor at Pepper Peak Home Stay"
              />
              <div className="split-accent-frame">
                <div className="split-accent-title">Pepper Peak Living</div>
                <div className="split-accent-desc">Traditional wooden veranda suites & tranquil garden breezeways in Chikmagalur.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY SECTION */}
      <section id="gallery" className="section section-alt" style={{ position: 'relative' }}>
        <div className="container">
          <SectionTitle
            eyebrow="Sanctuary Visual Tour"
            title="Glimpses of Sparsha Wellness Retreat"
            subtitle="Explore our authentic retreat campus at Pepper Peak Home Stay, nestled amidst the tranquil coffee hills of Chikkolale, Chikmagalur."
          />

          {/* Gallery Category Filter Tabs */}
          <div className="retreat-gallery-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`retreat-gallery-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Cards Grid */}
          <div className="retreat-gallery-grid">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="retreat-gallery-card"
                onClick={() => openLightbox(index)}
              >
                <div className="retreat-gallery-img-wrap">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    loading="lazy"
                  />
                  <div className="retreat-gallery-overlay">
                    <span className="retreat-zoom-badge">
                      <Maximize2 size={16} /> Click to Expand
                    </span>
                  </div>
                  <span className="retreat-category-tag">{photo.category}</span>
                </div>
                <div className="retreat-gallery-body">
                  <h3 className="retreat-gallery-title">{photo.title}</h3>
                  <div className="retreat-gallery-sub">{photo.subtitle}</div>
                  <p className="retreat-gallery-desc">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sanctuary Feature Callout Banner */}
          <div className="retreat-feature-banner">
            <div className="retreat-feature-banner-left">
              <div className="retreat-banner-badge">
                <MapPin size={16} color="var(--color-gold-light)" />
                <span>Chikkolale, Chikmagalur</span>
              </div>
              <h3 style={{ color: '#ffffff', margin: '8px 0 10px', fontSize: '1.45rem' }}>
                Experience Rejuvenation at Pepper Peak
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.95rem', margin: 0, maxWidth: '640px', lineHeight: '1.6' }}>
                Surrounded by towering native trees, shaded walkways, and pure organic mountain air, our retreat offers intimate guest accommodations for personalized healing and quiet relaxation.
              </p>
            </div>
            <div className="retreat-feature-banner-right">
              <Button
                to="/appointment?service=Resort%20Stay%20Enquiry&center=Sparsha%20Wellness%20Retreat"
                variant="gold"
                icon={ArrowRight}
              >
                Plan Your Stay
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Programs */}
      <section id="programs" className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Residential Stay Packages"
            title="Our Wellness Retreat Programs"
            subtitle="All-inclusive residential programs combining peaceful accommodation, doctor consultations, personalized Ayurvedic therapies, and organic Satvic dining."
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
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', padding: 0 }}>
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
                      to={`/appointment?service=Resort%20Stay%20Enquiry&center=Sparsha%20Wellness%20Retreat&program=${encodeURIComponent(prog.title)}`}
                      variant="primary"
                      block
                      icon={ArrowRight}
                    >
                      Enquire for Program
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            eyebrow="Retreat Amenities"
            title="World-Class Retreat & Healing Facilities"
            subtitle="Thoughtfully designed to harmonize with the Western Ghats coffee landscape, blending peaceful rustic charm with expert medical care."
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
      <section className="section" style={{ background: 'linear-gradient(135deg, #1f0a38 0%, #3b1464 100%)', color: '#ffffff', textAlign: 'center', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="eyebrow-tag" style={{ background: 'rgba(194, 155, 72, 0.25)', color: '#dfbe74' }}>
            <span>🌿</span> Begin Your Stay Experience
          </div>
          <h2 style={{ color: '#ffffff', marginBottom: '20px' }}>Ready to Experience Sparsha Wellness Retreat?</h2>
          <p style={{ color: 'rgba(250, 248, 244, 0.88)', fontSize: '1.18rem', lineHeight: '1.8', marginBottom: '36px' }}>
            Our residential retreat at Pepper Peak maintains intimate guest capacity to ensure undivided medical and therapeutic attention. Contact our retreat concierge team to check availability and reserve your personalized healing immersion.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <Button
              to="/appointment?service=Resort%20Stay%20Enquiry&center=Sparsha%20Wellness%20Retreat"
              variant="gold"
              size="lg"
              icon={ArrowRight}
            >
              Enquire About a Retreat Stay
            </Button>
            <a
              href="https://wa.me/919986846635?text=Hello%20Sparsha%20Healthcare,%20I%20would%20like%20to%20enquire%20about%20staying%20at%20Sparsha%20Wellness%20Retreat%20@%20Pepper%20Peak."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp-action"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontWeight: 700 }}
            >
              <PhoneCall size={18} /> WhatsApp Concierge
            </a>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedPhotoIndex !== null && currentPhoto && (
        <div className="retreat-lightbox-backdrop" onClick={() => setSelectedPhotoIndex(null)}>
          <div className="retreat-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="retreat-lightbox-close"
              onClick={() => setSelectedPhotoIndex(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>

            {/* Navigation Arrows */}
            <button
              className="retreat-lightbox-nav prev"
              onClick={handlePrevPhoto}
              aria-label="Previous photo"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="retreat-lightbox-nav next"
              onClick={handleNextPhoto}
              aria-label="Next photo"
            >
              <ChevronRight size={28} />
            </button>

            {/* Lightbox Content */}
            <div className="retreat-lightbox-content">
              <div className="retreat-lightbox-img-pane">
                <img
                  src={currentPhoto.image}
                  alt={currentPhoto.title}
                />
              </div>
              <div className="retreat-lightbox-info-pane">
                <div className="retreat-lightbox-meta-top">
                  <span className="retreat-category-tag" style={{ position: 'static' }}>
                    {currentPhoto.category}
                  </span>
                  <span className="retreat-lightbox-counter">
                    {selectedPhotoIndex + 1} / {retreatGallery.length}
                  </span>
                </div>
                <h3 className="retreat-lightbox-title">{currentPhoto.title}</h3>
                <div className="retreat-lightbox-subtitle">{currentPhoto.subtitle}</div>
                <p className="retreat-lightbox-description">{currentPhoto.description}</p>

                <div className="retreat-lightbox-footer">
                  <Button
                    to={`/appointment?service=Resort%20Stay%20Enquiry&center=Sparsha%20Wellness%20Retreat&source=${encodeURIComponent(currentPhoto.title)}`}
                    variant="primary"
                    block
                    icon={ArrowRight}
                  >
                    Enquire for Retreat Stay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
