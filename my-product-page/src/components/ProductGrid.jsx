<<<<<<< HEAD
import React, { useEffect, useState, useRef } from 'react';
import './ProductGrid.css';

const ProductGrid = ({ search = '', sortField = '', sortOrder = 'asc', category = '', limit = 10 }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  // Fetch products from external API
  const loadProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const offset = page * limit;
      const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      if (data.length < limit) setHasMore(false);
      setProducts((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering and sorting
  const filteredProducts = products
    .filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
    .filter((product) => (category ? product.category.name === category : true))
    .sort((a, b) => {
      if (!sortField) return 0;
      if (sortField === 'name') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sortField === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadProducts();
        }
      },
      { threshold: 1.0 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loader.current]);

  return (
    <>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.images[0]} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p>${product.price}</p>
            <button className="add-to-cart-btn" onClick={() => alert('Add to cart clicked for ' + product.title)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <div ref={loader} />
      {!hasMore && <p>No more products to load.</p>}
    </>
  );
};
=======
import React, { useEffect, useState, useMemo } from 'react';

function ProductGrid({ search, sortField, sortOrder, category }) {
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
        p => p.category && String(p.category.id) === String(category)
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

  return (
    <>
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          Error loading products: {error}
        </div>
      )}
      <div className="grid">
        {paginatedProducts.map(product => (
          <div className="card" key={product.id}>
            <img
              src={product.images[0]}
              alt={product.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p className="description">
              {product.description.length > 100
                ? product.description.slice(0, 100) + '...'
                : product.description}
            </p>
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
>>>>>>> 82f259f (E-COMMERCE-WEBSITE)

export default ProductGrid;
