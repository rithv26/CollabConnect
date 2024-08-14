import React, { useState } from "react";
import logo from "../assets/logo.png";
import TypedText from "../components/TypedText";
import { Link } from "react-router-dom";
import { useAuthUpdate } from "../components/AuthContext";
import CustomPopup from "../components/CustomPopup";
import Modal from "../components/Modal";
import axios from "axios";

export const Ourteam = () => {
  const { loginWithRedirect } = useAuthUpdate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTeamUp = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleSendEmail = async (emailText, toEmail) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/connect`, {
        to: [toEmail],
        subject: `Feedback for CollabConnect`,
        text: emailText,
      });
      alert("Feedback sent successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send feedback.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-950">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        emailContent={""}
        onSendEmail={handleSendEmail}
        toWho={"arnavaggarwal907@gmail.com"} // make collab conncect email
        feedback={true}
      />

      <nav className="mb-0 flex w-full items-center justify-between bg-transparent pb-0 pl-10 pr-10 pt-10">
        <Link to="/">
          <img
            src={logo}
            alt="collabconnect"
            className="24inches:h-24 27inches:h-32 h-20 w-auto"
          />
        </Link>
        <div>
          <Link
            to="/ourteam"
            className="24inches:text-2xl 24inches:py-6 27inches:text-4xl 27inches:py-10 group relative mr-9 bg-transparent py-3 font-Montserrat text-base text-white transition-transform duration-300"
          >
            Our Team
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-[#b3e6ff] transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
          </Link>

          <button
            onClick={loginWithRedirect}
            className="24inches:text-2xl 24inches:py-6 24inches:px-7 24inches:rounded-[28px] 27inches:text-4xl 27inches:py-8 27inches:px-9 27inches:rounded-[31px] rounded-2xl border-2 border-solid border-white bg-transparent px-4 py-3 font-Montserrat text-base text-white transition-transform duration-300 hover:scale-105"
          >
            Login/Signup
          </button>
        </div>
      </nav>
      <div className="24inches:text-4xl 27inches:text-5xl 27inches:mt-6 mb-3 mt-5 text-center font-mono text-[28px] text-white">
        <TypedText content="Meet The Team!" speed={10} />
        <div className="24inches:mt-36 27inches:mt-52 m-16 flex flex-row items-center justify-center">
          <div className="animate-float 24inches:w-[450px] 27inches:w-[600px] mr-7 inline w-[374px] rounded-xl bg-white p-6 text-left">
            <CustomPopup
              className="rounded-xl"
              user={{
                name: "Arnav Aggarwal",
                email: "arnav7@umd.edu",
                description:
                  "Hi I am Arnav and I am a rising Junior at the University of Maryland, College Park. My key interests include full-stack software development and AI/ML.",
                isHacker: true,
                previousHackathons: [
                  "2024 Text AI Jam (Winner)",
                  "UMD Bitcamp 2024",
                ],
                devpostProfile: "https://devpost.com/arnavaggarwal75",
                isDeveloper: true,
                isResearcher: false,
                timezone: "EST",
                location: {
                  type: "Point",
                  coordinates: [-76.93776, 38.9896967],
                },
                githubUsername: "https://github.com/arnavaggarwal75",
              }}
              onTeamUp={handleTeamUp}
              isProfileComplete={false}
              yourself={false}
              disabledtext="Send us feedback"
              feedback={true}
            />
          </div>
          <div className="animate-float 24inches:w-[450px] 27inches:w-[600px] inline w-[374px] rounded-xl bg-white p-6 text-left">
            <CustomPopup
              className="rounded-xl"
              user={{
                name: "Rithvik Singh",
                email: "singhrithvik.dev@gmail.com",
                description:
                  "My name is Rithvik Singh and I am a rising Junior at the University of Maryland, College Park.",
                isHacker: false,
                isDeveloper: true,
                isResearcher: false,
                timezone: "EST",
                location: {
                  type: "Point",
                  coordinates: [-76.93776, 38.9896967],
                },
                githubUsername: "https://github.com/RithvikSingh",
              }}
              onTeamUp={handleTeamUp}
              isProfileComplete={false}
              yourself={false}
              disabledtext="Send us feedback"
              feedback={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
