import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Leaf, MessageCircle, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { itemCount } = useCart();
  const location = useLocation();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  // Close dropdown when location changes or clicking outside
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Care', path: '/care' },
    { name: 'Wellness Resort', path: '/retreat' }
  ];

  const moreDropdownLinks = [
    { name: 'Diet Charts', path: '/diet-charts', desc: 'Clinical nutritional schedules & protocols' },
    { name: 'Articles', path: '/articles', desc: 'Menstrual health, gut care & wellness wisdom' },
    { name: 'Patient Reviews', path: '/testimonials', desc: 'Real stories of natural recovery' },
    { name: 'Shop Remedies', path: '/shop', desc: 'Authentic Western Ghats herbal formulations' },
    { name: 'Contact', path: '/contact', desc: 'Regional centers & clinics in Karnataka' }
  ];

  const isMoreActive = moreDropdownLinks.some(link => location.pathname === link.path);

  return (
    <>
      <header className="navbar-wrap navbar-wrapper">
        <div className="container">
          <nav className="navbar">
            {/* Logo Brand */}
            <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
              <img
                src="/images/sparsha_logo.png"
                alt="Sparsha Healthcare Group Logo"
                className="brand-logo-img"
                style={{
                  height: '46px',
                  width: '46px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  background: '#ffffff',
                  padding: '2px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              />
              <div className="brand-text brand-text-block">
                <span className="brand-title">SPARSHA</span>
                <span className="brand-subtitle brand-tagline">HEALTHCARE GROUP</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="nav-links">
              {primaryNavLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {/* More Dropdown Menu */}
              <li 
                ref={dropdownRef}
                className="nav-dropdown-item"
                style={{ position: 'relative' }}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`nav-link ${isMoreActive ? 'active' : ''}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    padding: '8px 0'
                  }}
                  aria-expanded={dropdownOpen}
                >
                  <span>More</span>
                  <ChevronDown 
                    size={15} 
                    style={{ 
                      transition: 'transform 0.2s ease', 
                      transform: dropdownOpen ? 'rotate(180deg)' : 'none' 
                    }} 
                  />
                </button>

                {/* Dropdown Popover */}
                {dropdownOpen && (
                  <div
                    className="nav-dropdown-menu"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      minWidth: '240px',
                      background: '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
                      border: '1px solid var(--color-border)',
                      padding: '8px 0',
                      zIndex: 1000,
                      animation: 'fadeIn 0.2s ease-in-out'
                    }}
                  >
                    {moreDropdownLinks.map((subLink) => (
                      <Link
                        key={subLink.path}
                        to={subLink.path}
                        onClick={() => setDropdownOpen(false)}
                        style={{
                          display: 'block',
                          padding: '10px 20px',
                          color: location.pathname === subLink.path ? 'var(--color-primary)' : 'var(--color-text-main)',
                          background: location.pathname === subLink.path ? 'var(--color-bg-alt)' : 'transparent',
                          fontWeight: location.pathname === subLink.path ? 700 : 500,
                          fontSize: '0.9rem',
                          textDecoration: 'none',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-alt)'}
                        onMouseLeave={(e) => {
                          if (location.pathname !== subLink.path) {
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        <div style={{ textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.85rem', fontWeight: 700 }}>
                          {subLink.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          {subLink.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>

            {/* Actions: Cart + CTAs */}
            <div className="nav-actions">
              <Link
                to="/cart"
                className="cart-icon-btn"
                aria-label={`Cart with ${itemCount} items`}
                onClick={closeMobileMenu}
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="cart-badge-count">{itemCount}</span>
                )}
              </Link>

              <Button to="/appointment" variant="primary" size="sm" icon={MessageCircle}>
                Consult / Enquire
              </Button>

              <Button to="/shop" variant="gold" size="sm">
                Shop Now
              </Button>

              {/* Hamburger Button for Mobile */}
              <button
                className="hamburger-btn"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation"
              >
                <Menu size={24} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Drawer */}
      <aside className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="brand-logo">
            <img
              src="/images/sparsha_logo.png"
              alt="Sparsha Healthcare Group Logo"
              style={{
                height: '42px',
                width: '42px',
                objectFit: 'contain',
                borderRadius: '8px',
                background: '#ffffff',
                padding: '2px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
              }}
            />
            <div className="brand-text">
              <span className="brand-title" style={{ fontSize: '1.25rem' }}>
                SPARSHA
              </span>
              <span className="brand-subtitle">Healthcare Group</span>
            </div>
          </div>
          <button
            className="modal-close-btn"
            style={{ position: 'static' }}
            onClick={closeMobileMenu}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="mobile-nav-links">
          {primaryNavLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={closeMobileMenu}
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {/* More items on mobile */}
          <li style={{ padding: '8px 16px', fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Wellness Resources
          </li>
          {moreDropdownLinks.map((subLink) => (
            <li key={subLink.path}>
              <NavLink
                to={subLink.path}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={closeMobileMenu}
              >
                {subLink.name}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              <span>Shopping Cart</span>
              {itemCount > 0 && (
                <span className="card-badge gold" style={{ position: 'static' }}>
                  {itemCount}
                </span>
              )}
            </NavLink>
          </li>
        </ul>

        <div className="mobile-nav-ctas">
          <Button
            to="/appointment"
            variant="primary"
            block
            onClick={closeMobileMenu}
          >
            Consult / Enquire on WhatsApp
          </Button>
          <Button
            to="/shop"
            variant="gold"
            block
            onClick={closeMobileMenu}
          >
            Shop Now
          </Button>
        </div>
      </aside>
    </>
  );
}
