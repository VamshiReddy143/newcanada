"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import QuestionForm from './QuestionForm';

const FormModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showThankYouPopup) {
          setShowThankYouPopup(false);
        } else {
          onClose();
        }
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (showThankYouPopup) {
          setShowThankYouPopup(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen || showThankYouPopup) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, showThankYouPopup]);



  // // Uncomment this function to handle form submission
// -------------------------------------------------------------------
  // const handleFormSubmitSuccess = (formData) => {
  //   fetch('/api/submit-question', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         onClose(); // Close the question form modal
  //         setShowThankYouPopup(true); // Show the thank you popup
  //       } else {
  //         console.error('Failed to submit question');
  //       }
  //     })
  //     .catch((error) => console.error('Error:', error));
  // };

  // --------------------------------------------------------------------
  


  // delete or comment this after getting actual end point and uncomment the top one

  // --------------------------------------------------------------------------------------------------
   const handleFormSubmitSuccess = () => {
    onClose(); // Close the question form modal
    setShowThankYouPopup(true); // Show the thank you popup
  };

  //---------------------------------------------------------------------------------------------------

  const handleCloseThankYouPopup = () => {
    setShowThankYouPopup(false);
  };

  if (!isOpen && !showThankYouPopup) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
          <div
            ref={modalRef}
            className="bg-white rounded-lg relative shadow-2xl w-full max-w-3xl mx-4 overflow-hidden transform transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between border-t-7 border-[#0097B2] p-4">

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer absolute top-5 right-5"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-7">
              <QuestionForm onClose={onClose} onSubmitSuccess={handleFormSubmitSuccess} />
            </div>
          </div>
        </div>
      )}

      {showThankYouPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl text-center relative">
            <button
              onClick={handleCloseThankYouPopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h3>
            <p className="text-sm text-gray-600 mb-6 ">
              Your question has been submitted successfully. One of our spokespersons will respond to you soon.
            </p>
            <button
              onClick={handleCloseThankYouPopup}
              className="bg-[#0097B2] text-white py-2 cursor-pointer px-6 rounded-lg hover:bg-[#0097B2] transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;