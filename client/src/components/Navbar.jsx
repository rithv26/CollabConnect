import React from "react";
import { useAuth, useAuthUpdate } from "./AuthContext";

function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const { loginWithRedirect, logout } = useAuthUpdate();

  return (
    <div className="h-10 w-full bg-blue-300 p-2">
      {isAuthenticated ? (
        <>
          Welcome, {user.name}
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
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