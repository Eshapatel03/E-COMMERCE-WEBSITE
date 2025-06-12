import React, { useState } from 'react';
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
    </div>
  );
}

export default App;
