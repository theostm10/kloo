import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          isAdmin ? (
            <Component {...props} />
          ) : (
            <div>Unauthorized Access</div> // You can customize this message or redirect to another page
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
