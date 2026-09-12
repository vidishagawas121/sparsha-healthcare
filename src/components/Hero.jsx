import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import { ArrowRight, Sparkles } from 'lucide-react';

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
  secondaryCtaLink = "/retreat"
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
      className="hero"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: height
      }}
    >
      <div className="hero-overlay" />
      <div className="container">
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
      </div>
    </section>
  );
}
