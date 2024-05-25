// src/pages/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';
import CartService from '../services/CartService';
import AuthService from '../services/AuthService';
import '../styles/ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    ProductService.getProductById(id)
      .then(data => {
        setProduct(data);
      })
      .catch(err => {
        setError('Failed to retrieve product.');
        console.error(err);
      });
  }, [id]);

  const handleAddToCart = () => {
    const userId = AuthService.getUserId();
    const cartItem = {
      productId: product.id,
      quantity: quantity,
      price: product.price * quantity,
    };

    CartService.addToCart(userId, cartItem)
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        setError('Failed to add item to cart.');
        console.error(err);
      });
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details-container">
      <img src={product.imageUrl || 'file2.png'} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Available: {product.stockQuantity}</p>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          min="1"
          max={product.stockQuantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
      <button className="btn-add-to-cart" onClick={handleAddToCart}>
        Add to Cart
      </button>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ProductDetails;
