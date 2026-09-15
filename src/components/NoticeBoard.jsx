import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Sparkles, 
  Package, 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  X, 
  MessageCircle, 
  CheckCircle2, 
  Tag, 
  Stethoscope,
  Pin,
  ExternalLink
} from 'lucide-react';
import { getEvents } from '../data/eventsData';
import { generateWhatsAppNoticeUrl } from '../data/contactInfo';

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotices();

    // Listen to storage events so changes in admin update this board in real time
    const handleStorageChange = (e) => {
      if (e.key === 'sparsha_upcoming_events') {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setNotices(parsed);
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  async function loadNotices() {
    try {
      setLoading(true);
      const data = await getEvents();
      setNotices(data || []);
    } catch (err) {
      console.error('Failed to load notices:', err);
    } finally {
      setLoading(false);
    }
  }

  // Filter items
  const filteredNotices = notices.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'launch') {
      return item.type === 'product' || item.category?.toLowerCase().includes('product') || item.category?.toLowerCase().includes('launch');
    }
    if (activeFilter === 'retreat') {
      return item.type === 'retreat' || item.category?.toLowerCase().includes('retreat') || item.category?.toLowerCase().includes('nature');
    }
    if (activeFilter === 'opd') {
      return item.type === 'opd' || item.category?.toLowerCase().includes('opd') || item.category?.toLowerCase().includes('doctor');
    }
    return true;
  });

  const getBadgeStyle = (item) => {
    const isLaunch = item.type === 'product' || item.category?.toLowerCase().includes('launch');
    const isOpd = item.type === 'opd' || item.category?.toLowerCase().includes('opd');
    const isRetreat = item.type === 'retreat' || item.category?.toLowerCase().includes('retreat');

    if (isLaunch) {
      return {
        bg: 'rgba(217, 119, 6, 0.12)',
        color: '#b45309',
        border: '1px solid rgba(217, 119, 6, 0.28)',
        label: item.badge || 'NEW LAUNCH'
      };
    }
    if (isOpd) {
      return {
        bg: 'rgba(91, 33, 182, 0.12)',
        color: '#5b21b6',
        border: '1px solid rgba(91, 33, 182, 0.28)',
        label: item.badge || 'OPD NOTICE'
      };
    }
    if (isRetreat) {
      return {
        bg: 'rgba(124, 58, 237, 0.12)',
        color: '#6d28d9',
        border: '1px solid rgba(124, 58, 237, 0.25)',
        label: item.badge || 'UPCOMING RETREAT'
      };
    }
    return {
      bg: 'rgba(109, 40, 217, 0.08)',
      color: '#4c1d95',
      border: '1px solid rgba(109, 40, 217, 0.2)',
      label: item.badge || item.category || 'NOTICE'
    };
  };

  const handleWhatsAppAction = (item) => {
    const url = generateWhatsAppNoticeUrl(item);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className="notice-board-container" id="notice-board">
        {/* Board Top Header Banner */}
        <div className="notice-board-header">
          <div className="notice-board-header-left">
            <span className="live-pulse-dot" />
            <div className="notice-board-title-wrap">
              <span className="notice-board-main-title">NOTICE BOARD</span>
              <span className="notice-board-sub-title">Live Updates & Launches</span>
            </div>
          </div>

          <div className="notice-board-badge">
            <Bell size={13} className="bell-wiggle" />
            <span>{filteredNotices.length} Updates</span>
          </div>
        </div>

        {/* Quick Filter Navigation Tabs */}
        <div className="notice-board-tabs">
          <button
            type="button"
            className={`notice-tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`notice-tab-btn ${activeFilter === 'launch' ? 'active' : ''}`}
            onClick={() => setActiveFilter('launch')}
          >
            ✨ Launches
          </button>
          <button
            type="button"
            className={`notice-tab-btn ${activeFilter === 'retreat' ? 'active' : ''}`}
            onClick={() => setActiveFilter('retreat')}
          >
            🌿 Retreats
          </button>
          <button
            type="button"
            className={`notice-tab-btn ${activeFilter === 'opd' ? 'active' : ''}`}
            onClick={() => setActiveFilter('opd')}
          >
            🩺 Doctor OPD
          </button>
        </div>

        {/* Notice Items Scrollable List */}
        <div className="notice-board-list">
          {loading ? (
            <div className="notice-board-loading">
              <div className="mini-spinner" />
              <span>Checking live updates...</span>
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="notice-board-empty">
              <p>No active announcements in this category.</p>
            </div>
          ) : (
            filteredNotices.map((item) => {
              const badgeStyle = getBadgeStyle(item);
              return (
                <article key={item.id} className="notice-item-card">
                  {/* Category Pill & Pin indicator */}
                  <div className="notice-item-top-row">
                    <span
                      className="notice-pill-badge"
                      style={{
                        backgroundColor: badgeStyle.bg,
                        color: badgeStyle.color,
                        border: badgeStyle.border
                      }}
                    >
                      {badgeStyle.label}
                    </span>

                    {item.isPinned && (
                      <span className="notice-pinned-tag" title="Pinned Announcement">
                        <Pin size={12} /> Pinned
                      </span>
                    )}
                  </div>

                  {/* Notice Title */}
                  <h4 className="notice-item-title">{item.title}</h4>

                  {/* Summary / Sub-details */}
                  {item.summary && (
                    <p className="notice-item-summary">{item.summary}</p>
                  )}

                  {/* Meta Indicators */}
                  <div className="notice-item-meta">
                    {(item.dateDisplay || item.date) && (
                      <span className="notice-meta-item">
                        <Calendar size={13} color="var(--color-leaf)" />
                        <span>{item.dateDisplay || item.date}</span>
                      </span>
                    )}
                    {item.location && (
                      <span className="notice-meta-item">
                        <MapPin size={13} color="var(--color-leaf)" />
                        <span className="meta-truncate">{item.location.split(',')[0]}</span>
                      </span>
                    )}
                    {item.price && (
                      <span className="notice-meta-item meta-price">
                        <Tag size={13} color="#b45309" />
                        <span>{item.price}</span>
                      </span>
                    )}
                  </div>

                  {/* Action Row matching user's reference: Prominent [View Details] button */}
                  <div className="notice-item-actions">
                    <button
                      type="button"
                      className="notice-view-details-btn"
                      onClick={() => setSelectedNotice(item)}
                    >
                      <span>View Details</span>
                      <ChevronRight size={15} />
                    </button>

                    <button
                      type="button"
                      className="notice-quick-whatsapp-btn"
                      title="Enquire on WhatsApp"
                      onClick={() => handleWhatsAppAction(item)}
                    >
                      <MessageCircle size={15} />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Board Bottom Footer */}
        <div className="notice-board-footer">
          <span className="notice-footer-text">
            Admin verified announcements & clinical schedules
          </span>
          <Link to="/contact" className="notice-footer-link">
            <span>Enquire</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* POPUP MODAL: Interactive Full Details View */}
      {selectedNotice && (
        <div
          className="notice-modal-backdrop"
          onClick={() => setSelectedNotice(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="notice-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="notice-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  className="notice-pill-badge"
                  style={{
                    backgroundColor: getBadgeStyle(selectedNotice).bg,
                    color: getBadgeStyle(selectedNotice).color,
                    border: getBadgeStyle(selectedNotice).border
                  }}
                >
                  {getBadgeStyle(selectedNotice).label}
                </span>
                {selectedNotice.isPinned && (
                  <span className="notice-pinned-tag">
                    <Pin size={12} /> Pinned Update
                  </span>
                )}
              </div>

              <button
                type="button"
                className="notice-modal-close"
                onClick={() => setSelectedNotice(null)}
                aria-label="Close details"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Image if present */}
            {selectedNotice.image && (
              <div className="notice-modal-image-wrap">
                <img
                  src={selectedNotice.image}
                  alt={selectedNotice.title}
                  loading="lazy"
                />
              </div>
            )}

            {/* Modal Content */}
            <div className="notice-modal-body">
              <h3 className="notice-modal-title">{selectedNotice.title}</h3>

              {/* Key Highlights Grid */}
              <div className="notice-modal-meta-grid">
                {(selectedNotice.dateDisplay || selectedNotice.date) && (
                  <div className="modal-meta-item">
                    <Calendar size={16} color="var(--color-leaf)" />
                    <div>
                      <strong>Schedule / Date</strong>
                      <span>{selectedNotice.dateDisplay || selectedNotice.date}</span>
                    </div>
                  </div>
                )}

                {selectedNotice.time && (
                  <div className="modal-meta-item">
                    <Clock size={16} color="var(--color-leaf)" />
                    <div>
                      <strong>Timings / Duration</strong>
                      <span>{selectedNotice.time}</span>
                    </div>
                  </div>
                )}

                {selectedNotice.location && (
                  <div className="modal-meta-item">
                    <MapPin size={16} color="var(--color-leaf)" />
                    <div>
                      <strong>Location / Availability</strong>
                      <span>{selectedNotice.location}</span>
                    </div>
                  </div>
                )}

                {selectedNotice.price && (
                  <div className="modal-meta-item">
                    <Tag size={16} color="#b45309" />
                    <div>
                      <strong>Introductory Price / Fee</strong>
                      <span style={{ color: '#b45309', fontWeight: 600 }}>{selectedNotice.price}</span>
                    </div>
                  </div>
                )}

                {selectedNotice.slotsAvailable && (
                  <div className="modal-meta-item">
                    <CheckCircle2 size={16} color="var(--color-leaf)" />
                    <div>
                      <strong>Capacity</strong>
                      <span>{selectedNotice.slotsAvailable} slots available</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Full Description */}
              <div className="notice-modal-desc">
                <h4>Clinical Overview & Details:</h4>
                <p>{selectedNotice.description || selectedNotice.summary}</p>
              </div>

              {/* Modal Actions */}
              <div className="notice-modal-actions">
                <button
                  type="button"
                  className="btn btn-whatsapp-action"
                  onClick={() => handleWhatsAppAction(selectedNotice)}
                >
                  <MessageCircle size={18} />
                  <span>
                    {selectedNotice.actionText 
                      ? selectedNotice.actionText 
                      : selectedNotice.type === 'product' 
                        ? 'Order via WhatsApp' 
                        : selectedNotice.type === 'opd' 
                          ? 'Book OPD via WhatsApp' 
                          : 'Inquire on WhatsApp'}
                  </span>
                </button>

                {/* Secondary navigation based on type */}
                {selectedNotice.type === 'product' && (
                  <Link
                    to="/shop"
                    className="btn btn-secondary"
                    onClick={() => setSelectedNotice(null)}
                  >
                    <span>Visit Herbal Shop</span>
                    <ArrowRight size={16} />
                  </Link>
                )}

                {selectedNotice.type === 'retreat' && (
                  <Link
                    to="/retreat"
                    className="btn btn-secondary"
                    onClick={() => setSelectedNotice(null)}
                  >
                    <span>Explore Wellness Resort</span>
                    <ArrowRight size={16} />
                  </Link>
                )}

                {selectedNotice.type === 'opd' && (
                  <Link
                    to="/appointment"
                    className="btn btn-secondary"
                    onClick={() => setSelectedNotice(null)}
                  >
                    <span>Clinic Timings & Form</span>
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
