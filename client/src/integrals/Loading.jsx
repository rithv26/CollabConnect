import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-950">
      <ColorRing
        colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
        width="60"
        height="60"
        color="#000000"
      />
    </div>
  );
};

export default Loading;
