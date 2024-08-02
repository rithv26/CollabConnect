import React from "react";

const Avatar = ({image}) => {
  return (
    <div className="avatar">
      <div className="w-10 mr-3 mt-1 rounded-full ring ring-base-100">
        <img src={image} />
      </div>
    </div>
  );
};

export default Avatar;
