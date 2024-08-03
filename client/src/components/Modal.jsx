import React, { useState, useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, emailContent, onSendEmail, toWho }) => {
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
      <div className="bg-white bg-opacity-30 p-4 rounded-2xl w-[450px]">
        <h1 className="text-xl ml-2 font-bold mb-4 font-Quicksand">Send Email</h1>
        <textarea
            ref = {textAreaRef}
          className="w-full h-40 text-base font-Montserrat p-2 bg-transparent rounded-md"
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={() => onSendEmail(emailText, toWho)}
          >
            Send
          </button>
          <button
            className="bg-gray-950 text-white px-4 py-2 rounded-md"
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