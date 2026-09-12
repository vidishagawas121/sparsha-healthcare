import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Care', path: '/care' },
    { name: 'Wellness Resort', path: '/retreat' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header className="navbar-wrap">
        <div className="container">
          <nav className="navbar" aria-label="Main Navigation">
            {/* Brand */}
            <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
              <div className="brand-leaf-icon">
                <Leaf size={20} />
              </div>
              <div className="brand-text">
                <span className="brand-title">SPARSHA</span>
                <span className="brand-subtitle">Healthcare Group</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="nav-links">
              {navLinks.map((link) => (
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

              <Button to="/appointment" variant="primary" size="sm">
                Book Consultation
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
            <div className="brand-leaf-icon">
              <Leaf size={18} />
            </div>
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
          {navLinks.map((link) => (
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
            Book Consultation
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
