import React from "react";

const CustomPopup = ({ user, onTeamUp, isProfileComplete, yourself, feedback=false, disabledtext="Please complete your profile to team up" }) => {
  const badgeColor = "#b3e6ff"; // Same blue color as the markers

  return (
    <div className="h-full w-full p-0 font-Quicksand text-sm 27inches:text-xl text-black">
        {yourself && (
          <div
            className="27inches:text-xl w-full rounded-2xl underline font-Montserrat text-left mb-2 text-base font-extrabold text-black"
          >
            YOUR PROFILE:
          </div>
        )}
      <div className="mb-2 flex flex-wrap gap-1">
        {user.isHacker && (
          <div
            className="27inches:text-xl badge badge-secondary h-5 w-auto rounded-2xl text-sm font-extrabold text-black"
            style={{ backgroundColor: badgeColor }}
          >
            Hacker
          </div>
        )}
        {user.isDeveloper && (
          <div
            className="27inches:text-xl badge badge-secondary h-5 w-auto rounded-2xl text-sm font-extrabold text-black"
            style={{ backgroundColor: badgeColor }}
          >
            Developer
          </div>
        )}
        {user.isResearcher && (
          <div
            className="27inches:text-xl badge badge-secondary h-5 w-auto rounded-2xl text-sm font-extrabold text-black"
            style={{ backgroundColor: badgeColor }}
          >
            Researcher
          </div>
        )}
      </div>
      <div className="mb-2">
        <h3 className="27inches:text-xl text-lg font-bold">{user.name}</h3>
        <p className="27inches:text-xl text-sm">- {user.email}</p>
        <p className="27inches:text-xl text-sm text-gray-700">- {user.description}</p>
      </div>
      {user.isHacker && (
        <div className="mt-2">
          <h4 className="27inches:text-xl text-lg font-semibold">Previous Hackathons</h4>
          <ul className="27inches:text-xl mb-1 list-inside list-disc text-sm">
            {user.previousHackathons.map((hackathon, index) => (
              <li key={index}>{hackathon}</li>
            ))}
          </ul>
          <a
            href={user.devpostProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="27inches:text-xl ml-5 text-sm text-blue-500 underline"
          >
            Devpost Profile
          </a>
        </div>
      )}
      {user.isResearcher && (
        <div className="mt-2">
          <h4 className="font-semibold">Experience</h4>
          <a
            href={user.researchProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="27inches:text-xl text-sm text-blue-500 underline"
          >
            Research Profile Link
          </a>
        </div>
      )}
      {user.isDeveloper && (
        <div className="mt-2">
          <h4 className="font-semibold">Projects</h4>
          <a
            href={user.githubUsername}
            target="_blank"
            rel="noopener noreferrer"
            className="27inches:text-xl text-sm text-blue-500 underline"
          >
            GitHub Profile
          </a>
        </div>
      )}
      <div className="mt-2">
        <span className="27inches:text-xl text-sm font-bold">Timezone: {user.timezone}</span>
      </div>

      {!yourself && (
        <button
          onClick={() => {
            if (isProfileComplete || feedback) onTeamUp();
          }}
          style={{ backgroundColor: badgeColor }}
          className={`27inches:text-2xl btn btn-primary mt-2 block w-full rounded-xl text-lg text-black ${
            (!isProfileComplete && !feedback) ? "cursor-not-allowed text-sm opacity-50" : ""
          }`}
        >
          {isProfileComplete
            ? "Team Up"
            : disabledtext}
        </button>
      )}
    </div>
  );
};

export default CustomPopup;
