import React from "react";
import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import * as THREE from "three";
import * as topojson from "topojson-client";
import landTopology from "../assets/land_10m.json";
import Globe from "react-globe.gl";
import { useAuthUpdate } from "../components/AuthContext";
import logo from "../assets/logo.png";
import TypedText from "../components/TypedText";
import Loading from "./Loading";

const GlobePage = () => {
  const globeRef = useRef(null);
  const { loginWithRedirect } = useAuthUpdate();
  const [userLocations, setUserLocations] = useState([]);
  const [arcsData, setArcsData] = useState([]);
  const [showSecondText, setShowSecondText] = useState(false);
  const [isGlobeReady, setIsGlobeReady] = useState(true);

  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/globe`,
        );
        setUserLocations(response.data);
        const arcs = generateRandomArcs(response.data);
        setArcsData(arcs);
        setIsGlobeReady(true); // Set ready after data and globe setup
      } catch (error) {
        console.error("Error fetching user locations:", error);
      }
    };
    fetchUserLocations();
  }, []);

  const globeReady = () => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().enableZoom = false;

      globeRef.current.pointOfView({
        lat: 19.054339351561637,
        lng: -50.421161072148465,
        altitude: 1.8,
      });
      setIsGlobeReady(true);
    }
  };

  const generateRandomArcs = (locations) => {
    const min = 1000;
    const max = 4000;
    const numArcs = Math.min(locations.length, 30); // Adjust the number of arcs as needed

    const sliceData = locations
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .slice(0, numArcs);

    const arcs = sliceData.map(() => {
      const randStart = Math.floor(Math.random() * sliceData.length);
      const randEnd = Math.floor(Math.random() * sliceData.length);
      const randTime = Math.floor(Math.random() * (max - min + 1) + min);
      return {
        startLat: sliceData[randStart].latitude,
        startLng: sliceData[randStart].longitude,
        endLat: sliceData[randEnd].latitude,
        endLng: sliceData[randEnd].longitude,
        time: randTime,
        color: ["#FFFFFF", "#FFFFFF"],
      };
    });
    console.log(arcs);
    return arcs;
  };

  const memoizedGlobe = useMemo(
    () => (
      <Globe
        height={550}
        ref={globeRef}
        onGlobeReady={globeReady}
        backgroundColor="#00000000"
        globeMaterial={
          new THREE.MeshPhongMaterial({
            color: "#111522",
            transparent: false,
          })
        }
        atmosphereColor={"#FFFFFF"}
        atmosphereAltitude={0.13}
        pointsData={userLocations.map(({ latitude, longitude }) => ({
          lat: latitude,
          lng: longitude,
        }))}
        pointAltitude={0.01}
        pointRadius={0.4}
        pointResolution={10}
        pointColor={() => "#001a66"}
        polygonsData={
          topojson.feature(landTopology, landTopology.objects.land).features
        }
        polygonSideColor={() => "#00000000"}
        polygonCapMaterial={
          new THREE.MeshPhongMaterial({
            color: "#b3e6ff",
            side: THREE.DoubleSide,
          })
        }
        polygonAltitude={0.01}
        arcsData={arcsData}
        arcAltitudeAutoScale={0.3}
        arcColor="color"
        arcStroke={0.5}
        arcDashGap={2}
        arcDashAnimateTime="time"
      />
    ),
    [userLocations],
  );

  if (!isGlobeReady) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-950">
      <nav className="mb-0 flex w-full items-center justify-between bg-transparent pb-0 pl-10 pr-10 pt-10">
        <Link to="/">
          <img src={logo} alt="collabconnect" className="h-20 w-auto" />
        </Link>
        <div>
          <Link
            to="/ourteam"
            className="group relative mr-9 bg-transparent py-3 font-Montserrat text-base text-white transition-transform duration-300"
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
      <div className="m-0 cursor-move">{memoizedGlobe}</div>
      <div className="m-0 cursor-move"></div>
      <div className="mb-3 mt-5 text-center font-Quicksand text-3xl font-bold text-white">
        <TypedText
          content="Join us today & make your mark above!"
          speed={50}
          onComplete={() => setShowSecondText(true)}
        />
      </div>
      {showSecondText && (
        <div className="text-center font-mono text-xl text-white">
          <TypedText
            content="Discover like-minded peers and start building the future together"
            speed={20}
            onComplete={() => setShowSecondText(true)}
          />
        </div>
      )}
    </div>
  );
};

export default GlobePage;
