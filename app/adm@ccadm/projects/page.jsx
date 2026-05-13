"use client";

import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    applyDate: "",
    description: "",
    details: "",
    status: "",
    participants: "",
    location: "",
    duration: "",
    category: "",
  });

  // ✅ Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
// ✅ Add or Update
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/projects/${form.id}` : "/api/projects";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error || "Failed to save project");
    }

    // reset form after save
    setForm({
      id: null,
      title: "",
      applyDate: "",
      description: "",
      details: "",
      status: "",
      participants: "",
      location: "",
      duration: "",
      category: "",
    });

    fetchProjects();
  } catch (err) {
    console.error("Save error:", err);
    alert("❌ " + err.message);
  }
};

  // ✅ Edit project
  const handleEdit = (project) => {
    setForm(project);
  };

 const handleDelete = async (id) => {
  try {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || "Failed to delete");
    fetchProjects();
  } catch (err) {
    console.error("Delete error:", err);
    alert("❌ " + err.message);
  }
};


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 border p-4 rounded-lg shadow"
      >
        {Object.keys(form).map(
          (key) =>
            key !== "id" && (
              <input
                key={key}
                type="text"
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={key}
                className="border p-2 rounded"
              />
            )
        )}
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded"
        >
          {form.id ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* List */}
      <div className="space-y-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-4 border rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-600">{p.description}</p>
              <p className="text-xs text-gray-400">{p.applyDate}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
