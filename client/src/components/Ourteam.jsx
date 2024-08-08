import React from "react";
import logo from "../assets/logo.png";
import TypedText from "../components/TypedText";
import { Link } from "react-router-dom";
import { useAuthUpdate } from "../components/AuthContext";
import CustomPopup from "./CustomPopup";

export const Ourteam = () => {
  const { loginWithRedirect } = useAuthUpdate();

  const handleTeamUp = () => {
    console.log("please login first");
  };

  return (
    <div className="min-h-screen w-full bg-gray-950">
      <nav className="mb-0 flex w-full items-center justify-between bg-transparent pb-0 pl-10 pr-10 pt-10">
        <Link to="/">
          <img src={logo} alt="collabconnect" className="h-20 w-auto" />
        </Link>
        <div>
          <Link
            to="/ourteam"
            className="group relative mr-5 rounded-2xl bg-transparent px-4 py-3 font-Montserrat text-base text-white transition-transform duration-300 hover:scale-105"
          >
            Our Team
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-[#b3e6ff] transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
          </Link>

          <button
            onClick={loginWithRedirect}
            className="rounded-2xl border-2 border-solid border-white bg-transparent px-4 py-3 font-Montserrat text-base text-white transition-transform duration-300 hover:scale-105"
          >
            Login/Signup
          </button>
        </div>
      </nav>
      <div className="mb-3 mt-5 text-center font-mono text-[28px] text-white">
        <TypedText content="Meet The Team!" speed={10} />
        <div className="flex flex-row m-16 align-middle items-center justify-center">
          <div className="animate-float mr-7 text-left rounded-xl p-6 w-[26%] inline bg-white">
          <CustomPopup
            className="rounded-xl"
            user={{
              name: "Arnav Aggarwal",
              email: "arnav7@umd.edu",
              description:
                "Hey! I am Arnav Aggarwal and I am a rising Junior at the University of Maryland, College Park.",
              profileCompleted: true,
              isHacker: false,
              isDeveloper: true,
              isResearcher: false,
              timezone: "EST",
              location: {
                type: "Point",
                coordinates: [-76.93776, 38.9896967],
              },
              githubUsername: "https://github.com/arnavaggarwal75",
              createdAt: {
                $date: "2024-08-07T23:46:22.109Z",
              },
              updatedAt: {
                $date: "2024-08-07T23:49:13.326Z",
              },
              __v: 0,
            }}
            onTeamUp={handleTeamUp}
            isProfileComplete={false}
            yourself={false}
            disabledtext="Please create an account"
          />
          </div>
          <div className="animate-float text-left rounded-xl p-6 w-[26%] inline bg-white">
          <CustomPopup
            className="rounded-xl"
            user={{
              name: "Rithvik Singh",
              email: "singhrithvik.dev@gmail.com",
              description:
                "My name is Rithvik Singh and I am a rising Junior at the University of Maryland, College Park.",
              profileCompleted: true,
              isHacker: false,
              isDeveloper: true,
              isResearcher: false,
              timezone: "EST",
              location: {
                type: "Point",
                coordinates: [-76.93776, 38.9896967],
              },
              githubUsername: "https://github.com/RithvikSingh",
              createdAt: {
                $date: "2024-08-07T23:46:22.109Z",
              },
              updatedAt: {
                $date: "2024-08-07T23:49:13.326Z",
              },
              __v: 0,
            }}
            onTeamUp={handleTeamUp}
            isProfileComplete={false}
            yourself={false}
            disabledtext="Please create an account"
          />
          </div>
        </div>
      </div>
    </div>
  );
};
