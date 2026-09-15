import React, { useState } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { DIET_CHARTS } from '../data/dietChartsData';
import { buildWhatsAppUrl, CONTACT_INFO } from '../data/contactInfo';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  MessageCircle, 
  Sparkles, 
  Heart, 
  AlertCircle,
  Download,
  Share2,
  ExternalLink
} from 'lucide-react';

export default function DietCharts() {
  const [activeChartId, setActiveChartId] = useState(DIET_CHARTS[0].id);

  const currentChart = DIET_CHARTS.find(c => c.id === activeChartId) || DIET_CHARTS[0];

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppDietRequest = (chart) => {
    const message = `SPARSHA HEALTHCARE - DIET REGIMEN ENQUIRY\n------------------------------------\nProtocol: ${chart.title}\nCategory: ${chart.category}\n\nHello Doctor, I am reviewing this dietary protocol on your website. I would like a personalized diet consultation tailored to my body type and health goals. Thank you.`;
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  return (
    <div className="diet-charts-page">
      <Hero
        title="Therapeutic Diet Charts."
        subtitle="Food as primary medicine for cellular regeneration."
        description="Explore doctor-curated whole food regimens crafted to kindle digestive Agni, eliminate metabolic toxicity (Ama), and rebalance endocrine and autonomic functions."
        backgroundImage="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=2000&q=85"
        showCtas={false}
        height="48vh"
      />

      <section className="section" style={{ padding: '64px 0 96px 0' }}>
        <div className="container">
          
          {/* Diet Charts Selector Tabs */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
            {DIET_CHARTS.map((chart) => (
              <button
                key={chart.id}
                type="button"
                onClick={() => setActiveChartId(chart.id)}
                style={{
                  background: activeChartId === chart.id ? 'var(--color-primary)' : '#ffffff',
                  color: activeChartId === chart.id ? '#ffffff' : 'var(--color-text-main)',
                  border: '1px solid',
                  borderColor: activeChartId === chart.id ? 'var(--color-primary)' : 'var(--color-border)',
                  borderRadius: '30px',
                  padding: '12px 22px',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: activeChartId === chart.id ? '0 4px 12px rgba(59, 20, 100, 0.25)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{chart.icon}</span>
                <span>{chart.title.split('Diet Chart')[0].trim()}</span>
              </button>
            ))}
          </div>

          {/* Active Chart Presentation Box */}
          <div 
            className="diet-chart-container"
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '48px 40px',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {/* Header with Title & Print Action */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '24px', marginBottom: '32px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--color-sage-mist)', color: 'var(--color-primary)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                  <Sparkles size={14} /> Clinical Nutritional Protocol
                </div>
                <h1 style={{ fontSize: '2.2rem', marginBottom: '10px', color: 'var(--color-primary)' }}>
                  {currentChart.title}
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '720px', lineHeight: '1.6' }}>
                  {currentChart.description}
                </p>
                <div style={{ marginTop: '12px', fontSize: '0.88rem', color: 'var(--color-text-main)' }}>
                  <strong>Target Conditions:</strong> {currentChart.targetConditions}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}
                >
                  <Printer size={16} />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsAppDietRequest(currentChart)}
                  style={{
                    background: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 18px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)'
                  }}
                >
                  <MessageCircle size={16} />
                  <span>Customize on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Hour-by-Hour Daily Meal Schedule Timeline */}
            <div style={{ marginBottom: '48px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-primary)' }}>
                <Clock size={20} color="var(--color-gold)" />
                <span>Hour-by-Hour Daily Routine</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {currentChart.schedule.map((slot, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '120px 1fr',
                      gap: '24px',
                      padding: '20px 24px',
                      background: index % 2 === 0 ? 'var(--color-bg-alt)' : '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      alignItems: 'center'
                    }}
                    className="diet-schedule-row"
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                        {slot.time}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Routine
                      </div>
                    </div>

                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--color-primary)', marginBottom: '4px' }}>
                        {slot.title}
                      </div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: '1.55', marginBottom: '6px' }}>
                        {slot.meal}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-sage)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>💡 Benefit:</span>
                        <span>{slot.benefit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Do's and Don'ts / Foods to Include vs Avoid Comparison Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }} className="diet-foods-grid">
              {/* Foods to Include */}
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '28px' }}>
                <h4 style={{ color: '#166534', fontSize: '1.2rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} color="#166534" />
                  <span>Foods to Emphasize (Pathya)</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {currentChart.foodsToInclude.map((item, i) => (
                    <div key={i} style={{ borderBottom: '1px solid #dcfce7', paddingBottom: '10px' }}>
                      <div style={{ fontWeight: 700, color: '#14532d', fontSize: '0.95rem' }}>
                        ✓ {item.food}
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#166534', marginTop: '2px' }}>
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Foods to Avoid */}
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '28px' }}>
                <h4 style={{ color: '#991b1b', fontSize: '1.2rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <XCircle size={20} color="#991b1b" />
                  <span>Foods to Strictly Avoid (Apathya)</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {currentChart.foodsToAvoid.map((item, i) => (
                    <div key={i} style={{ borderBottom: '1px solid #fee2e2', paddingBottom: '10px' }}>
                      <div style={{ fontWeight: 700, color: '#7f1d1d', fontSize: '0.95rem' }}>
                        ✗ {item.food}
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#991b1b', marginTop: '2px' }}>
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Doctor Note */}
            {currentChart.doctorNote && (
              <div style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-sm)', padding: '20px 24px', borderLeft: '4px solid var(--color-gold)', display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '32px' }}>
                <AlertCircle size={20} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
                  <strong>Physician Clinical Note:</strong> {currentChart.doctorNote}
                </div>
              </div>
            )}

            {/* Consultation Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1f0a38 0%, #3b1464 100%)', borderRadius: 'var(--radius-md)', padding: '36px', color: '#ffffff', textAlign: 'center', border: '1px solid rgba(223, 190, 116, 0.25)', boxShadow: '0 8px 32px rgba(15, 5, 30, 0.25)' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1.6rem', marginBottom: '10px' }}>
                Need a Personalized Diet Chart for Your Body Type?
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
                Every individual has a unique Prakriti (Vata, Pitta, or Kapha constitution). Consult with our certified clinical dietitians on WhatsApp for a custom meal plan.
              </p>
              <button
                type="button"
                onClick={() => handleWhatsAppDietRequest(currentChart)}
                style={{
                  background: '#25D366',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px 28px',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)'
                }}
              >
                <MessageCircle size={20} />
                <span>Request Custom Diet Consultation on WhatsApp</span>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
