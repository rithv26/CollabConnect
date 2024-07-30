import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth();

  if (!isLoading) {
    return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
  }
};

export default PrivateRoute;
