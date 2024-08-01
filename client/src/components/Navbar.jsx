import React from "react";
import { useAuth, useAuthUpdate } from "./AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const { loginWithRedirect, logout } = useAuthUpdate();

  return (
    <div className="h-10 w-full bg-primary text-primary-content p-2">
      {isAuthenticated ? (
        <>
          Welcome, {user.sub}    
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
          <Link to="/profile" className="text-primary-content">Profile link</Link>
        </>
      ) : (
        <>
          <button className="bg-white rounded-md " onClick={loginWithRedirect}>Login</button>
          You are on the globe page navbar
        </>
      )}
    </div>
  );
}

export default Navbar;