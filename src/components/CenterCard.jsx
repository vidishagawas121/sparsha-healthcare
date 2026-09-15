import React from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import Button from './Button';

export default function CenterCard({ center }) {
  const getCtaLink = () => {
    if (center.category === 'Wellness Retreat') {
      return '/retreat';
    }
    if (center.category === 'Herbal Products') {
      return '/shop';
    }
    return `/appointment?center=${encodeURIComponent(center.name)}`;
  };

  const getCtaText = () => {
    if (center.category === 'Wellness Retreat') return 'Explore Retreat';
    if (center.category === 'Herbal Products') return 'Shop Remedies';
    return 'Book at this Center';
  };

  return (
    <div className="card">
      <div className="card-image-wrap">
        <span className="card-badge gold">{center.category}</span>
        <img src={center.image} alt={center.name} loading="lazy" />
      </div>

      <div className="card-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-sage)', fontSize: '0.85rem', fontWeight: 600 }}>
            <MapPin size={16} />
            <span>{center.location}</span>
          </div>
          {center.rating && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '12px', fontSize: '0.74rem', fontWeight: 700 }}>
              <span>★ {center.rating}</span>
              <span>({center.reviewCount} Google reviews)</span>
            </div>
          )}
        </div>

        <h3 className="card-title">{center.name}</h3>
        <div className="card-subtitle">{center.tagline}</div>

        <p className="card-text">{center.description}</p>

        <div style={{ margin: '16px 0', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '10px' }}>
            Key Offerings:
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {center.servicesOffered.slice(0, 3).map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
                <CheckCircle size={14} color="var(--color-gold)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: 'var(--color-bg-alt)', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <MapPin size={14} color="var(--color-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <span>{center.address}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={14} color="var(--color-primary)" />
            <span>{center.timings}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={14} color="var(--color-primary)" />
            <span>{center.phone}</span>
          </div>
        </div>

        <div className="card-footer">
          <Button to={getCtaLink()} variant="primary" block>
            {getCtaText()}
          </Button>
        </div>
      </div>
    </div>
  );
}
