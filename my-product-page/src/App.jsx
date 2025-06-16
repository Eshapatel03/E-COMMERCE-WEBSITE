  import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  return (
    <Router>
      <div className="App" style={{ padding: '20px' }}>
        <h1>Product Store</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search by title"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ marginRight: '10px' }}
                />

                {/* Sort Dropdown */}
                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                  <option value="">Sort</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="price">Price (Low to High)</option>
                </select>

                {/* Filter Dropdown */}
                <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
                  <option value="">All Categories</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Furniture">Furniture</option>
                </select>

                {/* Items per page */}
                <select
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setOffset(0);
                  }}
                  value={limit}
                >
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>

                <ProductGrid
                  search={searchTerm}
                  sortBy={sortBy}
                  filterCategory={filterCategory}
                  limit={limit}
                  offset={offset}
                  setOffset={setOffset}
                />
              </>
            }
          />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
