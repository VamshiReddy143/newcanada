import React, { useState } from 'react';

const QuestionForm = ({ onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    postalCode: '',
    email: '',
    question: '',
    isOver16: false, // Separate state for over 16 checkbox
    isUnder16: false, // Separate state for under 16 checkbox
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      // Handle checkbox changes independently
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        // If one is checked, uncheck the other to maintain mutual exclusivity
        ...(name === 'isOver16' && checked ? { isUnder16: false } : {}),
        ...(name === 'isUnder16' && checked ? { isOver16: false } : {}),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal Code is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.question.trim()) newErrors.question = 'Question is required';
    if (!formData.isOver16 && !formData.isUnder16) newErrors.age = 'Please select an age option';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Prepare data for Engaging Networks
    const submissionData = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Postcode: formData.postalCode,
      EmailAddress: formData.email,
      CriticalDistanceQuestion: formData.question,
      AcceptsEmail: formData.isOver16 ? 'Y' : undefined,
      CriticalDistanceUnder16: formData.isUnder16 ? 'Y' : undefined,
    };

    // Simulate submission without backend
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        postalCode: '',
        email: '',
        question: '',
        isOver16: false,
        isUnder16: false,
      });
      setIsSubmitting(false);
      onSubmitSuccess(submissionData);
    }, 1000);
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-xl w-full font-sans">
        <h2 className="text-3xl font-bold text-[#0097B2] mb-10 text-center tracking-tight">
          Ask us your questions and we'll write back!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 shadow-sm transition-all duration-200 focus:border-[#0097B2] focus:ring-2 focus:outline-none focus:ring-[#0097B2] focus:ring-opacity-50 ${
                  errors.firstName ? 'border-red-400' : ''
                }`}
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 shadow-sm transition-all duration-200 focus:border-[#0097B2] focus:ring-2 focus:outline-none focus:ring-[#0097B2] focus:ring-opacity-50 ${
                  errors.lastName ? 'border-red-400' : ''
                }`}
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-800">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 shadow-sm transition-all duration-200 focus:border-[#0097B2] focus:ring-2 focus:outline-none focus:ring-[#0097B2] focus:ring-opacity-50 ${
                  errors.postalCode ? 'border-red-400' : ''
                }`}
                placeholder="Postal code"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.postalCode}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 shadow-sm transition-all duration-200 focus:border-[#0097B2] focus:ring-2 focus:outline-none focus:ring-[#0097B2] focus:ring-opacity-50 ${
                  errors.email ? 'border-red-400' : ''
                }`}
                placeholder="Your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-800">
              Your Question
            </label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              rows={4}
              className={`mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 shadow-sm transition-all duration-200 focus:border-[#0097B2] focus:ring-2 focus:outline-none focus:ring-[#0097B2] focus:ring-opacity-50 ${
                errors.question ? 'border-red-400' : ''
              }`}
              placeholder="Type your question here..."
            ></textarea>
            {errors.question && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.question}
              </p>
            )}
          </div>
          {/* Updated Age Confirmation Section */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Age Confirmation
            </label>
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="over16"
                  name="isOver16"
                  checked={formData.isOver16}
                  onChange={handleChange}
                  className="h-5 w-5 text-teal-600 cursor-pointer focus:ring-[#0097B2] border-gray-300 rounded mt-0.5"
                />
                <label htmlFor="over16" className="ml-2 block text-[15px] text-gray-800 w-[calc(100%-2rem)]">
                  <span className="inline-block w-full">
                    I am over 16 and wish to subscribe to the newsletter
                  </span>
                  {formData.isOver16 && (
                    <p className="text-[14px] font-normal text-[#50B8E7] mt-1 w-full">
                      Nature Canada can email me with the answer to my question and other opportunities and information about protecting nature.
                    </p>
                  )}
                </label>
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="under16"
                  name="isUnder16"
                  checked={formData.isUnder16}
                  onChange={handleChange}
                  className="h-5 w-5 text-teal-600  cursor-pointer focus:ring-[#0097B2] border-gray-300 rounded mt-0.5"
                />
                <label htmlFor="under16" className="ml-2 block text-[16px] text-gray-800 w-[calc(100%-2rem)]">
                  <span className="inline-block w-full">
                    I’m under 16…
                  </span>
                  {formData.isUnder16 && (
                    <p className="text-[14px] font-normal text-[#50B8E7] mt-1 w-full">
                      Nature Canada can email me with the answer to my question.
                    </p>
                  )}
                </label>
              </div>
            </div>
            {errors.age && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.age}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-[#0097B2] to-[#0097B2] text-white py-3 px-4 rounded-lg shadow-md hover:from-[#0097B2] hover:to-[#0097B2] transition-all duration-300 flex items-center justify-center ${
              isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;