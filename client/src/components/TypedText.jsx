import React from "react";
import Typewriter from "typewriter-effect";

function TypedText({ content, speed, onComplete }) {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString(content)
          .callFunction(() => {
            if (onComplete) onComplete();
          })
          .start();
      }}
      options={{
        delay: speed, 
        cursor: '',
      }}
    />
  );
}

export default TypedText;
