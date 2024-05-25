import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProductService from '../services/ProductService';
import '../styles/ProductsComponent.css';

function ProductsComponent() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    ProductService.getAllProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        setError('Failed to retrieve products.');
        console.error(err);
      });
  }, []);

  const handleProductClick = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <div>
      <h1>Products</h1>
      {error && <p className="error">{error}</p>}
      <div className="products-container">
        {products.map((product, index) => (
          <div
            key={index}
            className="product-card"
            onClick={() => handleProductClick(product.id)}
          >
            <img src="file2.png" alt={product.name} /> 
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.description || 'No description available'}</p>
              <p className="product-price">Price: ${product.price}</p>
              <p>Available: {product.stockQuantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsComponent;
