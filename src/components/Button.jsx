import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  onClick,
  type = 'button',
  icon: Icon,
  disabled = false
}) {
  const baseClasses = `btn btn-${variant} ${size !== 'md' ? `btn-${size}` : ''} ${block ? 'btn-block' : ''} ${className}`;

  if (to) {
    if (to.startsWith('#')) {
      return (
        <a
          href={to}
          className={baseClasses}
          onClick={(e) => {
            e.preventDefault();
            const element = document.querySelector(to);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
            if (onClick) onClick(e);
          }}
        >
          {Icon && <Icon size={18} />}
          {children}
        </a>
      );
    }
    return (
      <Link to={to} className={baseClasses} onClick={onClick}>
        {Icon && <Icon size={18} />}
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {Icon && <Icon size={18} />}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}
