import React from "react";
import { AuthProvider } from "./components/AuthContext";
import Home from "./integrals/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./integrals/Profile";
import PrivateRoute from "./components/Privateroute";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
