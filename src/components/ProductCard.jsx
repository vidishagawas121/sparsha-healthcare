import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-thumb">
        {product.badge && (
          <span className="card-badge gold">{product.badge}</span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </Link>

      <div className="product-body">
        <span className="product-category-tag">{product.category}</span>
        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="product-stars">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < Math.floor(product.rating) ? '#e5a93c' : 'none'}
              stroke="#e5a93c"
            />
          ))}
          <span>({product.reviewsCount})</span>
        </div>

        <p className="product-desc">{product.shortDescription}</p>

        <div className="product-bottom-row">
          <div className="product-price">₹{product.price}</div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => addToCart(product, 1)}
            icon={ShoppingBag}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
