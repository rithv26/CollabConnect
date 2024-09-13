import React, { useState } from "react";
import TypedText from "../components/TypedText";
import { useAuthUpdate } from "../components/AuthContext";
import CustomPopup from "../components/CustomPopup";
import Modal from "../components/Modal";
import axios from "axios";
import Navbar from "../components/Navbar";

export const Ourteam = () => {
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
      <Navbar/>
      <div className="24inches:text-4xl 27inches:text-5xl 27inches:mt-6 mb-3 mt-5 text-center font-mono text-[28px] text-white">
        <TypedText content="Meet The Team!" speed={10} />
        <div className="24inches:mt-36 27inches:mt-52 m-16 flex flex-row items-center justify-center">
          <div className="animate-float 24inches:w-[450px] 27inches:w-[600px] mr-7 inline w-[374px] rounded-xl bg-white p-6 text-left">
            <CustomPopup
              className="rounded-xl"
              user={{
                imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQH8hu8-YT587Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724617821997?e=1731542400&v=beta&t=b5AAlyD-EIBZ3HdD2ea90ZFVGy5ol2ZnAbpFj1jZ9UA",
                name: "Arnav Aggarwal",
                email: "arnav7@umd.edu",
                description:
                  "I am a rising junior at the University of Maryland-College Park, currently majoring in Computer Science with a minor in Mathematics. I'm passionate about full-stack software development and currently exploring cloud computing and LLM applications, with a growing interest in Golang and mobile app development.",
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
                imageUrl: "https://media.licdn.com/dms/image/v2/D4D03AQFfyZJ1FLN_WA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724037612591?e=1731542400&v=beta&t=dzWDXNpeRDCtl0Jgnb6jOHTzmWDD0s0JD818qVfMpUo",
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
