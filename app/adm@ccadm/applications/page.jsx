"use client";
import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/apply");
        const data = await res.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-lg font-medium">Loading applications...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Applications</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 sticky top-0">
              <th className="p-4">SlNo.</th>
              <th className="p-4">Project Name</th>
              <th className="p-4">Applicant Name</th>
              <th className="p-4">Email ID</th>
              <th className="p-4">Phone Number</th>
              <th className="p-4">Qualification</th>
              <th className="p-4">University/College</th>
              <th className="p-4">Experience</th>
              <th className="p-4">Motivation</th>
              <th className="p-4">Availability</th>
              <th className="p-4">Submission Time</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr
                  key={app.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-semibold text-gray-800">{app.projectName}</td>
                  <td className="p-4">{app.fullName}</td>
                  <td className="p-4 text-blue-600">{app.email}</td>
                  <td className="p-4">{app.phone}</td>
                  <td className="p-4">{app.qualification}</td>
                  <td className="p-4">{app.university}</td>
                  <td className="p-4 max-w-xs truncate">{app.experience}</td>
                  <td className="p-4 max-w-xs truncate">{app.motivation}</td>
                  <td className="p-4">{app.availability}</td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(app.created_at).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="p-6 text-center text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid md:hidden gap-4">
        {applications.length > 0 ? (
          applications.map((app, index) => (
            <div
              key={app.id}
              className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {app.projectName}
                </h2>
                <span className="text-sm text-gray-500">
                  #{index + 1}
                </span>
              </div>
              <p className="text-gray-700 font-medium">{app.fullName}</p>
              <p className="text-blue-600 text-sm">{app.email}</p>
              <p className="text-gray-600 text-sm">{app.phone}</p>
              <p className="mt-2 text-sm text-gray-500">
                Submitted:{" "}
                {new Date(app.created_at).toLocaleDateString("en-US", {
                  dateStyle: "medium",
                })}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No applications found</p>
        )}
      </div>
    </div>
  );
}
