"use client";

import { Gift, HandHeart, Lightbulb, Mic, ArrowRight, X, Router } from "lucide-react";
import { useState } from "react";

export default function GetInvolvedPage() {
  const [showModal, setShowModal] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleModalOpen = (type) => {
    setShowModal(type);
  };

  const handleModalClose = () => {
    setShowModal(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      type: showModal,
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      extraFields: {},
    };

    if (showModal === "volunteer") {
      data.extraFields.education = formData.get("education");
    } else if (showModal === "contribute") {
      data.extraFields.organization = formData.get("organization");
      data.extraFields.partnershipType = formData.get("partnershipType");
      data.extraFields.projectDetails = formData.get("projectDetails");
    } else if (showModal === "voice") {
      data.extraFields.idea = formData.get("idea");
      data.extraFields.category = formData.get("category");
      data.extraFields.impact = formData.get("impact");
    }

    try {
      const res = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setShowModal(null);
        setPopupMessage("Thank you for getting involved! Our team will reach out to you shortly.");
        setShowPopup(true);
      } else {
        setPopupMessage("Error: " + result.error);
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setPopupMessage("Something went wrong. Please try again.");
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const involvementOptions = [
    {
  icon: Gift,
  title: "Donate",
  description:
    "Your financial support helps us fund critical research, implement projects, and empower communities. Every contribution, big or small, makes a significant impact.",
  buttonText: "Make a Donation",
  link: "https://rzp.io/rzp/Ef4HgSgF" // add your Razorpay payment link here
},

    {
      icon: HandHeart,
      title: "Volunteer Registration",
      description:
        "Join our team as a volunteer and contribute to our projects on climate research, rural development, awareness campaigns, and conservation efforts. Whether you’re a student, professional, or community member — your skills and passion are welcome.",
      buttonText: "Become a Volunteer",
    },
    {
      icon: Lightbulb,
      title: "Contribute With Us",
      description:
        "We welcome collaborations with corporates, institutions, and NGOs who share our vision of climate action and sustainable development. Together we can amplify our impact, reach more communities, and create lasting change.",
      buttonText: "Partner With Us",
    },
    {
      icon: Mic,
      title: "Voice 4 Planet",
      description:
        "Your voice matters. Through our Voice 4 Planet initiative, we collect innovative ideas, community insights, and creative solutions from people like you — helping shape our work and amplify collective action.",
      buttonText: "Share Your Idea",
    },
  ];

  return (
    <div className="bg-white">
      <style jsx>{`
        /* Custom scrollbar styles */
        .modal-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .modal-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .modal-scrollbar::-webkit-scrollbar-thumb {
          background: #214293;
          border-radius: 3px;
        }
        
        .modal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1a3670;
        }
      `}</style>
      {/* Hero Section */}
      <section 
        className="py-20 text-center"
        style={{ 
          background: `linear-gradient(135deg, #214293 0%, #347d3a 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Get Involved
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">
            Your contribution helps us fund research, education, disaster preparedness, and rural sustainability initiatives. Every rupee you give strengthens our ability to serve vulnerable communities and protect the environment
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {involvementOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl flex flex-col border border-gray-200"
              >
                {/* Card Header */}
                <div className="flex items-start gap-4 p-6">
                  <div 
                    className="p-3 rounded-full" 
                    style={{ backgroundColor: '#347d3a20' }}
                  >
                    <option.icon 
                      className="h-8 w-8" 
                      style={{ color: '#347d3a' }}
                    />
                  </div>
                  <div>
                    <h2 
                      className="text-2xl font-semibold"
                      style={{ color: '#214293' }}
                    >
                      {option.title}
                    </h2>
                    <p 
                      className="text-sm mt-1"
                      style={{ color: '#347d3a' }}
                    >
                      Engage with CCRRD
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-grow px-6 pb-4">
                  <p className="text-gray-600">{option.description}</p>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0">
                  <button 
                    className="w-full flex items-center justify-center gap-2 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
                    style={{ backgroundColor: '#214293' }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#1a3670';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#214293';
                    }}
                    onClick={() => {
                      if (option.title === "Volunteer Registration") {
                        handleModalOpen('volunteer');
                      } else if (option.title === "Contribute With Us") {
                        handleModalOpen('contribute');
                      } else if (option.title === "Voice 4 Planet") {
                        handleModalOpen('voice');
                      }else{ window.location.href = 'https://rzp.io/rzp/Ef4HgSgF';}
                    }}
                  >
                    {option.buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Overlays */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div 
              className="p-6 border-b flex justify-between items-center flex-shrink-0"
              style={{ backgroundColor: '#214293' }}
            >
              <h3 className="text-xl font-semibold text-white">
                {showModal === 'volunteer' && 'Volunteer Registration'}
                {showModal === 'contribute' && 'Partnership Registration'}
                {showModal === 'voice' && 'Voice 4 Planet'}
              </h3>
              <button 
                onClick={handleModalClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 modal-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Common Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input type="text" name="fullName" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input type="tel" name="phone" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location/Place *
                  </label>
                  <input type="text" name="location" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>

                {/* Volunteer Fields */}
                {showModal === 'volunteer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Educational Background *
                    </label>
                    <select name="education" required className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="">Select your education level</option>
                      <option value="high-school">High School</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}

                {/* Contribute Fields */}
                {showModal === 'contribute' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organization/Company Name *
                      </label>
                      <input type="text" name="organization" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Partnership Type *
                      </label>
                      <select name="partnershipType" required className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select partnership type</option>
                        <option value="research">Research Collaboration</option>
                        <option value="event">Event Partnership</option>
                        <option value="corporate">Corporate Sponsorship</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Details
                      </label>
                      <textarea name="projectDetails" rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </>
                )}

                {/* Voice Fields */}
                {showModal === 'voice' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Voice/Idea *
                      </label>
                      <textarea name="idea" required rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category of Interest
                      </label>
                      <select name="category" className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select a category</option>
                        <option value="climate">Climate Action</option>
                        <option value="sustainability">Sustainability</option>
                        <option value="community">Community Development</option>
                        <option value="research">Research & Development</option>
                        <option value="education">Environmental Education</option>
                        <option value="policy">Policy & Advocacy</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        How can this idea create impact?
                      </label>
                      <textarea name="impact" rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </>
                )}

                {/* Modal Footer */}
                <div className="pt-6 border-t bg-gray-50 flex gap-3 flex-shrink-0 -mx-6 -mb-6 px-6 pb-6">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#347d3a' }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
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
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center">
            <h3 className="text-xl font-bold text-green-700 mb-4">Form Submitted</h3>
            <p className="text-gray-700">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
