import React, { useState, useEffect, useRef } from "react";

const Modal = ({
  isOpen,
  onClose,
  emailContent,
  onSendEmail,
  toWho,
  feedback = false,
}) => {
  const [emailText, setEmailText] = useState(emailContent);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setEmailText(emailContent);
      if (textAreaRef.current) textAreaRef.current.focus();
    }
  }, [isOpen, emailContent]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="w-[450px] rounded-2xl bg-black bg-opacity-80 p-4">
        <h1 className="mb-4 ml-2 font-Quicksand text-xl font-bold">
          {feedback ? "Feedback" : "Send Email"}
        </h1>
        <textarea
          ref={textAreaRef}
          className="h-40 w-full rounded-md bg-transparent p-2 font-Montserrat text-base"
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button
            className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white"
            onClick={() => onSendEmail(emailText, toWho)}
          >
            Send
          </button>
          <button
            className="rounded-md bg-gray-950 px-4 py-2 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
