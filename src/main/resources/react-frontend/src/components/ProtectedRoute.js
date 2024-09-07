import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isAdmin, isTeamLeader, isProjectManager, isDeveloper, isTester } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          isAdmin || isTeamLeader || isProjectManager || isDeveloper || isTester ? (
            <Component {...props} />
          ) : (
            <div>Acces Denied</div>
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
