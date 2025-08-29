import React from "react";

const CustomPopup = ({
  user,
  onTeamUp,
  isProfileComplete,
  yourself,
  feedback = false,
  disabledtext = "Please complete your profile to team up",
}) => {
  const badgeColor = "#b3e6ff"; // Same blue color as the markers

  return (
    <div className="h-full w-full p-0 font-Quicksand text-sm text-black 27inches:text-xl">
      {yourself && (
        <div className="mb-2 w-full rounded-2xl text-left font-Montserrat text-base font-extrabold text-black underline 27inches:text-xl">
          YOUR PROFILE:
        </div>
      )}
      <div className="mb-2 flex flex-wrap gap-1">
        {user.isHacker && (
          <div
            className="badge badge-secondary h-5 w-auto rounded-2xl text-sm font-extrabold text-black 27inches:text-xl"
            style={{ backgroundColor: badgeColor }}
          >
            Hacker
          </div>
        )}
        {user.isDeveloper && (
          <div
            className="badge badge-secondary h-5 w-auto rounded-2xl text-sm font-extrabold text-black 27inches:text-xl"
            style={{ backgroundColor: badgeColor }}
          >
            Developer
          </div>
        )}
        {user.isResearcher && (
          <div
            className="badge badge-secondary h-5 w-auto rounded-2xl text-sm font-extrabold text-black 27inches:text-xl"
            style={{ backgroundColor: badgeColor }}
          >
            Researcher
          </div>
        )}
      </div>

      {user.imageUrl && (
        <div className="mb-4 flex w-full justify-center">
          <img
            src={user.imageUrl}
            alt={`${user.name}'s profile`}
            className="h-24 w-24 rounded-full border-2 border-black"
          />
        </div>
      )}

      <div className="mb-2">
        <h3 className="text-lg font-bold 27inches:text-xl">{user.name}</h3>
        <p className="text-sm 27inches:text-xl">- {user.email}</p>
        <p className="text-sm 27inches:text-xl">- {user.description}</p>
      </div>
      {user.isHacker && (
        <div className="mt-2">
          <h4 className="text-lg font-semibold 27inches:text-xl">
            Previous Hackathons
          </h4>
          <ul className="mb-1 list-inside list-disc text-sm 27inches:text-xl">
            {user.previousHackathons.map((hackathon, index) => (
              <li key={index}>{hackathon}</li>
            ))}
          </ul>
          <a
            href={user.devpostProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-5 text-sm text-blue-500 underline 27inches:text-xl"
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
            className="text-sm text-blue-500 underline 27inches:text-xl"
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
            className="text-sm text-blue-500 underline 27inches:text-xl"
          >
            GitHub Profile
          </a>
        </div>
      )}
      <div className="mt-2">
        <span className="text-sm font-bold 27inches:text-xl">
          Timezone: {user.timezone}
        </span>
      </div>

      {!yourself && (
        <button
          onClick={() => {
            if (isProfileComplete || feedback) onTeamUp();
          }}
          style={{ backgroundColor: badgeColor }}
          className={`btn btn-primary mt-2 block w-full rounded-xl text-lg text-black 27inches:text-2xl ${
            !isProfileComplete && !feedback
              ? "cursor-not-allowed text-sm opacity-50"
              : ""
          }`}
        >
          {isProfileComplete ? "Team Up" : disabledtext}
        </button>
      )}
    </div>
  );
};

export default CustomPopup;
