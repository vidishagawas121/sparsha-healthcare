import React from 'react';
import { Leaf, Activity, Heart, Sparkles, Apple, ArrowRight } from 'lucide-react';
import Button from './Button';

const iconMap = {
  Leaf,
  Activity,
  Heart,
  Sparkles,
  Apple
};

export default function ServiceCard({ service, onLearnMore }) {
  const Icon = iconMap[service.iconName] || Leaf;

  return (
    <div className="card service-card">
      <div className="card-body">
        <div className="service-icon-wrap">
          <Icon size={28} />
        </div>
        <h3 className="card-title">{service.title}</h3>
        {service.tagline && (
          <div className="card-subtitle">{service.tagline}</div>
        )}
        <p className="card-text">{service.shortDescription}</p>
        <div className="card-footer">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onLearnMore(service)}
            icon={ArrowRight}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
