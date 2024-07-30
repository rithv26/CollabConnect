import React from "react";
import { AuthProvider } from "./components/AuthContext";
import Home from "./integrals/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from "./integrals/Profile";
import PrivateRoute from "./components/Privateroute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


