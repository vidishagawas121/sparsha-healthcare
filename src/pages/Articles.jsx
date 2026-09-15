import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { articles, ARTICLE_CATEGORIES } from '../data/articlesData';
import { buildWhatsAppUrl, CONTACT_INFO } from '../data/contactInfo';
import { 
  Search, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  BookOpen, 
  Share2, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
      const matchesQuery = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = articles[0]; // Menstrual Health & Hormonal Harmony

  const handleConsultWhatsApp = (article) => {
    const message = `SPARSHA HEALTHCARE - CLINICAL ARTICLE ENQUIRY\n------------------------------------\nArticle: ${article.title}\nCategory: ${article.category}\n\nHello, I was reading this clinical article on your website and would like to consult with a doctor regarding holistic treatment protocols. Thank you.`;
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  return (
    <div className="articles-page">
      <Hero
        title="Clinical Knowledge & Healing Wisdom."
        subtitle="Bridging ancient Ayurvedic scriptures with modern functional science."
        description="Explore evidence-backed articles, therapeutic protocols, and naturopathic guidance curated by senior physicians at Sparsha Healthcare Group."
        backgroundImage="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=2000&q=85"
        showCtas={false}
        height="48vh"
      />

      <section className="section" style={{ padding: '64px 0 96px 0' }}>
        <div className="container">
          
          {/* Search & Category Filter Bar */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--color-border)', marginBottom: '48px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search articles by condition, herb or topic (e.g. menstrual, gut, sleep)..."
                  className="form-control"
                  style={{ paddingLeft: '44px', borderRadius: '30px' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Showing <strong>{filteredArticles.length}</strong> published articles
              </div>
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {ARTICLE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-bg-alt)',
                    color: selectedCategory === cat ? '#ffffff' : 'var(--color-text-main)',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-border)',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Article Hero (When All is selected and no search) */}
          {selectedCategory === 'All' && !searchQuery && featuredArticle && (
            <div 
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                marginBottom: '56px',
                display: 'grid',
                gridTemplateColumns: '1.1fr 1fr',
                boxShadow: 'var(--shadow-md)'
              }}
              className="featured-article-card"
            >
              <div style={{ position: 'relative', minHeight: '320px' }}>
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--color-primary)', color: '#ffffff', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  ⭐ Featured Health Protocol
                </div>
              </div>

              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  <span>{featuredArticle.category}</span> • <span>{featuredArticle.readTime}</span>
                </div>

                <h2 style={{ fontSize: '1.9rem', marginBottom: '14px', lineHeight: '1.3' }}>
                  {featuredArticle.title}
                </h2>

                <p style={{ color: 'var(--color-text-main)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '24px' }}>
                  {featuredArticle.summary}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    By <strong>{featuredArticle.author.split(',')[0]}</strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(featuredArticle)}
                    className="btn btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          <div className="cards-grid-3">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={art.image}
                    alt={art.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(59, 20, 100, 0.92)', color: '#ffffff', padding: '3px 10px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(223, 190, 116, 0.3)' }}>
                    {art.category}
                  </div>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} /> {art.date}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {art.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', lineHeight: '1.4', color: 'var(--color-primary)' }}>
                    {art.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                    {art.summary.length > 130 ? art.summary.substring(0, 130) + '...' : art.summary}
                  </p>

                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Medical Guidance
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveArticle(art)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>Read More</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Full Article Reader Modal */}
      <Modal
        isOpen={Boolean(activeArticle)}
        onClose={() => setActiveArticle(null)}
        title={activeArticle?.title}
      >
        {activeArticle && (
          <div style={{ padding: '8px 0' }}>
            {/* Meta Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '18px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <span style={{ background: 'var(--color-sage-mist)', color: 'var(--color-primary)', padding: '3px 10px', borderRadius: '12px', fontWeight: 600 }}>
                {activeArticle.category}
              </span>
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
              <span>•</span>
              <span>By {activeArticle.author}</span>
            </div>

            {/* Banner Image */}
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '260px', marginBottom: '24px' }}>
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Executive Summary */}
            <div style={{ background: 'var(--color-bg-alt)', borderLeft: '4px solid var(--color-primary)', padding: '16px 20px', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', marginBottom: '28px', fontStyle: 'italic', fontSize: '1.02rem', lineHeight: '1.6' }}>
              "{activeArticle.summary}"
            </div>

            {/* Content Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '32px' }}>
              {activeArticle.content?.map((sec, idx) => (
                <div key={idx}>
                  <h4 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
                    {sec.heading}
                  </h4>
                  <p style={{ lineHeight: '1.75', fontSize: '0.98rem', color: 'var(--color-text-main)' }}>
                    {sec.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Clinical Takeaways Callout */}
            {activeArticle.keyTakeaways && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '28px' }}>
                <h4 style={{ color: '#166534', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="#166534" />
                  <span>Key Clinical Takeaways:</span>
                </h4>
                <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeArticle.keyTakeaways.map((tip, i) => (
                    <li key={i} style={{ color: '#14532d', fontSize: '0.92rem', lineHeight: '1.5' }}>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Herbs */}
            {activeArticle.recommendedHerbs && (
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                  Botanicals & Formulations Mentioned:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {activeArticle.recommendedHerbs.map((h, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'var(--color-bg-alt)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-primary)',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '0.82rem',
                        fontWeight: 600
                      }}
                    >
                      🌿 {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp Doctor Consultation CTA */}
            <div style={{ background: 'linear-gradient(135deg, #1f0a38 0%, #3b1464 100%)', borderRadius: 'var(--radius-md)', padding: '28px', color: '#ffffff', textAlign: 'center', border: '1px solid rgba(223, 190, 116, 0.25)', boxShadow: '0 8px 24px rgba(15, 5, 30, 0.25)' }}>
              <h4 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '8px' }}>
                Dealing with this condition?
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.92rem', maxWidth: '520px', margin: '0 auto 20px auto' }}>
                Connect directly with our Ayurvedic doctors and naturopaths on WhatsApp for a personalized root-cause diagnostic consultation.
              </p>
              <button
                type="button"
                className="btn"
                onClick={() => handleConsultWhatsApp(activeArticle)}
                style={{
                  background: '#25D366',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 20px',
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
                  maxWidth: '100%',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <MessageCircle size={18} />
                <span>Consult Doctor on WhatsApp</span>
                <ExternalLink size={15} />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
