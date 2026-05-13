"use client";
import { useState } from "react";

export default function UploadProjectPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    beneficiaries: "",
    status: "",
    highlights: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (image) data.append("image", image);

    const res = await fetch("/api/completedProjects", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    setMessage(result.message || result.error);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Upload Completed Project</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" placeholder="Title" className="w-full border p-2 rounded" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" onChange={handleChange}></textarea>
        <input name="date" placeholder="Date (e.g. December 2024)" className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="location" placeholder="Location" className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="beneficiaries" placeholder="Beneficiaries" className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="status" placeholder="Status (Completed / Ongoing)" className="w-full border p-2 rounded" onChange={handleChange} />
        <textarea name="highlights" placeholder="Highlights" className="w-full border p-2 rounded" onChange={handleChange}></textarea>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
