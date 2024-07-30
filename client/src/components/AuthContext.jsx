import React, { createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext();
const AuthUpdateContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, user }}>
      <AuthUpdateContext.Provider value={{ loginWithRedirect, logout }}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useAuthUpdate = () => useContext(AuthUpdateContext);