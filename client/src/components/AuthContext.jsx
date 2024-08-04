import React, { createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext();
const AuthUpdateContext = createContext();

// This context is tbf not needed since
// we can just use useAuth0() directly in any component
// However, this will make code more readable/intuitive
export const AuthProvider = ({ children }) => {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, user, getAccessTokenSilently, getAccessTokenWithPopup }}>
      <AuthUpdateContext.Provider value={{ loginWithRedirect, logout }}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useAuthUpdate = () => useContext(AuthUpdateContext);