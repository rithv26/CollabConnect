import React, { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../components/AuthContext";
import { useUser } from "../components/UserContext";
import Map, {
  Popup,
  GeolocateControl,
  FullscreenControl,
  Marker,
  NavigationControl,
  MapProvider,
} from "react-map-gl/maplibre";
import "../App.css";
import CustomPopup from "../components/CustomPopup";
import Modal from "../components/Modal";

const MapPage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth();
  const [toWho, setToWho] = useState(""); // State to store the email content
  const [emailContent, setEmailContent] = useState(""); // State to store the email content
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleLoginSuccess, currentUser } = useUser();
  const [users, setUsers] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const mapRef = useRef();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const newToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `http://localhost:3000/api`,
        },
      });
      console.log("TOken got:", newToken);
      setToken(newToken);
    };

    fetchToken();
  }, [isAuthenticated]);

  useEffect(() => {
    const checkAndCreateUser = async () => {
      try {
        if (isAuthenticated && user && token !== null) {
          const auth0Id = user.sub;
          const headers = {
            authorization: `Bearer ${token}`,
          };
          console.log(headers);
          // Check if user already exists
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/${auth0Id}`,
            { headers },
          );
          console.log("User exists:", response.data);
          handleLoginSuccess(auth0Id);
        }
      } catch (error) {
        if (error.response && error.response.status === 404 && token !== null) {
          // If user does not exist, create an empty user
          try {
            const headers = {
              authorization: `Bearer ${token}`,
            };
            console.log(headers);

            const createResponse = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/users`,
              {
                auth0Id: user.sub,
              },
              { headers },
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
  }, [isAuthenticated, token]);

  const updateMarkers = async (
    lat,
    lng,
    hack = false,
    dev = false,
    research = false,
    remote = false,
  ) => {
    if (token !== null) {
      const params = new URLSearchParams();

      if (hack) {
        params.append("isHacker", "true");
      }
      if (dev) {
        params.append("isDeveloper", "true");
      }
      if (research) {
        params.append("isResearcher", "true");
      }
      if (remote) {
        params.append("remote", "true");
      }

      const request =
        params.toString() == ""
          ? `${import.meta.env.VITE_BACKEND_URL}/api/users/location?latitude=${lat}&longitude=${lng}`
          : `${import.meta.env.VITE_BACKEND_URL}/api/users/location?latitude=${lat}&longitude=${lng}&${params.toString()}`;
      console.log(request);
      const headers = {
        authorization: `Bearer ${token}`,
      };
      console.log(headers);
      axios
        .get(request, { headers })
        .then((response) => {
          const usersData = response.data;
          console.log("Fetched Users Data:", usersData);
          setUsers(usersData);
        })
        .catch((error) => {
          console.error("Error fetching nearby locations:", error);
        });
    }
  };

  const markers = useMemo(
    () =>
      users.map((user, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={user.location.coordinates[0]}
          latitude={user.location.coordinates[1]}
          anchor="center"
          onClick={(e) => {
            e.originalEvent.stopPropagation(); // Prevent map click event
            setPopupInfo(user);
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#b3e6ff",
              borderRadius: "50%",
              cursor: "pointer",
              border: "1px solid #fff",
            }}
          />
        </Marker>
      )),
    [users],
  );

  const handleSendEmail = async (emailText, toEmail) => {
    if (token !== null) {
      try {
        const headers = {
          authorization: `Bearer ${token}`,
        };
        console.log(headers);

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/connect`,
          {
            to: [toEmail],
            subject: `Collaboration Request from ${currentUser.name}`,
            text: emailText,
          },
          { headers },
        );
        alert("Email sent successfully!");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Failed to send email.");
      }
    }
  };

  const handleTeamUp = () => {
    if (currentUser && popupInfo) {
      const content = `Hi ${popupInfo.name},

I hope this message finds you well. I am ${currentUser.name}, and I am interested in collaborating with you on potential projects. 

Looking forward to hearing from you.

Best regards,
${currentUser.name}`;
      setEmailContent(content); // Set the email content
      setToWho(popupInfo.email);
      setPopupInfo(null);
      setIsModalOpen(true); // Open the modal
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <MapProvider>
        <SearchBar updateMarkers={updateMarkers} />
        <Map
          id="darkMap"
          initialViewState={{
            longitude: -20.0, // Centered on Prime Meridian
            latitude: 50.0, // Centered on Equator
            zoom: 1.3, // Global view
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

          {markers}

          {popupInfo && (
            <Popup
            className="custom-popup"
              maxWidth={window.innerWidth < 2560 ? "300px" : "600px"}
              closeOnMove
              anchor="bottom"
              longitude={popupInfo.location.coordinates[0]}
              latitude={popupInfo.location.coordinates[1]}
              onClose={() => setPopupInfo(null)}
            >
              <CustomPopup
                user={popupInfo}
                onTeamUp={handleTeamUp}
                isProfileComplete={currentUser.profileCompleted}
                yourself={popupInfo.auth0Id === currentUser.auth0Id}
              />
            </Popup>
          )}
        </Map>
      </MapProvider>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        emailContent={emailContent}
        onSendEmail={handleSendEmail}
        toWho={toWho}
      />
    </div>
  );
};

export default MapPage;
