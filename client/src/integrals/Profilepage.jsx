import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import Avatar from "../components/Avatar";
import { useAuth, useAuthUpdate } from "../components/AuthContext";
import { useUser } from "../components/UserContext";

export const Profilepage = () => {
  const { user } = useAuth();
  const { logout } = useAuthUpdate();
  const [selectedRole, setSelectedRole] = useState("");
  const {userData, setUserData, handleLoginSuccess} = useUser();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <>
      <nav
        className="absolute left-5 right-5 top-0 z-10 mt-7 flex items-center justify-between rounded-3xl bg-white bg-opacity-30 p-2"
        style={{ width: "97%" }}
      >
        <div className="flex-none px-2">
          <Link to={"/"} className="flex items-center text-lg font-bold">
            <img src={logo} alt="CollabConnect Logo" className="h-12 w-auto" />
          </Link>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <Avatar image={user.picture} />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] mt-4 w-52 rounded-2xl bg-white bg-opacity-30 p-2 shadow"
            >
              <li>
                <a onClick={() => logout({ returnTo: window.location.origin })}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <form style={{ width: "97%" }} className="absolute left-5 top-36 rounded-3xl bg-white bg-opacity-30 p-4">
        <label className="input input-bordered mb-4 flex items-center gap-4 rounded-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" className="grow" placeholder="Name" />
        </label>
        <label className="input input-bordered mb-4 flex items-center gap-4 rounded-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" placeholder="Email" />
        </label>
        <textarea
          className="input textarea input-bordered mb-4 h-40 w-full rounded-3xl"
          placeholder="Enter Description"
        ></textarea>
        <select
          className="select select-bordered mb-4 w-full rounded-3xl"
          onChange={handleRoleChange}
          defaultValue=""
        >
          <option value="" disabled>
            Select roles
          </option>
          <option value="Hacker">Hacker</option>
          <option value="Researcher">Researcher</option>
          <option value="Developer">Developer</option>
        </select>

        {selectedRole && (
          <label className="input input-bordered mb-4 flex items-center gap-4 rounded-3xl">
            <input
              type="text"
              className="grow"
              placeholder={`Enter ${selectedRole} profile link`}
            />
          </label>
        )}
      </form>
    </>
  );
};

export default Profilepage;
