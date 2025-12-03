
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../api.js';

function DetailSkeleton() {
  return (
    <section className="product-detail">
      <div className="product-detail-image-wrapper skeleton-block" />
      <div className="product-detail-body">
        <div className="skeleton-line skeleton-line-lg" />
        <div className="skeleton-line skeleton-line-md" />
        <div className="skeleton-line skeleton-line-sm" />
        <div className="skeleton-line skeleton-line-md" />
        <div className="skeleton-button" />
      </div>
    </section>
  );
}

export default function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await getProductById(id); // GET /products/:id
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError('Could not load product.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <DetailSkeleton />;
  if (error) return <p className="center-text error">{error}</p>;
  if (!product) return null;

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
        <p className="product-price big">${product.price.toFixed(2)}</p>
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
