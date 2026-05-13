'use client'
import { Eye, Handshake, Target, Users, Award, Globe, TreePine, Lightbulb, Heart, Shield, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [boardMembers, setBoardMembers] = useState([]);
  const [showStoryModal, setShowStoryModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Fetch board members from DB
  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const res = await fetch("/api/board");
        const data = await res.json();
        setBoardMembers(data);
      } catch (error) {
        console.error("Error fetching board members:", error);
      }
    };
    fetchBoardMembers();
  }, []);

  const values = [
    {
      name: "Scientific Integrity",
      description: "We commit to rigorous, transparent, and ethical research as the foundation of all our work.",
      icon: Shield,
    },
    {
      name: "Empathy and Justice",
      description: "We stand with vulnerable and marginalized communities, ensuring their voices are heard and their dignity respected.",
      icon: Heart,
    },
    {
      name: "Collaboration and Partnership",
      description: "We believe that solving the climate crisis requires everyone — communities, scientists, governments, and organizations — working together.",
      icon: Users,
    },
    {
      name: "Sustainability and Stewardship",
      description: "We promote practices that care for the planet today while preserving its resources for future generations.",
      icon: TreePine,
    },
    {
      name: "Inclusivity and Participation",
      description: "We welcome and empower everyone — regardless of education, background, or status — to contribute to climate solutions.",
      icon: Globe,
    },
    {
      name: "Action with Hope",
      description: "We act decisively and positively, believing that meaningful change is possible through collective effort.",
      icon: Zap,
    },
    {
      name: "Respect for Nature and Knowledge",
      description: "We value both scientific insights and indigenous wisdom, harmonizing them for the wellbeing of people and the planet.",
      icon: Lightbulb,
    }
  ];

  const stats = [
    { number: "50+", label: "Research Projects", icon: Award },
    { number: "100K+", label: "Lives Impacted", icon: Users },
    { number: "25+", label: "Countries Served", icon: Globe },
    { number: "15+", label: "Years Experience", icon: Zap }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-[#214293] via-[#2a4f9e] to-[#347d3a] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-40 w-40 h-40 bg-[#347d3a] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            About CCRRD
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-200 leading-relaxed">
            We are committed to advancing research and action for a sustainable future. Join us in our mission
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 lg:py-24 bg-gray-50 relative shadow-lg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/IMG_9485.JPG"
                alt="CCRRD team working in the field"
                className="rounded-xl shadow-xl w-full"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#214293] leading-tight">
                Welcome to the 
                <span className="block text-[#347d3a]">
                  Center for Climate Research & Rural Development
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We're honored to have you here... Together, through science, compassion, and collective action, we can make a difference.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <Heart className="h-6 w-6 text-[#347d3a]" />
                <span className="text-gray-600 font-medium">Driven by passion, guided by science, focused on impact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Story */}
      <section className="py-16 lg:py-24 bg-white relative shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#214293] mb-4">Our Foundation</h2>
            <div className="w-24 h-1 bg-[#347d3a] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Vision Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="inline-flex p-4 rounded-xl bg-[#214293] mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#214293] mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">Creating sustainable and resilient world where communities thrive in harmony with nature, guided by research and development rooted in climate knowledge, leaving a legacy of hope for future generations.</p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="inline-flex p-4 rounded-xl bg-[#214293] mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#214293] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">To advance global efforts to combat climate change through cutting-edge research, education, and advocacy, driving positive environmental change for present and future generations.</p>
            </div>

            {/* Story Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="inline-flex p-4 rounded-xl bg-[#214293] mb-6">
                <Handshake className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#214293] mb-4">Our Story</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Born from devastation and hope, CCRRD was founded after Kerala's 2018 floods by eight individuals who saw climate change as an urgent reality requiring both scientific understanding and compassionate action.
              </p>
              <button 
                onClick={() => setShowStoryModal(true)}
                className="text-[#347d3a] font-semibold hover:text-[#214293] transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Read More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-gray-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#214293] mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-[#347d3a] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map(({ name, description, icon: Icon }) => (
              <div key={name} className="flex items-start space-x-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="p-3 bg-[#347d3a] rounded-xl">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#214293] mb-2">{name}</h4>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Members (Dynamic) */}
      <section className="py-16 lg:py-24 bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#214293] mb-4">Our Leadership Team</h2>
            <div className="w-24 h-1 bg-[#347d3a] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the visionary leaders guiding our organization.
            </p>
          </div>

          {boardMembers.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No board members found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {boardMembers.map((member) => (
                <div key={member.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-gray-100 hover:border-[#347d3a]">
                  {/* Image Container */}
                  <div className="relative p-6 pb-0">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#214293] to-[#347d3a] p-1">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover rounded-xl" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className="p-6 pt-4 text-center">
                    <h4 className="text-lg font-bold text-[#214293] mb-2 group-hover:text-[#347d3a] transition-colors duration-300">
                      {member.name}
                    </h4>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#214293] to-[#347d3a] mx-auto mb-3"></div>
                    <p className="text-sm text-[#347d3a] font-semibold mb-3">
                      {member.designation}
                    </p>
                    {member.bio && (
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </div>
                  
                  {/* Decorative Corner Elements */}
                  <div className="absolute top-3 right-3 w-3 h-3 bg-[#347d3a] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="absolute bottom-3 left-3 w-2 h-2 bg-[#214293] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-[#214293] to-[#347d3a] text-white relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-6"></div>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in our mission to create sustainable solutions for climate resilience and rural development.
          </p>
          <a href="/involved">
            <button className="px-8 py-4 bg-white text-[#214293] font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            Get Involved
          </button>
          </a>
        </div>
      </section>

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b px-8 py-6 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-[#214293]">Our Story</h2>
              <button 
                onClick={() => setShowStoryModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-8 py-6 space-y-6 text-gray-700 leading-relaxed">
              <div className="bg-gradient-to-r from-[#214293] to-[#347d3a] text-white p-6 rounded-lg">
                <p className="text-lg font-semibold mb-2">Born from devastation — and from hope.</p>
              </div>
              
              <p>
                The Centre for Climate Research and Rural Development (CCRRD) was born from devastation — and from hope. In 2018, Kerala endured one of the worst floods in its history. Villages vanished underwater, families were displaced overnight, and lives were shattered. But as the waters receded, a deeper truth emerged: the flood was not just a disaster — it was a warning.
              </p>
              
              <p>
                We — eight concerned individuals — saw that the climate crisis was no longer a distant possibility; it was already here. We saw sea levels rising, swallowing coastlines in Chellanam and forcing Indonesia to relocate its capital. We saw Himalayan glaciers melting and rivers overflowing, while droughts parched fields in Maharashtra, Tamil Nadu, Africa, and beyond.
              </p>
              
              <p>
                We watched cyclones grow stronger and more frequent, and wildfires rage through the Amazon Rain forests and bush fires in Australia. And everywhere, we saw people — especially in rural areas — suffering silently, losing homes, food, education, health, and hope.
              </p>
              
              <p>
                In villages, families migrated as water dried up and land failed. Children dropped out of school. Women and children bore the brunt of hunger, malnutrition, and disease. Soils, stripped of life by pollution and poor practices, could no longer sustain forests or farms. Oceans and rivers, choked with plastics and toxins, became hazards instead of lifelines.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#347d3a]">
                <p className="font-semibold text-[#214293] mb-2">Our Realization</p>
                <p>It became clear to us that climate change is not just about rising temperatures — it is about people, justice, and survival. We understood that the solutions must be grounded in both science and compassion.</p>
              </div>
              
              <p>
                That is why we founded CCRRD — and registered it as a society in Palakkad, Kerala. Not only to respond to disasters, but to study them scientifically, to understand their causes and consequences, and to craft solutions rooted in research and empathy.
              </p>
              
              <p>
                We envision building a world-class climate research facility, where cutting-edge science meets indigenous wisdom and community experience. A place where universities, schools, and students work alongside farmers, fisherfolk, and passionate individuals from all walks of life — even those with little formal education. A hub that nurtures a culture of research, resilience, and collective action.
              </p>
              
              <p>
                At CCRRD, we believe that science can heal — by mapping glacier retreats, restoring soil health, tracking pollution, modelling climate risks, and guiding policies that governments and organizations can trust. Our mission is to put this knowledge in the service of the most vulnerable and leave behind not just discoveries, but a legacy of resilience, justice, and hope for future generations.
              </p>
              
              <div className="bg-gradient-to-r from-[#347d3a] to-[#214293] text-white p-6 rounded-lg">
                <p className="font-semibold">Our story began with a flood — but it continues with a vision: to stand with the most vulnerable, to harness the power of science and community, and to rewrite the future of our planet, together.</p>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t px-8 py-4">
              <button 
                onClick={() => setShowStoryModal(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#214293] to-[#347d3a] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}