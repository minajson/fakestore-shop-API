import { Link } from 'react-router-dom';

const NAIRA_RATE = 1600; // <--- add this

export default function ProductCard({ product, onAddToCart }) {
  const priceInNaira = product.price * NAIRA_RATE;

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>

      <div className="product-body">
        <h3 className="product-title">
          {product.title.length > 40
            ? product.title.slice(0, 40) + '...'
            : product.title}
        </h3>

        <p className="product-category">{product.category}</p>

        {/* Show Naira instead of dollars */}
        <p className="product-price">
          ₦{priceInNaira.toLocaleString('en-NG', { maximumFractionDigits: 0 })}
        </p>

        <div className="card-actions">
          <button
            className="btn secondary small"
            onClick={() => onAddToCart(product)}
          >
            + Cart
          </button>
          <Link to={`/products/${product.id}`} className="btn small">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
