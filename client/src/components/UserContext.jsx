import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
  
    // Function to fetch user data
    const fetchUserData = async (auth0Id) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${auth0Id}`);
        setUserData(response.data);
        console.log("it was succesful");
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    // Function to handle login success
    const handleLoginSuccess = (auth0Id) => {
      fetchUserData(auth0Id);
    };
  
    return (
      <UserContext.Provider value={{ userData, setUserData, handleLoginSuccess }}>
        {children}
      </UserContext.Provider>
    );
  };
  