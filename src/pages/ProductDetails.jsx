import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { Star, ShoppingBag, ArrowLeft, Check, ShieldCheck, Truck, RefreshCw, Zap, MessageCircle } from 'lucide-react';
import { generateWhatsAppProductUrl } from '../data/contactInfo';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ margin: '16px 0 32px 0' }}>
          The herbal formulation you are looking for is not in our current demo catalogue.
        </p>
        <Button to="/shop" variant="primary">
          Back to Shop
        </Button>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleWhatsAppOrder = () => {
    const waUrl = generateWhatsAppProductUrl(product, quantity);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="product-details-page" style={{ padding: '48px 0 96px 0' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '32px' }}>
          <Link to="/" style={{ color: 'var(--color-primary)' }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: 'var(--color-primary)' }}>Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        {/* Product Main Grid */}
        <div className="product-detail-grid">
          {/* Left Gallery Image */}
          <div className="product-gallery-main">
            <img src={product.image} alt={product.name} />
          </div>

          {/* Right Product Overview & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'inline-block', color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
              {product.category} • {product.volume}
            </div>

            <h1 style={{ fontSize: '2.4rem', marginBottom: '12px', lineHeight: '1.2' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#e5a93c' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? '#e5a93c' : 'none'}
                    stroke="#e5a93c"
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                {product.rating} ({product.reviewsCount} customer reviews)
              </span>
            </div>

            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '16px' }}>
              ₹{product.price}
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '28px' }}>
              {product.shortDescription}
            </p>

            {/* Key Features List */}
            {product.features && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '32px' }}>
                {product.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                    <Check size={16} color="var(--color-gold)" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Stepper & Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <div className="quantity-stepper">
                <button
                  className="stepper-btn"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <div className="stepper-value">{quantity}</div>
                <button
                  className="stepper-btn"
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <Button
                variant="primary"
                onClick={() => addToCart(product, quantity)}
                icon={ShoppingBag}
              >
                Add to Cart
              </Button>

              <Button
                variant="gold"
                onClick={handleBuyNow}
                icon={Zap}
              >
                Buy Now
              </Button>

              <button
                type="button"
                className="btn"
                onClick={handleWhatsAppOrder}
                style={{
                  background: '#25D366',
                  color: '#ffffff',
                  border: '1px solid #25D366',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)'
                }}
              >
                <MessageCircle size={18} />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            {/* Guarantee / Shipping Badge */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={16} color="var(--color-primary)" />
                <span>Express dispatch from Bangalore & Chikmagalur apothecaries</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={16} color="var(--color-primary)" />
                <span>Purity guaranteed: Batch tested Western Ghats botanicals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Accordion / Tabs */}
        <div className="product-info-tabs">
          <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--color-border)', marginBottom: '24px' }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                paddingBottom: '12px',
                fontSize: '1.05rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                cursor: 'pointer',
                color: activeTab === 'description' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderBottom: activeTab === 'description' ? '2px solid var(--color-gold)' : '2px solid transparent'
              }}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                paddingBottom: '12px',
                fontSize: '1.05rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                cursor: 'pointer',
                color: activeTab === 'ingredients' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderBottom: activeTab === 'ingredients' ? '2px solid var(--color-gold)' : '2px solid transparent'
              }}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button
              style={{
                background: 'none',
                border: 'none',
                paddingBottom: '12px',
                fontSize: '1.05rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                cursor: 'pointer',
                color: activeTab === 'usage' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderBottom: activeTab === 'usage' ? '2px solid var(--color-gold)' : '2px solid transparent'
              }}
              onClick={() => setActiveTab('usage')}
            >
              Recommended Usage
            </button>
          </div>

          <div>
            {activeTab === 'description' && (
              <div>
                <p style={{ lineHeight: '1.8', fontSize: '1.02rem', marginBottom: '16px' }}>
                  {product.description}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  Demo Product Note: This herbal blend is designed as a wellness lifestyle supplement. Information provided is for educational and presentation demonstration purposes.
                </p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--color-primary)' }}>Botanical Composition</h4>
                <p style={{ lineHeight: '1.8', fontSize: '1.02rem', marginBottom: '16px' }}>
                  {product.ingredients}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Sustainably wildcrafted and harvested during peak seasonal potency. Free from synthetic bulking agents or artificial dyes.
                </p>
              </div>
            )}

            {activeTab === 'usage' && (
              <div>
                <h4 style={{ marginBottom: '12px', color: 'var(--color-primary)' }}>Suggested Ritual</h4>
                <p style={{ lineHeight: '1.8', fontSize: '1.02rem', marginBottom: '16px' }}>
                  {product.usage}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  For optimal assimilation, consume with mindful awareness in a calm environment. Consult a Sparsha health consultant if you are pregnant or taking specific prescription medications.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back Link */}
        <div style={{ marginTop: '40px' }}>
          <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Herbal Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
