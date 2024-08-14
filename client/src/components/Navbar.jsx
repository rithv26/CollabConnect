import React from "react";
import { useAuthUpdate } from "../components/AuthContext";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { loginWithRedirect } = useAuthUpdate();

  return (
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
          className="24inches:text-2xl 24inches:py-6 24inches:px-7 24inches:rounded-[28px] 27inches:text-4xl 27inches:py-7 27inches:px-7 27inches:rounded-[31px] rounded-2xl border-2 border-solid border-white bg-transparent px-4 py-3 font-Montserrat text-base text-white transition-transform duration-300 hover:scale-105"
        >
          Login/Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
