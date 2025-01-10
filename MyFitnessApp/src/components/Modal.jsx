import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  // If the modal is not open, return null to render nothing
  if (!isOpen) return null;

  return (
    // Modal overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        {/* Modal children content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
