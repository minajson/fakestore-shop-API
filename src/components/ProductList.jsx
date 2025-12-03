
import { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import SkeletonCard from './SkeletonCard.jsx';
import { getAllProducts } from '../api.js';

export default function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getAllProducts(); // GET /products
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError('Could not load products. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...unique];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      product.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  return (
    <section>
      <div className="toolbar">
        <h2 className="section-title">All Products</h2>

        <div className="toolbar-controls">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All'
                  ? 'All categories'
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="center-text error">{error}</p>}

      {loading ? (
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="center-text">
          No products found. Try changing your search or category.
        </p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}
