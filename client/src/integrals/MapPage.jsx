import React, { useEffect, useRef, useState } from "react";
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
  ScaleControl,
  MapProvider,
} from "react-map-gl/maplibre";

const MapPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { handleLoginSuccess, userData } = useUser();
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const mapRef = useRef();

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

  const updateMarkers = (lat, lng, hack=false, dev=false, research=false, remote=false) => {
    // Call your API endpoint to get nearby locations
    const params = new URLSearchParams();

    if (hack) {
      params.append('isHacker', 'true');
    }
    if (dev) {
      params.append('isDeveloper', 'true');
    }
    if (research) {
      params.append('isResearcher', 'true');
    }  
    if (remote) {
      params.append('remote', 'true');
    }

    const request = (params.toString() == "") ? `http://localhost:3000/api/users/location?latitude=${lat}&longitude=${lng}` : `http://localhost:3000/api/users/location?latitude=${lat}&longitude=${lng}&${params.toString()}`; 
    console.log(request);
    axios
      .get(request)
      .then((response) => {
        const usersData = response.data;
        setUsers(usersData); // Store the user data

        // Extract locations from usersData
        const extractedLocations = usersData.map((user) => ({
          lat: user.location.coordinates[1],
          lng: user.location.coordinates[0],
        }));
        setNearbyLocations(extractedLocations);
      })
      .catch((error) => {
        console.error("Error fetching nearby locations:", error);
      });
  };

  return (
    <div className="relative h-screen w-screen">
      <MapProvider>
        <Navbar search={true} updateMarkers={updateMarkers} />
        <Map
          id="darkMap"
          initialViewState={{
            longitude: -20.0,  // Centered on Prime Meridian
            latitude: 50.0,   // Centered on Equator
            zoom: 1.3,         // Global view
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={import.meta.env.VITE_DARK_MAP}
          attributionControl={false}
          ref={mapRef}
          minZoom={1}
        >
          <GeolocateControl position="bottom-right" />
          <FullscreenControl position="bottom-right" />
          <NavigationControl position="bottom-right" />

          <Source
            id="nearby-markers"
            type="geojson"
            data={{
              type: "FeatureCollection",
              features: nearbyLocations.map((location) => ({
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [location.lng, location.lat],
                },
                properties: {},
              })),
            }}
          >
            <Layer
              id="marker-layer"
              type="circle"
              paint={{
                "circle-radius": 7,
                "circle-color": "#b3e6ff",
              }}
            />
          </Source>
        </Map>
      </MapProvider>
    </div>
  );
};

export default MapPage;
