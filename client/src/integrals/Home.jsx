import React from "react";
import { useAuth } from "../components/AuthContext";
import GlobePage from "./GlobePage";
import MapPage from "./MapPage";
import Loading from "./Loading";

function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>{isAuthenticated ? <MapPage /> : <GlobePage />}</div>
    </>
  );
}

export default Home;
