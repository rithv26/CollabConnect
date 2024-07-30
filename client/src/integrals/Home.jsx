import React from "react";
import { useAuth } from "../components/AuthContext";
import Navbar from "../components/Navbar";
import Globe from "./Globe";
import Map from "./Map";

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <div>{isAuthenticated ? <Map /> : <Globe />}</div>
    </>
  );
}

export default Home;