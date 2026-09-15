import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ENGLISH_DIET_CHARTS, 
  getDietChartBySlug 
} from '../data/dietChartsData';
import { buildWhatsAppUrl, generateWhatsAppDietEnquiryUrl } from '../data/contactInfo';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Printer, 
  MessageCircle, 
  Sparkles, 
  AlertCircle, 
  ChevronRight, 
  ArrowLeft, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  Share2
} from 'lucide-react';

export default function DietChartsDownloadFiles() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find initial diet chart based on URL param or default to Detox Diet
  const initialChart = slug ? getDietChartBySlug(slug) : ENGLISH_DIET_CHARTS[0];
  const [activeChart, setActiveChart] = useState(initialChart);
  const [userData, setUserData] = useState(null);
  const [copied, setCopied] = useState(false);

  const protocolRef = useRef(null);

  // Sync state if URL slug changes
  useEffect(() => {
    if (slug) {
      const found = getDietChartBySlug(slug);
      if (found) {
        setActiveChart(found);
      }
    }
  }, [slug]);

  // Load saved lead details if any
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sparsha_diet_lead');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.firstName) {
          setUserData(parsed);
        }
      }
    } catch (e) {
      // safe fallback
    }
  }, []);

  // When user clicks a diet button
  const handleSelectDiet = (chart) => {
    setActiveChart(chart);
    navigate(`/diet-charts/download-files/${chart.slug}`, { replace: true });
    if (protocolRef.current) {
      protocolRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppConsult = () => {
    const userSignature = userData?.firstName 
      ? `\nPatient Name: ${userData.firstName} ${userData.lastName} (${userData.city || 'India'}, ${userData.country || 'India'})` 
      : '';
    const message = `SPARSHA HEALTHCARE - CLINICAL DIET CONSULTATION\n------------------------------------\nSelected Protocol: ${activeChart.title} (${activeChart.fullTitle || activeChart.title})\nCategory: ${activeChart.category}${userSignature}\n\nHello Doctor, I have accessed this diet chart on your website and would like a personalized dosha-specific nutrition plan tailored to my metabolic profile. Please guide me.`;
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  return (
    <div className="diet-download-page">
      {/* Breadcrumb Navigation */}
      <div className="diet-breadcrumb-bar">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <nav className="diet-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep"><ChevronRight size={14} /></span>
            <Link to="/diet-charts" className="breadcrumb-link">Diet Charts</Link>
            <span className="breadcrumb-sep"><ChevronRight size={14} /></span>
            <span className="breadcrumb-current">Download Files</span>
            {activeChart && (
              <>
                <span className="breadcrumb-sep"><ChevronRight size={14} /></span>
                <span className="breadcrumb-current active-slug-text">{activeChart.title}</span>
              </>
            )}
          </nav>

          <Link to="/diet-charts" className="diet-back-btn">
            <ArrowLeft size={14} />
            <span>Registration Form</span>
          </Link>
        </div>
      </div>

      {/* Main Download Container */}
      <div className="container" style={{ padding: '32px 20px 80px 20px' }}>
        
        {/* Welcome greeting banner for registered user with WhatsApp enquiry status */}
        {userData?.firstName && (
          <div className="diet-user-welcome-badge">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <ShieldCheck size={18} color="#166534" />
              <span>
                Verified Registration for <strong>{userData.firstName} {userData.lastName}</strong> ({userData.email}) • Logged to Admin
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  const url = generateWhatsAppDietEnquiryUrl(userData);
                  window.open(url, '_blank');
                }}
                className="btn"
                style={{
                  background: '#25D366',
                  color: '#ffffff',
                  padding: '5px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(37, 211, 102, 0.3)'
                }}
                title="Send your diet consultation enquiry directly to Sparsha on WhatsApp"
              >
                <MessageCircle size={14} />
                <span>Send Enquiry on WhatsApp</span>
              </button>
              <span className="diet-user-badge-tag">Library Unlocked</span>
            </div>
          </div>
        )}

        {/* BLUE BANNER: "Diet Charts in English" Matching user screenshot */}
        <div className="diet-download-banner">
          <div className="diet-download-banner-pattern" aria-hidden="true" />
          <div className="diet-download-banner-content">
            <h1 className="diet-download-banner-title">
              Diet Charts in English
            </h1>
          </div>
        </div>

        {/* 3x2 GRID OF 6 PILL BUTTONS Matching user screenshot */}
        <div className="diet-download-grid-container">
          <div className="diet-download-grid">
            {ENGLISH_DIET_CHARTS.map((chart) => {
              const isSelected = activeChart.id === chart.id;
              return (
                <button
                  key={chart.id}
                  type="button"
                  id={`btn-diet-${chart.slug}`}
                  onClick={() => handleSelectDiet(chart)}
                  className={`diet-download-pill ${isSelected ? 'active' : ''}`}
                  aria-pressed={isSelected}
                >
                  <span className="pill-title">{chart.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE DIET PROTOCOL VIEW & DOWNLOAD PANEL */}
        <div 
          className="diet-protocol-card" 
          id="diet-protocol-view" 
          ref={protocolRef}
        >
          {/* Card Top Action Header */}
          <div className="diet-protocol-header">
            <div>
              <div className="diet-protocol-badge">
                <Sparkles size={14} />
                <span>{activeChart.category}</span>
              </div>
              <h2 className="diet-protocol-title">
                {activeChart.fullTitle || activeChart.title}
              </h2>
              <p className="diet-protocol-desc">
                {activeChart.description}
              </p>
              <div className="diet-target-conditions">
                <strong>Target Conditions & Health Goals:</strong> {activeChart.targetConditions}
              </div>
            </div>

            {/* Action Buttons: Print PDF & WhatsApp Consult */}
            <div className="diet-action-btn-group">
              <button
                type="button"
                id="btn-print-chart"
                onClick={handlePrint}
                className="btn-print-download"
                title="Download or Print full resolution chart as PDF"
              >
                <Download size={16} />
                <span>Download / Print PDF</span>
              </button>

              <button
                type="button"
                id="btn-whatsapp-chart"
                onClick={handleWhatsAppConsult}
                className="btn-whatsapp-consult"
                title="Request customized meal plan on WhatsApp"
              >
                <MessageCircle size={16} />
                <span>Ask Doctor on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="btn-share-chart"
                title="Copy direct link to this chart"
              >
                <Share2 size={15} />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Quick Diet Switcher Bar */}
          <div className="diet-quick-switcher">
            <span className="quick-switcher-label">Select Diet Chart:</span>
            <div className="quick-switcher-chips">
              {ENGLISH_DIET_CHARTS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectDiet(c)}
                  className={`quick-chip ${c.id === activeChart.id ? 'active' : ''}`}
                >
                  {c.icon} {c.title}
                </button>
              ))}
            </div>
          </div>

          {/* HOUR-BY-HOUR DAILY SCHEDULE TIMELINE */}
          <div className="diet-schedule-section">
            <h3 className="diet-section-heading">
              <Clock size={20} color="#b8860b" />
              <span>Hour-by-Hour Daily Routine</span>
            </h3>

            <div className="diet-schedule-timeline">
              {activeChart.schedule.map((slot, index) => (
                <div key={index} className="diet-schedule-item">
                  <div className="schedule-time-col">
                    <div className="schedule-time">{slot.time}</div>
                    <div className="schedule-step-label">Step {index + 1}</div>
                  </div>

                  <div className="schedule-content-col">
                    <h4 className="schedule-meal-title">{slot.title}</h4>
                    <p className="schedule-meal-desc">{slot.meal}</p>
                    <div className="schedule-benefit-badge">
                      <span>💡 Clinical Rationale:</span> {slot.benefit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOODS TO INCLUDE (PATHYA) VS FOODS TO AVOID (APATHYA) */}
          <div className="diet-foods-comparison-grid">
            {/* Foods to Include */}
            <div className="diet-foods-box include-box">
              <h4 className="foods-box-title include-title">
                <CheckCircle2 size={20} color="#166534" />
                <span>Foods to Emphasize (Pathya)</span>
              </h4>
              <div className="foods-list">
                {activeChart.foodsToInclude.map((item, idx) => (
                  <div key={idx} className="foods-list-item include-item">
                    <div className="food-name">✓ {item.food}</div>
                    <div className="food-reason">{item.reason}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Foods to Avoid */}
            <div className="diet-foods-box avoid-box">
              <h4 className="foods-box-title avoid-title">
                <XCircle size={20} color="#991b1b" />
                <span>Foods to Strictly Avoid (Apathya)</span>
              </h4>
              <div className="foods-list">
                {activeChart.foodsToAvoid.map((item, idx) => (
                  <div key={idx} className="foods-list-item avoid-item">
                    <div className="food-name">✗ {item.food}</div>
                    <div className="food-reason">{item.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DOCTOR CLINICAL NOTE */}
          {activeChart.doctorNote && (
            <div className="diet-doctor-note-card">
              <AlertCircle size={22} color="#b8860b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--color-primary)', marginBottom: '4px', fontSize: '0.98rem' }}>
                  Clinical Physician Guidance
                </strong>
                <p style={{ margin: 0, color: 'var(--color-text-main)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {activeChart.doctorNote}
                </p>
              </div>
            </div>
          )}

          {/* WHATSAPP CUSTOMIZATION CALLOUT BANNER */}
          <div className="diet-custom-banner">
            <h3 className="custom-banner-title">
              Looking for a Customized Nutrition Plan for Your Dosha?
            </h3>
            <p className="custom-banner-desc">
              Every body constitution (Prakriti) requires fine-tuned macronutrient ratios. Send your latest blood work or consultation request to our senior clinical dietitians on WhatsApp.
            </p>
            <button
              type="button"
              onClick={handleWhatsAppConsult}
              className="btn-custom-whatsapp"
            >
              <MessageCircle size={18} />
              <span>Consult Sparsha Nutritionist on WhatsApp</span>
              <ExternalLink size={15} />
            </button>
          </div>

          {/* Bottom Print & Share Action Footer */}
          <div className="diet-card-footer">
            <button
              type="button"
              onClick={handlePrint}
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Printer size={16} />
              <span>Print {activeChart.title} Protocol</span>
            </button>

            <Link
              to="/diet-charts"
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <ArrowLeft size={16} />
              <span>Return to Registration Form</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
