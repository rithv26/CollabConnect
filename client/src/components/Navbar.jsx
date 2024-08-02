import React, { useState, useEffect, useRef } from "react";
import { useAuth, useAuthUpdate } from "./AuthContext";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import logo from "../assets/bhaibhai.png";
import { IoIosSearch } from "react-icons/io";

function Navbar({ search = false }) {
  const { user } = useAuth();
  const { logout } = useAuthUpdate();

  // States for toggles and filter dropdown
  const [remote, setRemote] = useState(false);
  const [viewType, setViewType] = useState(false); // false for map, true for list
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null); // Ref to keep track of the filter dropdown
  const searchInputRef = useRef(null); // Ref for the search input

  // State for search input and results
  const [searchTerm, setSearchTerm] = useState("");

  // Handle multi-select dropdown
  const handleFilterChange = (option) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(option)
        ? prevFilters.filter((filter) => filter !== option)
        : [...prevFilters, option],
    );
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    });
  }, [filterRef]);

  return (
    <div
      className="absolute left-5 right-5 top-0 z-10 mt-7 flex items-center justify-between rounded-3xl bg-white bg-opacity-30 p-2"
      style={{ width: "97%" }}
    >
      <div className="flex-none px-2">
        <Link to={"/"} className="flex items-center text-lg font-bold">
          <img src={logo} alt="CollabConnect Logo" className="h-12 w-auto" />
        </Link>
      </div>

      {search && (
        <div className="ml-6 mr-6 flex flex-grow items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-4/6">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              ref={searchInputRef}
              type="text"
              placeholder="Please Enter the location..."
              className="focus:border-3 input w-full rounded-3xl bg-white text-black focus:border-blue-300 focus:outline-none"
            />
            <div onClick={() => searchInputRef.current.focus()}>
              <IoIosSearch className="absolute right-3 top-1/2 -translate-y-1/2 transform text-2xl text-gray-500" />
            </div>
          </div>

          {/* Custom Filter Button */}
          <div ref={filterRef} className="relative ml-3 mr-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="rounded-xl px-4 py-2 hover:border-[0.2px] hover:border-solid hover:border-white"
              style={isFilterOpen ? { border: "solid white 0.2px" } : {}}
            >
              Filters
            </button>

            {/* Filter Options */}
            {isFilterOpen && (
              <div className="w-30 absolute left-0 mt-2 rounded-lg bg-base-200 p-2 shadow-lg">
                {["Hackers", "Developers", "Researchers"].map((option) => (
                  <label
                    key={option}
                    className="m-1 flex cursor-pointer items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(option)}
                      onChange={() => handleFilterChange(option)}
                      className=""
                    />
                    <span className="text-white">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Remote/In-Person Toggle */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-3">Remote</span>
              <input
                type="checkbox"
                className="toggle rounded-full"
                onChange={() => setRemote(!remote)}
              />
            </label>
          </div>

          {/* Map/List Toggle */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-3">List View</span>
              <input
                type="checkbox"
                className="toggle rounded-full"
                onChange={() => setViewType(!viewType)}
              />
            </label>
          </div>
        </div>
      )}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <Avatar image={user.picture} />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] mt-4 w-52 rounded-2xl bg-base-200 p-2 shadow"
          >
            <li>
              <Link to="/profile">Your Profile</Link>
            </li>
            <li>
              <a onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
