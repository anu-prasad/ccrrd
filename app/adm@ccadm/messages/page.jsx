
"use client";

import { useEffect, useState } from "react";

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/contact", { cache: "no-store" });
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p className="p-4">Loading messages...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-4 border rounded-lg shadow bg-white"
            >
              <p>
                <span className="font-semibold">Name:</span> {msg.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {msg.email}
              </p>
              <p>
                <span className="font-semibold">Message:</span> {msg.message}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Received:</span>{" "}
                {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
