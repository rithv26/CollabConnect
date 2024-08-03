import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Function to fetch user data
  const fetchUserData = async (auth0Id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${auth0Id}`,
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
