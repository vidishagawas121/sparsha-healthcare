import React from 'react';

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
          <span>🌿</span> {eyebrow}
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
