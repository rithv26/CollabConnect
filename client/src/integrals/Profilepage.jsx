import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Avatar from "../components/Avatar";
import { useAuth, useAuthUpdate } from "../components/AuthContext";
import { useUser } from "../components/UserContext";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import axios from "axios";

export const Profilepage = () => {
  const [hackathons, setHackathons] = useState([""]); // Start with one empty input string
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [isHacker, setIsHacker] = useState(false);
  const [isResearcher, setIsResearcher] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [devpostLink, setDevpostLink] = useState("");
  const [researchProfileLink, setResearchProfileLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [formName, setFormName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [buttonMsg, setButtonMsg] = useState("");
  const [alert, setAlert] = useState("");
  const [isExploding, setIsExploding] = useState(false); // State to control explosion

  const handleButtonClick = () => {
    // Trigger explosion
    setIsExploding(true);

    // Simulate form submission or any action you want to perform
    setTimeout(() => {
      // Reset explosion effect after 3 seconds
      setIsExploding(false);
      console.log("Profile updated successfully!"); // Replace with actual update logic
    }, 3000);
  };

  const { user, getAccessTokenSilently } = useAuth();
  const { logout } = useAuthUpdate();
  const { setCurrentUser } = useUser();

  const locationRef = useRef(null);
  const suggestionsRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const newUser = {
      name: formName,
      email: email,
      description: description,
      timezone: selectedTimeZone,
      location: {
        type: "Point",
        coordinates: [coordinates.lng, coordinates.lat],
      },
      isHacker: isHacker,
      isResearcher: isResearcher,
      isDeveloper: isDeveloper,
      devpostProfile: devpostLink,
      researchProfile: researchProfileLink,
      githubUsername: githubLink,
      previousHackathons: isHacker ? hackathons : [],
      profileCompleted: true,
    };
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: `http://localhost:3000/api`,
      },
    });
    const headers = {
      authorization: `Bearer ${token}`,
    };
    console.log(headers);

    console.log("Updated User Details:", newUser);
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.sub}`,
      newUser, {headers}
    );
    console.log(response);
  };

  const handleRoleSelection = (roleType, isSelected) => {
    switch (roleType) {
      case "hacker":
        setIsHacker(isSelected);
        if (!isSelected) {
          setHackathons([""]);
          setDevpostLink("");
        }
        break;
      case "researcher":
        setIsResearcher(isSelected);
        if (!isSelected) {
          setResearchProfileLink("");
        }
        break;
      case "developer":
        setIsDeveloper(isSelected);
        if (!isSelected) {
          setGithubLink("");
        }
        break;
      default:
        break;
    }
  };

  const handleHackathonChange = (index, event) => {
    const newHackathons = [...hackathons]; // Copy the existing hackathon array
    newHackathons[index] = event.target.value; // Update the value at the specified index
    setHackathons(newHackathons); // Update the state
  };

  const handleAddHackathon = () => {
    setHackathons([...hackathons, ""]); // Add an empty string to the array
  };

  const handleRemoveHackathon = (index) => {
    const newHackathons = [...hackathons];
    newHackathons.splice(index, 1); // Remove the item at the specified index
    setHackathons(newHackathons); // Update the state
  };

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
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        clearSuggestions();
      }
    });
  }, [suggestionsRef]);

  const handleSuggestionClick = (suggestion) => {
    const {
      structured_formatting: { main_text, secondary_text },
    } = suggestion;

    getGeocode({ address: `${main_text} ${secondary_text}` })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setCoordinates({ lat, lng });
      })
      .catch((error) => {
        console.error("Error getting geocode:", error);
      });

    if (secondary_text) setValue(`${main_text}, ${secondary_text}`, false);
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
          className={`cursor-pointer px-2 py-[6px] hover:bg-gray-700 hover:bg-opacity-30 ${
            index === data.length - 1 ? "rounded-bl-3xl rounded-br-3xl" : ""
          }`}
          onClick={() => handleSuggestionClick(suggestion)}
        >
          <span className="text-black">
            {main_text + ", " + secondary_text}
          </span>
        </li>
      );
    });

  const handleChange = (event) => {
    setSelectedTimeZone(event.target.value);
  };

  const timezones = [
    { label: "UTC", offset: "+00:00" },
    { label: "EST", offset: "-05:00" },
    { label: "EDT", offset: "-04:00" },
    { label: "CST", offset: "-06:00" },
    { label: "CDT", offset: "-05:00" },
    { label: "MST", offset: "-07:00" },
    { label: "MDT", offset: "-06:00" },
    { label: "PST", offset: "-08:00" },
    { label: "PDT", offset: "-07:00" },
    { label: "IST", offset: "+05:30" },
    { label: "BST", offset: "+01:00" },
    { label: "CEST", offset: "+02:00" },
    { label: "CET", offset: "+01:00" },
    { label: "AEST", offset: "+10:00" },
    { label: "AEDT", offset: "+11:00" },
    { label: "JST", offset: "+09:00" },
    { label: "NZST", offset: "+12:00" },
    { label: "NZDT", offset: "+13:00" },
    { label: "WET", offset: "+00:00" },
    { label: "WEST", offset: "+01:00" },
    { label: "AKST", offset: "-09:00" },
    { label: "AKDT", offset: "-08:00" },
    { label: "HST", offset: "-10:00" },
    { label: "HDT", offset: "-09:00" },
    { label: "SGT", offset: "+08:00" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: `http://localhost:3000/api`,
          },
        });
        const headers = {
          authorization: `Bearer ${token}`,
        };
        console.log(headers);

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.sub}`,
          { headers },
        );
        const data = response.data;
        setCurrentUser(data);

        if (data.profileCompleted) {
          setAlert("Your profile has been updated");
          setButtonMsg("Update Profile");
          setFormName(data.name);
          setEmail(data.email);
          setDescription(data.description);
          setInfoMessage(
            "Please update whatever details are necessary along with your current location and timezone",
          );
          setIsHacker(data.isHacker);
          setIsResearcher(data.isResearcher);
          setIsDeveloper(data.isDeveloper);
          setHackathons(data.isHacker ? data.previousHackathons : [""]);
          setDevpostLink(data.devpostProfile);
          setResearchProfileLink(data.researchProfile);
          setGithubLink(data.githubUsername);
        } else {
          setAlert("Your profile has been completed");
          setButtonMsg("Complete Profile");
          setInfoMessage(
            "Please complete your profile to become visible to other users",
          );
          setHackathons([""]);
          setIsHacker(false);
          setIsResearcher(false);
          setIsDeveloper(false);
          setDevpostLink("");
          setResearchProfileLink("");
          setGithubLink("");
          setFormName("");
          setEmail("");
          setDescription("");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Fetch user data when the component mounts
  }, [user.sub]); // Ensure the effect re-runs when the user ID changes

  return (
    <div
      data-theme="light"
      className="flex min-h-svh flex-col items-center justify-center overflow-y-auto pb-5"
    >
      <nav
        className="start mt-7 flex h-[72px] items-center justify-between rounded-3xl bg-gray-900 bg-opacity-40 p-2"
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
              className="menu dropdown-content z-[1] mt-4 w-52 rounded-2xl bg-gray-900 bg-opacity-20 p-2 shadow"
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
      <div
        style={{ width: "97%" }}
        className="flex flex-row items-center pb-2 pl-4 pt-9 font-Montserrat text-lg text-black"
      >
        <div className="mr-2 inline-block h-6 w-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
        {infoMessage}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ width: "97%" }}
        className="flex flex-grow flex-col justify-between overflow-y-auto rounded-3xl bg-white bg-opacity-30 p-4"
      >
        <label className="input input-bordered mb-6 flex w-72 items-center gap-4 rounded-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            required
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            type="text"
            className="grow"
            placeholder="Name"
          />
        </label>
        <label className="input input-bordered mb-6 flex w-72 items-center gap-4 rounded-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="grow"
            placeholder="Email"
          />
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="input input-bordered mb-4 h-28 w-full resize-none rounded-3xl pt-2"
          placeholder="Please enter a brief description of yourself..."
        ></textarea>

        <div className="mb-4">
          <label className="label">Are you a Hacker?</label>
          <div className="flex">
            <label className="label mr-2 cursor-pointer">
              <input
                required
                type="radio"
                name="isHacker"
                className="radio"
                onChange={() => handleRoleSelection("hacker", true)}
                checked={isHacker === true}
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="label cursor-pointer">
              <input
                required
                type="radio"
                name="isHacker"
                className="radio"
                onChange={() => handleRoleSelection("hacker", false)}
                checked={isHacker === false}
              />
              <span className="ml-2">No</span>
            </label>
          </div>
          {isHacker && (
            <>
              <input
                required
                type="text"
                placeholder="Enter Devpost/hackathon profile link"
                className="input input-bordered mb-3 block w-[297px]"
                value={devpostLink}
                onChange={(e) => setDevpostLink(e.target.value)}
              />

              <div>
                {hackathons.map((hackathon, index) => (
                  <div key={index} className="mb-2 flex items-center space-x-2">
                    <input
                      required
                      type="text"
                      placeholder="Enter previous hackathons"
                      className="input input-bordered block w-[297px]"
                      value={hackathon}
                      onChange={(event) => handleHackathonChange(index, event)}
                    />
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleAddHackathon()}
                    >
                      ADD
                    </button>
                    {index > 0 && (
                      <button
                        type="button"
                        className="btn btn-error"
                        onClick={() => handleRemoveHackathon(index)}
                      >
                        REMOVE
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Researcher selection */}
        <div className="mb-4">
          <label className="label">Are you a Researcher?</label>
          <div className="flex">
            <label className="label mr-2 cursor-pointer">
              <input
                required
                type="radio"
                name="isResearcher"
                className="radio"
                onChange={() => handleRoleSelection("researcher", true)}
                checked={isResearcher === true}
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="label cursor-pointer">
              <input
                required
                type="radio"
                name="isResearcher"
                className="radio"
                onChange={() => handleRoleSelection("researcher", false)}
                checked={isResearcher === false}
              />
              <span className="ml-2">No</span>
            </label>
          </div>
          {isResearcher && (
            <input
              required
              type="text"
              placeholder="Enter research profile link"
              className="input input-bordered w-[297px]"
              value={researchProfileLink}
              onChange={(e) => setResearchProfileLink(e.target.value)}
            />
          )}
        </div>

        {/* Developer selection */}
        <div className="mb-4">
          <label className="label">Are you a Developer?</label>
          <div className="flex">
            <label className="label mr-2 cursor-pointer">
              <input
                required
                type="radio"
                name="isDeveloper"
                className="radio"
                onChange={() => handleRoleSelection("developer", true)}
                checked={isDeveloper === true}
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="label cursor-pointer">
              <input
                required
                type="radio"
                name="isDeveloper"
                className="radio"
                onChange={() => handleRoleSelection("developer", false)}
                checked={isDeveloper === false}
              />
              <span className="ml-2">No</span>
            </label>
          </div>
          {isDeveloper && (
            <input
              required
              type="text"
              placeholder="Enter GitHub link"
              className="input input-bordered w-[297px]"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          )}
        </div>

        <div className="input input-bordered mb-5 mt-2 flex w-[50%] items-center justify-center rounded-3xl pl-3 text-black">
          <span>Please enter your location:</span>
          <div className="relative flex-grow rounded-3xl">
            <input
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              ref={locationRef}
              type="text"
              className={`input w-full bg-base-100 pl-1 text-black focus:border-none focus:outline-none`}
              onKeyDown={handleEnterPress}
            />

            {status === "OK" && (
              <ul
                ref={suggestionsRef}
                className="absolute z-20 w-full bg-base-100 shadow-lg"
              >
                {renderSuggestions()}
              </ul>
            )}
          </div>
        </div>

        <label>
          <select
            required
            className="select select-bordered mb-6 mt-2 rounded-3xl"
            value={selectedTimeZone}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Timezone
            </option>
            {timezones.map((tz) => (
              <option key={tz.label + tz.offset} value={tz.label}>
                {`${tz.label} (${tz.offset})`}
              </option>
            ))}
          </select>
        </label>

        {isExploding &&
          formName !== "" &&
          email !== "" &&
          description !== "" &&
          selectedTimeZone !== "" &&
          coordinates.lat !== null && (
            <div
              role="alert"
              className="alert alert-success fixed w-80 rounded-lg p-3 shadow-md"
              style={{
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 100000, // Ensures it appears on top
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{alert}</span>
            </div>
          )}

        <button
          type="submit"
          onClick={handleButtonClick}
          className="btn mt-16 w-44 bg-blue-500 font-Quicksand text-base hover:bg-blue-600"
        >
          {buttonMsg}
        </button>
      </form>
    </div>
  );
};

export default Profilepage;
