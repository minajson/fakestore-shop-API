
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
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
        <p className="product-price">${product.price.toFixed(2)}</p>

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
