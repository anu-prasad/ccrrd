"use client";

import { Target, Eye, Calendar, ExternalLink, Clock, Globe } from "lucide-react";
import { useEffect, useState } from "react";

export default function MissionandVision() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
`https://newsdata.io/api/1/latest?apikey=pub_1d09c38f074b4732b3246992a31a7b37&q=(India%20AND%20(%22climate%20change%22%20OR%20landslide))&country=in&language=en&timezone=Asia/Kolkata
`

        );
        const data = await res.json();

        console.log("API Response:", data); // 👈 check in browser console

        setNews((data.results || []).slice(0, 9));
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <section className="px-4 py-20 md:px-12 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="p-8 bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-[#214293] to-[#1a3575] rounded-xl shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-[#214293]">Mission</h3>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            To advance global efforts to combat climate change through innovative solutions, community engagement, and sustainable practices that protect our planet for future generations.
          </p>
        </div>

        <div className="p-8 bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-[#347d3a] to-[#2d6b32] rounded-xl shadow-lg">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-[#347d3a]">Vision</h3>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            Creating a sustainable and resilient world where communities thrive in harmony with nature, supported by climate-smart technologies and environmental stewardship.
          </p>
        </div>
      </div>

      {/* News Section */}
      <div className="max-w-7xl mx-auto mt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Climate & Disaster News
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay informed with the latest climate change and environmental news from across India
          </p>
        </div>

        {/* News Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Loading latest news...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-10 h-10 text-red-500" />
            </div>
            <p className="text-red-600 font-semibold text-lg">No news found at the moment</p>
            <p className="text-gray-500">Please check back later for updates</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, idx) => (
              <article
                key={idx}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                        <div className="text-center">
                          <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <span className="text-gray-500 text-sm font-medium">Climate News</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay Icon */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-4 h-4 text-gray-700" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    
                    {article.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {article.description}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {new Date(article.pubDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {new Date(article.pubDate).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}