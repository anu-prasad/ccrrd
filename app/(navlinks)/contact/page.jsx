"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false); // 🔹 added loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start spinner
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ name: "", email: "", message: "" });
        setStatus(
          "Thank you for your message. The CCRD team will contact you shortly."
        );
        setShowPopup(true); // show popup on success
      } else {
        const data = await res.json();
        setStatus(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // stop spinner
    }
  };

  return (
    <div className="bg-white text-black">
      {/* Hero Section with Gradient */}
      <section
        className="py-20 text-center"
        style={{
          background: `linear-gradient(135deg, #214293 0%, #347d3a 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Contact Us
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">
            We'd love to hear from you. Reach out with questions, ideas, or
            partnership inquiries.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Side Info */}
            <div className="space-y-8">
              <div>
                <h2
                  className="text-3xl font-bold"
                  style={{ color: "#214293" }}
                >
                  Get in Touch
                </h2>
                <p className="mt-2 text-gray-600">
                  Find our office, send us an email, or give us a call. We're
                  here to help and collaborate.
                </p>
              </div>
              <div className="space-y-6">
                <div
                  className="p-4 rounded-lg border-l-4"
                  style={{
                    borderLeftColor: "#347d3a",
                    backgroundColor: "#347d3a08",
                  }}
                >
                  <h3
                    className="font-semibold text-lg"
                    style={{ color: "#214293" }}
                  >
                    Office
                  </h3>
                  <p className="text-gray-600 mt-1">+91 9557474629</p>
                </div>
                <div
                  className="p-4 rounded-lg border-l-4"
                  style={{
                    borderLeftColor: "#347d3a",
                    backgroundColor: "#347d3a08",
                  }}
                >
                  <h3
                    className="font-semibold text-lg"
                    style={{ color: "#214293" }}
                  >
                    Email Us
                  </h3>
                  <a
                    href="mailto:info@ccrrd.org"
                    className="text-gray-600 hover:underline transition-colors mt-1 block"
                    style={{ color: "#347d3a" }}
                  >
                    info@ccrrd.org
                  </a>
                </div>
                <div
                  className="p-4 rounded-lg border-l-4"
                  style={{
                    borderLeftColor: "#347d3a",
                    backgroundColor: "#347d3a08",
                  }}
                >
                  <h3
                    className="font-semibold text-lg"
                    style={{ color: "#214293" }}
                  >
                    Call Us
                  </h3>
                  <a
                    href="tel:+918848091303"
                    className="text-gray-600 hover:underline transition-colors mt-1 block"
                    style={{ color: "#347d3a" }}
                  >
                    +91 8848091303
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: "#214293" }}
              >
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 text-white py-3 px-6 rounded-lg font-medium text-lg shadow-md transition disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#347d3a" }}
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
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              Message Sent
            </h3>
            <p className="text-gray-700">{status}</p>
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
