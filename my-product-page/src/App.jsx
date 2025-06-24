import React, { useState } from 'react';
<<<<<<< HEAD
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
=======
import ProductGrid from './components/ProductGrid';

function App() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState(''); // 'name' or 'price' or ''
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [category, setCategory] = useState(''); // filter by category id or empty for all

  return (
    <div className="app" style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '200px' }}
      />

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label>
          Sort by:
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>

        <label>
          Order:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
            disabled={!sortField}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>

        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            <option value="">All</option>
            <option value="1">Clothes</option>
            <option value="2">Electronics</option>
            <option value="3">Furniture</option>
            <option value="4">Toys</option>
            <option value="5">Others</option>
          </select>
        </label>
      </div>

      <ProductGrid
        search={search}
        sortField={sortField}
        sortOrder={sortOrder}
        category={category}
      />
>>>>>>> 82f259f (E-COMMERCE-WEBSITE)
    </div>
  );
}

<<<<<<< HEAD
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

=======
>>>>>>> 82f259f (E-COMMERCE-WEBSITE)
export default App;
