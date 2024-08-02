import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../components/AuthContext";
import { useUser } from "../components/UserContext";
import Map, {
  GeolocateControl,
  AttributionControl,
  FullscreenControl,
  Marker,
  Layer,
  Source,
  NavigationControl,
  ScaleControl
} from "react-map-gl/maplibre";
import PlaceComponent from "../components/AutoComplete";

const MapPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { handleLoginSuccess, userData } = useUser();

  useEffect(() => {
    const checkAndCreateUser = async () => {
      try {
        if (isAuthenticated && user) {
          const auth0Id = user.sub;

          // Check if user already exists
          const response = await axios.get(
            `http://localhost:3000/api/users/${auth0Id}`,
          );
          console.log("User exists:", response.data);
          handleLoginSuccess(auth0Id);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // If user does not exist, create an empty user
          try {
            const createResponse = await axios.post(
              "http://localhost:3000/api/users",
              {
                auth0Id: user.sub,
              },
            );
            console.log("User created:", createResponse.data);
            handleLoginSuccess(user.sub);
          } catch (createError) {
            console.error("Error creating user or fetching:", createError);
          }
        } else {
          console.error("Error checking user:", error);
        }
      }
    };

    checkAndCreateUser();
  }, [isAuthenticated]);

  return (
    <div className="relative h-screen w-screen">
      <Navbar search={true} />
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 1,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={import.meta.env.VITE_DARK_MAP}
        attributionControl={false}
      >
        <GeolocateControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
        <NavigationControl position="bottom-right"/>

      </Map>
    </div>
  );
};

export default MapPage;
