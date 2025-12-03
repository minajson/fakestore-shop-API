import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList.jsx';
import ProductDetails from './components/ProductDetails.jsx';

function App() {
  const NAIRA_RATE = 1600;

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart
  .reduce((sum, item) => sum + item.price * item.quantity * NAIRA_RATE, 0)
  .toFixed(0);


  return (
    <div className="app">
      <header className="app-header">
        <h1 className="logo">
          <Link to="/" className="logo-link">
            Mini Store
          </Link>
        </h1>

        <nav className="header-right">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <button
            className="cart-button"
            onClick={() => setIsCartOpen((open) => !open)}
          >
            🛒
            <span className="cart-badge">{cartCount}</span>
          </button>

          {isCartOpen && (
            <div className="cart-panel">
              <h3>Cart</h3>
              {cart.length === 0 ? (
                <p className="cart-empty">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="cart-items">
                    {cart.map((item) => (
                      <li key={item.id} className="cart-item">
                        <div>
                          <p className="cart-item-title">
                            {item.title.length > 40
                              ? item.title.slice(0, 40) + '...'
                              : item.title}
                          </p>
                          <p className="cart-item-meta">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          className="cart-remove"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="cart-total">
               Total: ₦{Number(cartTotal).toLocaleString('en-NG')}
              </p>

                  <button className="btn secondary cart-checkout">
                    Checkout (dummy)
                  </button>
                </>
              )}
            </div>
          )}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<ProductList onAddToCart={addToCart} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetails onAddToCart={addToCart} />}
          />
        </Routes>
      </main>

      <footer className="app-footer">
        Built with FakeStoreAPI & React 
      </footer>
    </div>
  );
}

export default App;
