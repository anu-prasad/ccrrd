"use client";
import { useEffect, useState } from "react";
import { Users, Heart, MessageCircle, Search, Filter, Calendar, Mail, Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react";

export default function GetInvolvedDataPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedCards, setExpandedCards] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/get-involved/display");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const typeConfig = {
    volunteer: {
      title: "Volunteer Registration",
      icon: Users,
      color: "bg-blue-50 border-blue-200 text-blue-800",
      headerColor: "text-blue-700",
      badgeColor: "bg-blue-100 text-blue-800"
    },
    contribute: {
      title: "Contribute With Us",
      icon: Heart,
      color: "bg-green-50 border-green-200 text-green-800",
      headerColor: "text-green-700",
      badgeColor: "bg-green-100 text-green-800"
    },
    voice: {
      title: "Voice 4 Planet",
      icon: MessageCircle,
      color: "bg-purple-50 border-purple-200 text-purple-800",
      headerColor: "text-purple-700",
      badgeColor: "bg-purple-100 text-purple-800"
    }
  };

  // Filter and sort data
  const filteredData = data.filter(item => {
    const matchesSearch = !searchTerm || 
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || item.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at) - new Date(a.created_at);
      case "oldest":
        return new Date(a.created_at) - new Date(b.created_at);
      case "name":
        return a.fullName?.localeCompare(b.fullName) || 0;
      default:
        return 0;
    }
  });

  // Group data by type
  const grouped = {
    volunteer: sortedData.filter(item => item.type === "volunteer"),
    contribute: sortedData.filter(item => item.type === "contribute"),
    voice: sortedData.filter(item => item.type === "voice")
  };

  const toggleCardExpansion = (id) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const totalEntries = data.length;
  const filteredCount = filteredData.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading community data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="text-red-600 text-center">
            <p className="font-semibold mb-2">Oops! Something went wrong</p>
            <p className="text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community Engagement</h1>
              <p className="text-gray-600 mt-1">
                Manage and view all community registrations ({totalEntries} total entries)
              </p>
            </div>
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="volunteer">Volunteers</option>
                  <option value="contribute">Contributors</option>
                  <option value="voice">Voice 4 Planet</option>
                </select>
              </div>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By Name</option>
              </select>
            </div>
          </div>
          
          {/* Results count */}
          {filteredCount !== totalEntries && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredCount} of {totalEntries} entries
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredCount === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No entries found</h3>
            <p className="text-gray-600">
              {searchTerm || filterType !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "No community registrations available yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([type, items]) => {
              const config = typeConfig[type];
              if (!config || items.length === 0) return null;
              
              const Icon = config.icon;
              
              return (
                <div key={type} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${config.badgeColor}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className={`text-xl font-semibold ${config.headerColor}`}>
                          {config.title}
                        </h2>
                        <p className="text-sm text-gray-600">{items.length} entries</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {items.map((row) => {
                        let extras = {};
                        try {
                          extras = row.extraFields ? JSON.parse(row.extraFields) : {};
                        } catch (e) {
                          console.warn("Failed to parse extraFields:", e);
                        }

                        const isExpanded = expandedCards.has(row.id);
                        const hasExtras = Object.keys(extras).length > 0;

                        return (
                          <div
                            key={row.id}
                            className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${config.color}`}
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-gray-900 truncate">
                                  {row.fullName || "N/A"}
                                </h3>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.badgeColor}`}>
                                  {config.title.split(' ')[0]}
                                </span>
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Mail className="h-4 w-4 flex-shrink-0" />
                                  <span className="truncate">{row.email || "N/A"}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Phone className="h-4 w-4 flex-shrink-0" />
                                  <span>{row.phone || "N/A"}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-gray-600">
                                  <MapPin className="h-4 w-4 flex-shrink-0" />
                                  <span className="truncate">{row.location || "N/A"}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-gray-500 text-xs">
                                  <Calendar className="h-4 w-4 flex-shrink-0" />
                                  <span>{new Date(row.created_at).toLocaleDateString()}</span>
                                </div>
                              </div>

                              {hasExtras && (
                                <div className="pt-2 border-t border-gray-200">
                                  <button
                                    onClick={() => toggleCardExpansion(row.id)}
                                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                  >
                                    {isExpanded ? "Hide" : "Show"} Details
                                    {isExpanded ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </button>
                                  
                                  {isExpanded && (
                                    <div className="mt-3 space-y-2 text-sm animate-in slide-in-from-top-2 duration-200">
                                      {Object.entries(extras).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-start gap-2">
                                          <span className="font-medium text-gray-700 capitalize min-w-0">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                                          </span>
                                          <span className="text-gray-600 text-right min-w-0">
                                            {typeof value === 'string' && value.length > 50 
                                              ? `${value.substring(0, 50)}...` 
                                              : String(value)}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}