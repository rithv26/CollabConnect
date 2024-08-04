import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const {getAccessTokenSilently} = useAuth();

  // Function to fetch user data
  const fetchUserData = async (auth0Id) => {
    try {
      const token = await getAccessTokenSilently();
      const headers = {
        authorization: `Bearer ${token}` 
      }
      console.log(headers);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${auth0Id}`, {headers}
      );
      setCurrentUser(response.data);
      console.log("it was succesful");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLoginSuccess = (auth0Id) => {
    fetchUserData(auth0Id);
  };
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, handleLoginSuccess }}>
      {children}
    </UserContext.Provider>
  );
};
