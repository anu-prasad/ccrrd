'use client';

import { useEffect, useState } from 'react';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      fetchPosts();
      e.target.reset();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Upload Form */}
      <form onSubmit={handleSave} className="space-y-3 border p-4 rounded-lg">
        <h2 className="font-bold text-lg">Add New Post</h2>
        <input name="title" placeholder="Post Title" required className="w-full border p-2 rounded" />
        <input type="date" name="date" required className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" />
        <input name="type" placeholder="Post Category (Agriculture, Climate)" className="w-full border p-2 rounded" />
        <input type="file" name="image" required className="w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </form>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 shadow">
            {post.image && (
              <img src={`/uploads/${post.image}`} alt={post.title} className="w-full h-40 object-cover rounded" />
            )}
            <h3 className="font-bold text-lg mt-2">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.date}</p>
            <p>{post.description}</p>
            <span className="text-xs text-blue-600">Type: {post.type}</span>
            <button
              onClick={() => handleDelete(post.id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
