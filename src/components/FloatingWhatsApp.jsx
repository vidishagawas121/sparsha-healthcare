import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CONTACT_INFO, buildWhatsAppUrl } from '../data/contactInfo';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = "Hello Sparsha Healthcare! I would like to enquire about your treatments, retreat stays, or herbal formulations.";
  const waUrl = buildWhatsAppUrl(defaultMessage);

  return (
    <div className="floating-whatsapp-container">
      {/* Friendly Tooltip Bubble */}
      {showTooltip && (
        <div className="floating-whatsapp-tooltip">
          <span>Need help? Chat with our care concierge on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '2px',
              flexShrink: 0
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
        className="floating-whatsapp-btn"
      >
        <MessageCircle size={30} />
      </a>
    </div>
  );
}
