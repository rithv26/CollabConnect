import React from "react";
import { useUser } from "../components/UserContext";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { userData } = useUser();

  return (
    <>
      <Navbar />
      <p>{JSON.stringify(userData)}</p>
    </>
  );
};

export default Profile;
