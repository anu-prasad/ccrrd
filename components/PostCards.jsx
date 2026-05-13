'use client';

import { useEffect, useState } from 'react';
import { Calendar, X, ExternalLink, Leaf } from 'lucide-react';

export default function PostCards() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/posts');
      const data = await res.json();
      // Sort by date (newest first) and limit to 4 posts
      const sortedPosts = data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      'research': 'bg-[#347d3a] text-white',
      'news': 'bg-[#214293] text-white',
      'event': 'bg-[#214293] text-white',
      'publication': 'bg-[#347d3a] text-white',
      'default': 'bg-gray-600 text-white'
    };
    return colors[type?.toLowerCase()] || colors.default;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-[#214293]/5 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#214293]"></div>
            <p className="mt-4 text-gray-600">Loading latest posts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-[#214293]/5 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#214293]/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#347d3a]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#214293]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#214293] mb-6">
            Latest Updates
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with our most recent research, news, and developments in climate solutions
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-[#214293] to-[#347d3a] mx-auto rounded-full"></div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-xl">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-[#214293] mb-2">No posts available</h3>
            <p className="text-gray-500 text-lg">Check back later for new content</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100"
                onClick={() => setSelectedPost(post)}
              >
                {/* Image Container */}
                {post.image && (
                  <div className="relative h-48 overflow-hidden rounded-t-3xl">
                    <img
                      src={`/uploads/${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(post.type)} shadow-lg`}>
                        {post.type}
                      </span>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#214293]/0 group-hover:bg-[#214293]/10 transition-all duration-500"></div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center text-sm text-[#347d3a] mb-3 font-semibold">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(post.date)}
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-[#214293] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                    {post.description}
                  </p>
                  
                  {/* Read More Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center text-[#214293] font-semibold text-sm group-hover:text-[#347d3a] transition-colors">
                      <span>Read Full Story</span>
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#214293] to-[#347d3a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-3xl"></div>
              </div>
            ))}
          </div>
        )}

        {/* Popup Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div 
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Image */}
              {selectedPost.image && (
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={`/uploads/${selectedPost.image}`}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-3 rounded-full transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  
                  {/* Type Badge in Modal */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${getTypeColor(selectedPost.type)} shadow-lg`}>
                      {selectedPost.type}
                    </span>
                  </div>
                </div>
              )}

              {/* Modal Content */}
              <div className="p-8 max-h-96 overflow-y-auto">
                {/* Close button for posts without images */}
                {!selectedPost.image && (
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
                
                <h2 className="text-3xl font-bold text-[#214293] mb-4 pr-8 leading-tight">
                  {selectedPost.title}
                </h2>
                
                <div className="flex items-center text-[#347d3a] mb-6 font-semibold">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{formatDate(selectedPost.date)}</span>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedPost.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="flex-1 bg-gradient-to-r from-[#214293] to-[#347d3a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}