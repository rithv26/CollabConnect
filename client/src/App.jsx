import React from "react";
import { AuthProvider } from "./components/AuthContext";
import Home from "./integrals/Home";

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

export default App;