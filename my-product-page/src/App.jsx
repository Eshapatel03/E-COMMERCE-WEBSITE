import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import { CartProvider } from './context/CartContext.jsx';
import Cart from './components/Cart.jsx';

function FilterControls({ searchTerm, setSearchTerm, sortBy, setSortBy, filterCategory, setFilterCategory, limit, setLimit }) {
  const location = useLocation();

  // Clear filters function
  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('');
    setFilterCategory('');
    setLimit(10);
  };

  // Hide filter controls on /cart route
  if (location.pathname === '/cart') {
    return null;
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: '10px', padding: '5px', fontSize: '14px' }}
      />

      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} style={{ marginRight: '10px', padding: '5px', fontSize: '14px' }}>
        <option value="">Sort</option>
        <option value="name">Name (A-Z)</option>
        <option value="price">Price (Low to High)</option>
      </select>

      <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory} style={{ marginRight: '10px', padding: '5px', fontSize: '14px' }}>
        <option value="">All Categories</option>
        <option value="Clothes">Clothes</option>
        <option value="Electronics">Electronics</option>
        <option value="Shoes">Shoes</option>
        <option value="Furniture">Furniture</option>
      </select>

      <button onClick={clearFilters} style={{ marginLeft: '10px', padding: '5px 10px', fontSize: '14px' }}>
        Clear Filters 
      </button>

      <Link to="/cart" style={{ marginLeft: '20px', textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '18px' }}>
        Cart
      </Link>
    </div>
  );
}

function Header() {
  const location = useLocation();
  const path = location.pathname;

  let headerText = 'Product Store';
  if (path === '/cart') {
    headerText = 'Cart';
  }

  return <h1>{headerText}</h1>;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [limit, setLimit] = useState(10);

  return (
    <Router>
      <CartProvider>
        <div className="App" style={{ padding: '20px' }}>
          <Header />
          <FilterControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            limit={limit}
            setLimit={setLimit}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProductGrid
                  search={searchTerm}
                  sortField={sortBy}
                  sortOrder="asc"
                  category={filterCategory}
                />
              }
            />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
