// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import CartService from '../services/CartService';
import AuthService from '../services/AuthService';
import OrderService from '../services/OrderService';
import '../styles/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = AuthService.getUserId();
        const cart = await CartService.getCart(userId);
        setCartItems(cart.items);
      } catch (err) {
        setError('Failed to retrieve cart items.');
        console.error(err);
      }
    };

    fetchCart();
  }, []);

  const handleConvertCartToOrder = async () => {
    try {
      const userId = AuthService.getUserId();
      await OrderService.convertCartToOrder(userId);
      setSuccessMessage('Cart successfully converted to order!');
      // setCartItems([]); // Clear cart items
    } catch (err) {
      setError('Failed to convert cart to order.');
      console.error(err);
    }
  };

  return (
    <div className="cart-page-container">
      <h1>Your Cart</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="cart-items-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <div>
                <h3>{item.productName}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button className="btn-convert-to-order" onClick={handleConvertCartToOrder}>
          Convert to Order
        </button>
      )}
    </div>
  );
};

export default CartPage;
