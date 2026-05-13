"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Award, Eye, X } from "lucide-react";

export default function OurWorkPage() {
  const [activeTab, setActiveTab] = useState("gallery");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Enhanced gallery with categories
  const [galleryImages, setImages] = useState([]); 
  const [completedProjects, setCompletedProjects] = useState([]);

  // ✅ Safe JSON parsing for highlights
  function safeParse(value) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return value ? [value] : [];
    }
  }

  // Fetch Gallery
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/upload", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchImages();
  }, []);

  // Fetch Completed Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/completedProjects", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();

        const formatted = data.map((p) => ({
          ...p,
          highlights: safeParse(p.highlights),
        }));

        setCompletedProjects(formatted);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProjects();
  }, []);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxImage(galleryImages[index]);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % galleryImages.length
        : (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setLightboxImage(galleryImages[newIndex]);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Gradient */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#347d3a] via-[#214293] to-[#347d3a] opacity-90"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-5 rounded-full animate-pulse delay-500"></div>

        <div className="relative container mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-green-200">
              Work
            </span>
          </h1>
          <p className="mt-6 text-xl max-w-4xl mx-auto text-white/90 leading-relaxed">
            Centre for Climate Research and Rural Development (CCRRD) works with communities, educational institutions, governments, CSR partners, and like-minded organizations to drive impactful climate action and rural development across India. We focus on research, education, awareness, and policy support—empowering vulnerable rural communities, fostering scientific temper, conserving the environment, and building resilience for a sustainable future.
          </p>
        </div>
      </section>

      {/* Enhanced Tabs Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-center mb-16">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 border-2 ${
                activeTab === "gallery"
                  ? "bg-[#347d3a] text-white border-[#347d3a] shadow-lg"
                  : "text-[#347d3a] border-[#347d3a] hover:bg-[#347d3a] hover:text-white"
              }`}
            >
              <Eye className="w-5 h-5" />
              Gallery
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 border-2 ${
                activeTab === "projects"
                  ? "bg-[#214293] text-white border-[#214293] shadow-lg"
                  : "text-[#214293] border-[#214293] hover:bg-[#214293] hover:text-white"
              }`}
            >
              <Award className="w-5 h-5" />
              Projects
            </button>
          </div>
        </div>

        {/* Enhanced Gallery */}
        {activeTab === "gallery" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#214293] mb-4">
                Photo Gallery
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Visual stories from our projects and community engagement
                activities
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={`/galleryImages/${image.image}`} // ✅ DB images
                    alt={image.category}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-sm font-medium text-green-300 mb-1">
                      {image.category}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Projects */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#214293] mb-4">
                Completed Projects
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Detailed overview of our major initiatives and their impact on
                communities
              </p>
            </div>

            <div className="space-y-12">
              {completedProjects.map((project, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`grid lg:grid-cols-2 items-center ${
                      index % 2 === 1 ? "lg:grid-cols-2" : ""
                    }`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            project.status === "Completed"
                              ? "bg-green-500 text-white"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 lg:p-12">
                      <h3 className="text-3xl font-bold text-[#214293] mb-4">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-[#347d3a]" />
                          <span className="text-gray-600">{project.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-[#347d3a]" />
                          <span className="text-gray-600">
                            {project.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-[#347d3a]" />
                          <span className="text-gray-600">
                            {project.beneficiaries}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-[#214293] mb-3">
                          Discription
                        </h4>
                        <ul className="space-y-2">
                          {project.highlights.map((highlight, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-gray-600"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-[#347d3a] to-[#214293] rounded-full"></div>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <img
              src={`/galleryImages/${lightboxImage.image}`}
              alt={lightboxImage.category}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <div className="text-green-300 text-sm font-medium">
                {lightboxImage.category}
              </div>
            </div>

            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
