import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../api.js';

const NAIRA_RATE = 1600; // <--- add this

function DetailSkeleton() {
  // (leave as is)
}

export default function ProductDetails({ onAddToCart }) {
  // ... existing code ...

  if (loading) return <DetailSkeleton />;
  if (error) return <p className="center-text error">{error}</p>;
  if (!product) return null;

  const priceInNaira = product.price * NAIRA_RATE;

  return (
    <section className="product-detail">
      <div className="product-detail-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-detail-image"
        />
      </div>

      <div className="product-detail-body">
        <h2>{product.title}</h2>

        {/* Naira price here */}
        <p className="product-price big">
          ₦{priceInNaira.toLocaleString('en-NG', { maximumFractionDigits: 0 })}
        </p>

        <p className="product-category">
          Category:{' '}
          {product.category.charAt(0).toUpperCase() +
            product.category.slice(1)}
        </p>
        <p className="product-description">{product.description}</p>

        <div className="detail-actions">
          <button
            className="btn secondary"
            onClick={() => onAddToCart(product)}
          >
            Add to cart
          </button>
          <Link to="/" className="btn">
            Back to store
          </Link>
        </div>
      </div>
    </section>
  );
}
