import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const url = `https://api.escuelajs.co/api/v1/products/${id}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch product details');
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setError(null);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      })
      .catch(err => {
        setError(err.message);
        setProduct(null);
      });
  }, [id]);

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          Error loading product details: {error}
        </div>
        <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  if (!product) {
    return <div className="loading">Loading product details...</div>;
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        {'<'} Back to Products
      </button>
      
      <div className="product-detail-content">
        <div className="product-images">
          {mainImage && (
            <img
              src={mainImage}
              alt={`${product.title} - Main Image`}
              className="main-product-image"
            />
          )}
          <div className="thumbnail-images">
            {product.images && product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} - Thumbnail ${index + 1}`}
                className="thumbnail-image"
                onMouseEnter={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          
          <div className="price-section">
            <span className="price">${product.price}</span>
            {product.rating && (
              <div className="rating">
                <span>★</span> {product.rating.rate} ({product.rating.count} reviews)
              </div>
            )}
          </div>

          <div className="description-section">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <div className="details-section">
            <div className="detail-item">
              <strong>Category:</strong> {product.category ? product.category.name : 'N/A'}
            </div>
            <div className="detail-item">
              <strong>Stock:</strong> {product.stock !== undefined ? product.stock : 'N/A'}
            </div>
            {product.brand && (
              <div className="detail-item">
                <strong>Brand:</strong> {product.brand}
              </div>
            )}
          </div>

          <button className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
