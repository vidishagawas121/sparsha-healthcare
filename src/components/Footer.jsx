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
              <div className="brand-leaf-icon" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <Leaf size={20} color="#dfbe74" />
              </div>
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
                href="#instagram"
                className="footer-social-btn"
                aria-label="Instagram"
                onClick={(e) => { e.preventDefault(); alert('Demo Link: Sparsha Healthcare Instagram profile.'); }}
              >
                <Instagram size={18} />
              </a>
              <a
                href="#facebook"
                className="footer-social-btn"
                aria-label="Facebook"
                onClick={(e) => { e.preventDefault(); alert('Demo Link: Sparsha Healthcare Facebook page.'); }}
              >
                <Facebook size={18} />
              </a>
              <a
                href="#youtube"
                className="footer-social-btn"
                aria-label="YouTube"
                onClick={(e) => { e.preventDefault(); alert('Demo Link: Sparsha Healthcare YouTube channel.'); }}
              >
                <Youtube size={18} />
              </a>
              <a
                href="#linkedin"
                className="footer-social-btn"
                aria-label="LinkedIn"
                onClick={(e) => { e.preventDefault(); alert('Demo Link: Sparsha Healthcare LinkedIn profile.'); }}
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-column-title">Explore</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/care" className="footer-link">Care & Services</Link></li>
              <li><Link to="/retreat" className="footer-link">Wellness Resort</Link></li>
              <li><Link to="/shop" className="footer-link">Herbal Shop</Link></li>
              <li><Link to="/contact" className="footer-link">Contact & Locations</Link></li>
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
        title="Frequently Asked Questions (Demo)"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>How do I schedule an in-person consultation?</h4>
            <p>You can submit an appointment request through our Appointment page or visit any of our regional centers in Chikmagalur and Bangalore.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>What should I pack for the Chikkolale Retreat?</h4>
            <p>Comfortable loose cotton clothing, walking shoes for forest trails, and any current health records you wish our physicians to review.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>How does the demo QR payment work?</h4>
            <p>During checkout, a demo UPI QR code is displayed to showcase the modern digital payment experience for Shustha Herbal Remedies.</p>
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
