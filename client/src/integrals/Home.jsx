import React from "react";
import { useAuth } from "../components/AuthContext";
import GlobePage from "./GlobePage";
import MapPage from "./MapPage";
import { ColorRing } from "react-loader-spinner";

function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-100">
        <ColorRing colors={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']} width="60" height="60" color="#000000" />
      </div>
    );
  }

  return (
    <>
      <div>{isAuthenticated ? <MapPage /> : <GlobePage />}</div>
    </>
  );
}

export default Home;
