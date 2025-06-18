import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

function ProductGrid({ search, sortField, sortOrder, category }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all products (limit large enough to get all)
    const url = `https://api.escuelajs.co/api/v1/products?limit=200`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        const validProducts = data.filter(
          p => p.title && p.description && p.images && p.images[0]
        );
        setProducts(validProducts);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setProducts([]);
      });
  }, []);

  // Apply search and category filter locally
  useEffect(() => {
    let tempProducts = [...products];

    if (search) {
      tempProducts = tempProducts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      tempProducts = tempProducts.filter(
        p => p.category && p.category.name === category
      );
    }

    setFilteredProducts(tempProducts);
    setCurrentPage(1); // reset page on filter change
  }, [products, search, category]);

  // Local sorting
  const sortedProducts = useMemo(() => {
    if (!sortField) return filteredProducts;

    const sorted = [...filteredProducts].sort((a, b) => {
      let aField, bField;

      if (sortField === 'name') {
        aField = a.title.toLowerCase();
        bField = b.title.toLowerCase();
      } else if (sortField === 'price') {
        aField = a.price;
        bField = b.price;
      } else {
        aField = a[sortField];
        bField = b[sortField];
      }

      if (aField < bField) return sortOrder === 'asc' ? -1 : 1;
      if (aField > bField) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredProducts, sortField, sortOrder]);

  // Pagination calculations
  const totalCount = sortedProducts.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(offset, offset + itemsPerPage);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          Error loading products: {error}
        </div>
      )}
      <div className="grid">
        {paginatedProducts.map(product => (
          <div 
            className="card" 
            key={product.id}
            style={{ cursor: 'default' }}
          >
            <img
              src={product.images[0]}
              alt={product.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleProductClick(product.id)}
            />
            <h3 
              style={{ cursor: 'pointer' }} 
              onClick={() => handleProductClick(product.id)}
            >
              {product.title}
            </h3>
            <p>Price: ${product.price}</p>
            <p className="description">
              {product.description.length > 100
                ? product.description.slice(0, 100) + '...'
                : product.description}
            </p>
            <button 
              onClick={() => addToCart(product)} 
              style={{ marginTop: '10px', padding: '8px 12px', cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination + Dropdown Centered */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          marginTop: '1.5rem',
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        {/* Pagination Controls */}
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ margin: '0 1rem' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* Items Per Page Dropdown */}
        <div>
          <label htmlFor="itemsPerPage" style={{ marginRight: '0.5rem' }}>
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // reset page
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default ProductGrid;

