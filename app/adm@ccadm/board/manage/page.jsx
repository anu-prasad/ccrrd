"use client";
import { useEffect, useState } from "react";

export default function ManageBoardMembers() {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const res = await fetch("/api/board");
    const data = await res.json();
    setMembers(data);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    await fetch(`/api/board?id=${id}`, {
      method: "DELETE",
    });
    fetchMembers(); // refresh list
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Delete Board Members</h2>
      <ul className="space-y-4">
        {members.map((m) => (
          <li key={m.id} className="flex items-center justify-between p-3 border rounded">
            <div className="flex items-center space-x-3">
              <img src={m.image} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-gray-600">{m.designation}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(m.id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
