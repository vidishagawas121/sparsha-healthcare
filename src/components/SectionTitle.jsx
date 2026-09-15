import React from 'react';
import { Sparkles } from 'lucide-react';

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false
}) {
  return (
    <div className={`section-header ${align === 'left' ? 'text-left' : ''}`}>
      {eyebrow && (
        <div className="eyebrow-tag">
          <Sparkles size={14} style={{ color: light ? '#dfbe74' : 'var(--color-primary-light)' }} />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 style={light ? { color: '#ffffff' } : {}}>{title}</h2>
      {subtitle && (
        <p style={light ? { color: 'rgba(250, 248, 244, 0.85)' } : {}}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
