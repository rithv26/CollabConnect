import React from "react";
import { useAuth } from "../components/AuthContext";
import Navbar from "../components/Navbar";
import Globe from "./Globe";
import Map from "./Map";
import { ColorRing } from "react-loader-spinner";

function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ColorRing colors={['#000000', '#000000', '#000000', '#000000', '#000000']} width="60" height="60" color="#000000" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div>{isAuthenticated ? <Map /> : <Globe />}</div>
    </>
  );
}

export default Home;
