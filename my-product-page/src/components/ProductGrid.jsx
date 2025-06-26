import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import './ProductGrid.css';

const ProductGrid = ({ search = '', sortField = '', sortOrder = 'asc', category = '', limit = 10 }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

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

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer' }}>
            <img src={product.images[0]} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p>${product.price}</p>
            <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); e.preventDefault(); addToCart(product); alert('Added to cart: ' + product.title); }}>
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

export default ProductGrid;
