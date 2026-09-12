import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import { products, productCategories } from '../data/products';
import { Sparkles, Shield, CheckCircle, Search } from 'lucide-react';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="shop-page">
      {/* Hero */}
      <Hero
        title="Shustha Herbal Remedies."
        subtitle="Natural wellness, thoughtfully crafted."
        description="Handcrafted herbal teas, adaptogenic capsules, and soothing extracts sourced from pesticide-free micro-farms in the Western Ghats."
        backgroundImage="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=2000&q=85"
        showCtas={false}
        height="50vh"
      />

      {/* Main Shop Container */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Pure Botanical Apothecary"
            title="Bring Healing Into Your Everyday Routine"
            subtitle="Formulated with purity, batch-tested potency, and time-honored Ayurvedic botanical principles."
          />

          {/* Search & Filter Bar */}
          <div style={{ maxWidth: '640px', margin: '0 auto 32px auto', position: 'relative' }}>
            <Search
              size={18}
              color="var(--color-text-muted)"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Search botanical remedies (e.g. digestive, vitality, tea)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '46px', borderRadius: 'var(--radius-full)' }}
            />
          </div>

          <div className="filter-bar">
            {productCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="cards-grid-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '64px 20px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '16px' }}>
                No remedies found matching "{searchQuery}".
              </p>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Quality Trust Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              marginTop: '80px',
              padding: '36px',
              background: 'var(--color-bg-alt)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Sparkles size={28} color="var(--color-gold)" />
              <div>
                <h4 style={{ fontSize: '0.98rem', marginBottom: '2px' }}>100% Plant-Derived</h4>
                <p style={{ fontSize: '0.82rem', margin: 0 }}>Western Ghats sustainably wildcrafted herbs</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Shield size={28} color="var(--color-primary)" />
              <div>
                <h4 style={{ fontSize: '0.98rem', marginBottom: '2px' }}>Doctor Formulated</h4>
                <p style={{ fontSize: '0.82rem', margin: 0 }}>Designed by our Naturopaths & Herbalists</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <CheckCircle size={28} color="var(--color-sage)" />
              <div>
                <h4 style={{ fontSize: '0.98rem', marginBottom: '2px' }}>Safe & Clean Ingredients</h4>
                <p style={{ fontSize: '0.82rem', margin: 0 }}>No synthetic additives or heavy metals</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
