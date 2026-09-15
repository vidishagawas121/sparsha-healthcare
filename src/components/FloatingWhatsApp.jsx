import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CONTACT_INFO, buildWhatsAppUrl } from '../data/contactInfo';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = "Hello Sparsha Healthcare! I would like to enquire about your treatments, retreat stays, or herbal formulations.";
  const waUrl = buildWhatsAppUrl(defaultMessage);

  return (
    <div
      className="floating-whatsapp-container"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px'
      }}
    >
      {/* Friendly Tooltip Bubble */}
      {showTooltip && (
        <div
          style={{
            background: '#ffffff',
            color: 'var(--color-text-main)',
            padding: '10px 14px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            border: '1px solid rgba(0,0,0,0.06)',
            fontSize: '0.85rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            maxWidth: '240px',
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          <span>Need help? Chat with our care concierge on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '2px'
            }}
            aria-label="Close tooltip"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Sparsha Healthcare"
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)',
          cursor: 'pointer',
          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease',
          textDecoration: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.45)';
        }}
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
