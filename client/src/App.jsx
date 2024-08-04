import React, { useEffect, useState } from "react";
import { AuthProvider } from "./components/AuthContext";
import Home from "./integrals/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/Privateroute";
import { UserProvider } from "./components/UserContext";
import { MapProvider } from "react-map-gl/dist/esm/exports-maplibre";
import Profilepage from "./integrals/Profilepage";
import Loading from "./integrals/Loading";

function App() {
  const [isGoogleMapsAPILoaded, setIsGoogleMapsAPILoaded] = useState(false);

  useEffect(() => {
    if (!document.getElementById("googleMapsAPILoadingScript")) {
      const script = document.createElement("script");
      script.id = "googleMapsAPILoadingScript";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      window.initMap = function () {
        console.log("Google Maps is ready.");
        setIsGoogleMapsAPILoaded(true);
      };
    }
  }, []);

  return (
    <>
      {isGoogleMapsAPILoaded ? (
        <MapProvider>
          <AuthProvider>
            <UserProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profilepage />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </UserProvider>
          </AuthProvider>
        </MapProvider>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
