// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/Navbar.css';
import CartService from '../services/CartService';
import AuthService from '../services/AuthService';

const Navbar = ({ isAdmin, history }) => {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  useEffect(() => {
    const fetchCartItemCount = async () => {
      if (isAuthenticated) {
        try {
          const userId = AuthService.getUserId();
          const cart = await CartService.getCart(userId);
          setCartItemCount(cart.items.length);
        } catch (err) {
          console.error('Failed to retrieve cart item count', err);
        }
      }
    };

    fetchCartItemCount();
  }, [isAuthenticated]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/file2.png" alt="Fresh Market" />
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/home" className="navbar-item">Home</Link></li>
          <li><Link to="/products" className="navbar-item">Products</Link></li>
          <li><Link to="/services" className="navbar-item">Services</Link></li>
          <li><Link to="/our-work" className="navbar-item">Our Work</Link></li>
          {isAdmin && (
            <>
              <li><Link to="/admin/products" className="navbar-item">Manage Products</Link></li>
              <li><Link to="/admin/users" className="navbar-item">Manage Users</Link></li>
            </>
          )}
          {isAuthenticated ? (
            <>
              <li className="navbar-item">{userEmail}</li>
              <li className="navbar-item" onClick={handleLogout}>Logout</li>
              <li className="navbar-item">
                <Link to="/cart" className="cart-icon-container">
                  <FaShoppingCart />
                  {cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="navbar-item navbar-btn">Login</Link></li>
              <li><Link to="/register" className="navbar-item navbar-btn">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
