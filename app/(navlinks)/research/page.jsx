"use client";
import { useState,useEffect } from "react";
import { Calendar, Users, Lightbulb, ArrowRight, Clock, MapPin, Target, X, Mail, User, GraduationCap, Phone, FileText } from "lucide-react";

export default function ResearchPage() {
  const [projects,setProject] = useState([])
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    projectName: '',
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    university: '',
    experience: '',
    motivation: '',
    availability: ''
  });
  const [loading, setLoading] = useState(false);
const [popupMessage, setPopupMessage] = useState(null);

   useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching Projects:", error);
      }
    };
    fetchProjects();
  }, []);


  const handleApplyClick = (project) => {
    setSelectedProject(project);
    setFormData(prev => ({
      ...prev,
      projectName: project.title
    }));
    setShowApplicationForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setPopupMessage(null);

  try {
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setPopupMessage("Thank you for your application! The CCRD team will contact you shortly.");
      setShowApplicationForm(false);
      setFormData({
        projectName: '',
        fullName: '',
        email: '',
        phone: '',
        qualification: '',
        university: '',
        experience: '',
        motivation: '',
        availability: ''
      });
    } else {
      setPopupMessage("⚠️ Failed to submit application. Please try again.");
    }
  } catch (error) {
    console.error("Submission error:", error);
    setPopupMessage("❌ Error submitting application. Please try again later.");
  } finally {
    setLoading(false);
  }
};



  const closeModal = () => {
    setShowApplicationForm(false);
    setSelectedProject(null);
  };


  const stats = [
    { label: "Active Research Projects", value: "15+", icon: Lightbulb },
    { label: "Research Partners", value: "50+", icon: Users },
    { label: "Countries Involved", value: "12", icon: MapPin },
    { label: "Years of Impact", value: "8", icon: Target }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Gradient */}
      <section className="relative py-24 text-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #214293 0%, #1a3575 100%)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-400">Research</span>
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto text-blue-100 leading-relaxed">
            Discover our cutting-edge research initiatives and join a global community 
            of scientists working to solve tomorrow's environmental challenges today.
          </p>
        </div>
      </section>

      {/* Upcoming Projects */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Upcoming Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our interdisciplinary research teams and contribute to projects 
              that will shape the future of environmental sustainability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                {/* Project Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          {project.category}
                        </span>
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          project.status === 'Open for Applications' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    </div>
                  </div>

                  {/* Project Meta Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-purple-600" />
                      <span>{project.participants} researchers</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-red-600" />
                      <span>Apply by {new Date(project.applyDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}</span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Project Overview:</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{project.details}</p>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleApplyClick(project)}
                        className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
                      >
                        <span className="flex items-center justify-center">
                          Apply Now
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl">
            {/* Modal Header - Fixed */}
            <div className="sticky top-0 bg-white rounded-t-2xl flex items-center justify-between p-6 border-b border-gray-200 shadow-sm z-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Research Application</h3>
                <p className="text-gray-600 mt-1">Apply for: {selectedProject?.title}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-6">
                {/* Project Name (Auto-filled) */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Target className="w-4 h-4 inline mr-2" />
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium"
                  />
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Contact & Education */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <GraduationCap className="w-4 h-4 inline mr-2" />
                      Highest Qualification *
                    </label>
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select qualification</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Postdoc">Postdoc</option>
                      <option value="Professional Certificate">Professional Certificate</option>
                    </select>
                  </div>
                </div>

                {/* University/Institution */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Current University/Institution *
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your current institution"
                  />
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Relevant Experience *
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your relevant research experience, skills, and background..."
                  />
                </div>

                {/* Motivation */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Lightbulb className="w-4 h-4 inline mr-2" />
                    Why do you want to join this project? *
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Explain your motivation and what you hope to contribute to this research project..."
                  />
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Availability *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select availability</option>
                    <option value="Full-time">Full-time (40+ hours/week)</option>
                    <option value="Part-time">Part-time (20-30 hours/week)</option>
                    <option value="Flexible">Flexible (10-20 hours/week)</option>
                    <option value="Weekends">Weekends only</option>
                    <option value="Remote">Remote collaboration</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Form Actions - Fixed at bottom */}
            <div className="sticky bottom-0 bg-white rounded-b-2xl flex flex-col sm:flex-row gap-4 p-6 border-t border-gray-200 shadow-sm">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            <button
  type="submit"
  disabled={loading}
  onClick={handleSubmit}
  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center justify-center"
>
  {loading ? (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
  ) : (
    "Submit Application"
  )}
</button>

            </div>
          </div>
        </div>
      )}{/* Popup Notification */}
{popupMessage && (
  <div className="fixed inset-0 flex items-center justify-center z-[9999]">
    <div className="bg-white shadow-xl rounded-xl p-6 max-w-sm text-center border border-gray-200">
      <p className="text-gray-800 font-medium">{popupMessage}</p>
      <button
        onClick={() => setPopupMessage(null)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        OK
      </button>
    </div>
  </div>
)}

    </div>
  );
}