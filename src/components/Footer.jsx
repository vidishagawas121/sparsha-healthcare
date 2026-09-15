import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, Youtube, Linkedin, ArrowUp } from 'lucide-react';
import Modal from './Modal';

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '16px' }}>
              <img
                src="/images/sparsha_logo.png"
                alt="Sparsha Healthcare Group Logo"
                style={{
                  height: '48px',
                  width: '48px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  background: '#ffffff',
                  padding: '3px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}
              />
              <span className="footer-brand-title">SPARSHA</span>
            </div>
            <p className="footer-brand-tagline">
              Holistic Wellness Through Nature, Science & Expert Care
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '24px' }}>
              Integrating Naturopathy, functional diagnostics, classical Ayurveda, and restorative retreat experiences to nourish the whole person.
            </p>
            <div className="footer-social-row">
              <a
                href="https://www.instagram.com/sparsha_hospital/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Instagram (@sparsha_hospital)"
                title="Follow Sparsha on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/Sparshaintegrated/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Facebook (@Sparshaintegrated)"
                title="Follow Sparsha on Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.youtube.com/@DrSarjasHealthtips"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="YouTube (@DrSarjasHealthtips)"
                title="Watch Dr. Sarja's Health Tips on YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-column-title">Explore & Learn</h4>
            <ul className="footer-links-list">
              <li><Link to="/articles" className="footer-link">Clinical Articles</Link></li>
              <li><Link to="/diet-charts" className="footer-link">Therapeutic Diet Charts</Link></li>
              <li><Link to="/testimonials" className="footer-link">Patient Reviews (4.9 ★)</Link></li>
              <li><Link to="/care" className="footer-link">Care & Modalities</Link></li>
              <li><Link to="/retreat" className="footer-link">Wellness Resort</Link></li>
              <li><Link to="/shop" className="footer-link">Herbal Shop</Link></li>
            </ul>
          </div>

          {/* Centers */}
          <div>
            <h4 className="footer-column-title">Our Centers</h4>
            <ul className="footer-links-list">
              <li><Link to="/contact" className="footer-link">Sparsha Health Care Center</Link></li>
              <li><Link to="/retreat" className="footer-link">Sparsha Wellness Resort</Link></li>
              <li><Link to="/contact" className="footer-link">Sparsha Multicare Center</Link></li>
              <li><Link to="/shop" className="footer-link">Shustha Herbal Remedies</Link></li>
            </ul>
          </div>

          {/* Support & Philosophy */}
          <div>
            <h4 className="footer-column-title">Client Support</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  className="footer-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  onClick={() => setActiveModal('faq')}
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  onClick={() => setActiveModal('privacy')}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  onClick={() => setActiveModal('terms')}
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <Link to="/appointment" className="footer-link">
                  Consultation Enquiry
                </Link>
              </li>
              <li>
                <Link to="/admin" className="footer-link" style={{ color: '#dfbe74' }}>
                  Staff & Admin Portal →
                </Link>
              </li>
            </ul>

            <div style={{ marginTop: '28px' }}>
              <button
                onClick={scrollToTop}
                className="btn btn-outline-white btn-sm"
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <ArrowUp size={16} /> Back to Top
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Sparsha Healthcare Group. All Rights Reserved. Demo Presentation Prototype.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(250, 248, 244, 0.5)' }}>
            Western Ghats • Chikmagalur • Chikkolale • Bangalore
          </p>
        </div>
      </div>

      {/* Support Modals */}
      <Modal
        isOpen={activeModal === 'faq'}
        onClose={() => setActiveModal(null)}
        title="Frequently Asked Questions"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>How do I schedule an in-person consultation?</h4>
            <p>You can submit an enquiry request through our Appointment page or visit any of our regional centers in Chikmagalur and Bangalore.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>What should I pack for the Chikkolale Retreat?</h4>
            <p>Comfortable loose cotton clothing, walking shoes for forest trails, and any current health records you wish our physicians to review.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>How does WhatsApp ordering & consultation work?</h4>
            <p>When you submit a product order or service enquiry form, your details are automatically formatted and dispatched directly to Sparsha Healthcare's official WhatsApp concierge for instant confirmation and personalized support.</p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title="Privacy Statement (Demo Prototype)"
      >
        <p style={{ marginBottom: '12px' }}>
          Sparsha Healthcare Group is committed to patient confidentiality and ethical data stewardship. In this interactive demo prototype, all appointment and order inquiries are stored locally in mock session memory for demonstration purposes.
        </p>
        <p>No sensitive financial or personal medical records are collected or transmitted to third parties.</p>
      </Modal>

      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title="Terms & Conditions (Demo Prototype)"
      >
        <p style={{ marginBottom: '12px' }}>
          This website serves as a conceptual interactive presentation of Sparsha Healthcare Group and Shustha Herbal Remedies.
        </p>
        <p>
          Information provided regarding wellness approaches, naturopathic therapies, and botanical blends is curated for demonstration and educational purposes and does not replace personalized medical advice from a licensed physician.
        </p>
      </Modal>
    </footer>
  );
}
