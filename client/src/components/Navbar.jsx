import React, { useState, useEffect, useRef } from "react";
import { useAuth, useAuthUpdate } from "./AuthContext";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import logo from "../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import { useMap } from "react-map-gl";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

function Navbar({ updateMarkers }) {
  const { user } = useAuth();
  const { logout } = useAuthUpdate();

  const map = useMap().darkMap;

  // States for toggles and filter dropdown
  const [remote, setRemote] = useState(false);
  const [viewType, setViewType] = useState(false); // false for map, true for list
  const [selectedFilters, setSelectedFilters] = useState([
    "Hackers",
    "Developers",
    "Researchers",
  ]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null); // Ref to keep track of the filter dropdown
  const searchInputRef = useRef(null); // Ref for the search input
  const suggestionsRef = useRef(null);
  const searchButtonRef = useRef(null);

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !searchButtonRef.current.contains(event.target)
      ) {
        clearSuggestions();
      }
    });
  }, [filterRef, suggestionsRef]);

  const handleSuggestionClick = (suggestion) => {
    const {
      structured_formatting: { main_text, secondary_text },
    } = suggestion;

    getGeocode({ address: `${main_text} ${secondary_text}` })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log(map);
        if (map) {
          map.flyTo({ center: [lng, lat], zoom: 12.8 }); // Fly to the selected location
        }
        setCoordinates({ lat, lng });
        updateMarkers(
          lat,
          lng,
          selectedFilters.includes("Hackers"),
          selectedFilters.includes("Developers"),
          selectedFilters.includes("Researchers"),
          remote,
        );
      })
      .catch((error) => {
        console.error("Error getting geocode:", error);
      });

    if (secondary_text) setValue(`${main_text} ${secondary_text}`, false);
    if (!secondary_text) setValue(`${main_text}`, false);
    clearSuggestions();
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && data.length > 0) {
      handleSuggestionClick(data[0]); // Select the first suggestion
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion, index) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          className={`cursor-pointer px-2 py-[6px] hover:bg-gray-200 ${
            index === data.length - 1 ? "rounded-bl-3xl rounded-br-3xl" : ""
          }`}
          onClick={() => handleSuggestionClick(suggestion)}
        >
          <span className="text-black">{main_text}</span>{" "}
          <small className="text-gray-700">{secondary_text}</small>
        </li>
      );
    });

  useEffect(() => {
    updateMarkers(
      coordinates.lat,
      coordinates.lng,
      selectedFilters.includes("Hackers"),
      selectedFilters.includes("Developers"),
      selectedFilters.includes("Researchers"),
      remote,
    );
  }, [selectedFilters, remote]);

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

      <div className="ml-6 mr-6 flex flex-grow items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-4/6">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={searchInputRef}
            type="text"
            placeholder="Please Enter the location..."
            className={`focus:border-3 input w-full bg-white text-black focus:border-blue-300 focus:outline-none ${
              status === "OK" ? "rounded-tl-3xl rounded-tr-3xl" : "rounded-3xl"
            }`}
            onKeyDown={handleEnterPress}
          />
          <div ref={searchButtonRef}>
            <IoIosSearch
              onClick={() => {
                if (data.length > 0) {
                  handleSuggestionClick(data[0]);
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-2xl text-gray-500"
            />
          </div>
          {status === "OK" && (
            <ul
              ref={suggestionsRef}
              className="absolute z-20 w-full rounded-bl-3xl rounded-br-3xl bg-white"
            >
              {renderSuggestions()}
            </ul>
          )}
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
            <div className="w-30 absolute left-0 mt-1 rounded-xl bg-black bg-opacity-90 p-2 shadow-lg">
              {["Hackers", "Developers", "Researchers"].map((option) => (
                <label
                  key={option}
                  className="m-1 flex cursor-pointer items-center space-x-2"
                >
                  <input
                    checked={selectedFilters.includes(option)}
                    type="checkbox"
                    onChange={() => {
                      setSelectedFilters(
                        (prevFilters) =>
                          prevFilters.includes(option)
                            ? prevFilters.filter((filter) => filter !== option) // Remove option if it's already selected
                            : [...prevFilters, option], // Add option if it's not already selected
                      );
                    }}
                  />
                  <span className="text-white">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Remote/In-Person Toggle */}
        <div className="form-control flex justify-between">
          <label className="label cursor-pointer">
            <div className="label-text mr-3 w-20 text-center">
              Collaborate Remotely
            </div>
            <input
              type="checkbox"
              className="toggle rounded-full"
              onChange={() => {
                setRemote(!remote);
              }}
            />
          </label>
        </div>

        {/* Map/List Toggle */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <div className="label-text mr-3 w-10 text-center">List View</div>
            <input
              type="checkbox"
              className="toggle rounded-full"
              onChange={() => setViewType(!viewType)}
            />
          </label>
        </div>
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
