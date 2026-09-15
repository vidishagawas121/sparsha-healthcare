import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import { ArrowRight, Sparkles, Youtube, Instagram, Facebook } from 'lucide-react';
import NoticeBoard from './NoticeBoard';
import { SOCIAL_LINKS } from '../data/contactInfo';

export default function Hero({
  title = "Heal Naturally.",
  subtitle = "Live Completely.",
  description = "Holistic wellness through nature, science and expert care. Integrating Naturopathy, functional medicine, Ayurveda, and serene retreat immersions.",
  backgroundImage = "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2000&q=85",
  showCtas = true,
  showTrust = true,
  height = "88vh",
  primaryCtaText = "Book a Consultation",
  primaryCtaLink = "/appointment",
  secondaryCtaText = "Explore Our Retreat",
  secondaryCtaLink = "/retreat",
  showNoticeBoard = false,
  showSocial = false
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSecondaryClick = (e) => {
    // If the secondary link points to the page we are already on, scroll down smoothly
    if (secondaryCtaLink === location.pathname || (secondaryCtaLink === '/retreat' && location.pathname === '/retreat')) {
      e.preventDefault();
      const target = document.querySelector('#programs') || document.querySelector('.section') || document.querySelector('.split-grid');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      className={`hero ${showNoticeBoard ? 'hero-with-notice-board' : ''}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: height
      }}
    >
      <div className="hero-overlay" />
      <div className="container">
        {showNoticeBoard ? (
          <div className="hero-split-grid">
            {/* Left Column: Brand Story & CTAs */}
            <div className="hero-content">
              {showTrust && (
                <div className="hero-trust-badge">
                  <Sparkles size={16} color="#dfbe74" />
                  <span>Nature • Science • Expert Care</span>
                </div>
              )}

              <h1 className="hero-title">{title}</h1>
              <div className="hero-subtitle">{subtitle}</div>

              <p className="hero-description">{description}</p>

              {/* Social Channels in Hero (matching reference layout) */}
              {showSocial && (
                <div className="hero-social-row">
                  <span className="hero-social-label">Follow Sparsha:</span>
                  <div className="hero-social-icons">
                    <a
                      href={SOCIAL_LINKS.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-btn youtube"
                      title="Dr. Sarja's Health Tips on YouTube"
                    >
                      <Youtube size={16} />
                      <span>YouTube</span>
                    </a>
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-btn instagram"
                      title="Sparsha Hospital on Instagram"
                    >
                      <Instagram size={16} />
                      <span>Instagram</span>
                    </a>
                    <a
                      href={SOCIAL_LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-btn facebook"
                      title="Sparsha Integrated on Facebook"
                    >
                      <Facebook size={16} />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              )}

              {showCtas && (
                <div className="hero-ctas">
                  <Button to={primaryCtaLink} variant="primary" size="lg">
                    {primaryCtaText}
                  </Button>
                  <Button
                    to={secondaryCtaLink}
                    variant="outline-white"
                    size="lg"
                    icon={ArrowRight}
                    onClick={handleSecondaryClick}
                  >
                    {secondaryCtaText}
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column: Interactive Notice Board */}
            <div className="hero-notice-board-wrap">
              <NoticeBoard />
            </div>
          </div>
        ) : (
          <div className="hero-content">
            {showTrust && (
              <div className="hero-trust-badge">
                <Sparkles size={16} color="#dfbe74" />
                <span>Nature • Science • Expert Care</span>
              </div>
            )}

            <h1 className="hero-title">{title}</h1>
            <div className="hero-subtitle">{subtitle}</div>

            <p className="hero-description">{description}</p>

            {showCtas && (
              <div className="hero-ctas">
                <Button to={primaryCtaLink} variant="primary" size="lg">
                  {primaryCtaText}
                </Button>
                <Button
                  to={secondaryCtaLink}
                  variant="outline-white"
                  size="lg"
                  icon={ArrowRight}
                  onClick={handleSecondaryClick}
                >
                  {secondaryCtaText}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

