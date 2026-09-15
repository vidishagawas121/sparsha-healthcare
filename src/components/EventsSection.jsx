import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../data/eventsData';
import { generateWhatsAppNoticeUrl, generateWhatsAppEventUrl, CONTACT_INFO } from '../data/contactInfo';
import SectionTitle from './SectionTitle';
import Button from './Button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  MessageCircle, 
  ArrowRight, 
  PlusCircle, 
  Sparkles,
  Settings,
  Tag
} from 'lucide-react';

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (e) {
        console.error('Failed to load events:', e);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();

    const handleStorage = (e) => {
      if (e.key === 'sparsha_upcoming_events') {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setEvents(parsed);
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorage);

    // Check if admin is currently authenticated
    const adminToken = localStorage.getItem('sparsha_admin_token');
    if (adminToken) {
      setIsAdmin(true);
    }

    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleRegisterWhatsApp = (event) => {
    const waUrl = generateWhatsAppNoticeUrl(event);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section upcoming-events-section" style={{ background: 'var(--color-bg-alt)', padding: '96px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '48px' }}>
          <div>
            <div className="eyebrow-tag" style={{ marginBottom: '10px' }}>
              <Sparkles size={14} color="var(--color-gold)" /> Seasonal Gatherings & Retreats
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '8px', lineHeight: '1.2' }}>
              Upcoming Wellness Events
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '640px' }}>
              Join senior Ayurvedic physicians, yoga masters, and holistic lifestyle experts for immersive retreats and clinical workshops across Karnataka.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {isAdmin && (
              <Link
                to="/admin"
                className="btn btn-outline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                <Settings size={16} />
                <span>Manage Events (Admin)</span>
              </Link>
            )}
            <Link
              to="/appointment?service=Resort%20Stay%20Enquiry"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
            >
              <span>Custom Group Booking</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Events Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
            Loading upcoming wellness events...
          </div>
        ) : events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', background: '#ffffff', borderRadius: 'var(--radius-md)' }}>
            <Calendar size={48} color="var(--color-primary)" style={{ opacity: 0.5, marginBottom: '16px' }} />
            <h3>No Scheduled Events Right Now</h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '8px 0 24px 0' }}>
              Check back soon or contact our concierge via WhatsApp for bespoke retreats.
            </p>
            {isAdmin && (
              <Button to="/admin" variant="primary" icon={PlusCircle}>
                Add an Event in Admin Panel
              </Button>
            )}
          </div>
        ) : (
          <div className="cards-grid-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="card event-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                {/* Event Image (Uses uploaded image, or themed fallback if omitted) */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={
                      evt.image || 
                      (evt.type === 'retreat' 
                        ? '/images/pillar_retreat.jpg' 
                        : evt.type === 'opd' 
                        ? '/images/ayurveda_shirodhara.jpg' 
                        : evt.type === 'workshop' 
                        ? '/images/wiki_moringa_1.jpg' 
                        : '/images/digestive_balance.jpg')
                    }
                    alt={evt.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: 'rgba(59, 20, 100, 0.92)',
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(223, 190, 116, 0.3)'
                    }}
                  >
                    {evt.category}
                  </div>

                  {evt.slotsAvailable && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '14px',
                        right: '14px',
                        background: 'rgba(255, 255, 255, 0.92)',
                        color: 'var(--color-primary)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Users size={12} />
                      <span>{evt.slotsAvailable} spots left</span>
                    </div>
                  )}
                </div>

                {/* Event Card Content */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Date and Time */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontSize: '0.9rem', fontWeight: 700 }}>
                      <Calendar size={15} />
                      <span>{evt.dateDisplay || evt.date}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                      <Clock size={14} />
                      <span>{evt.time}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                      <MapPin size={14} />
                      <span>{evt.location}</span>
                    </div>

                    {evt.price && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontSize: '0.88rem', fontWeight: 700 }}>
                        <Tag size={14} />
                        <span>{evt.price}</span>
                      </div>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', lineHeight: '1.35', color: 'var(--color-primary)' }}>
                    {evt.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: '1.6', marginBottom: '24px', flex: 1 }}>
                    {evt.description || evt.summary}
                  </p>

                  {/* Dynamic WhatsApp CTA */}
                  <button
                    type="button"
                    onClick={() => handleRegisterWhatsApp(evt)}
                    style={{
                      width: '100%',
                      background: '#25D366',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 18px',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>{evt.actionText || 'Register / Enquire via WhatsApp'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
