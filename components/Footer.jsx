import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ChevronRight, Heart, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/work", label: "Our Works" },
    { href: "/research", label: "Research" },
    { href: "/contact", label: "Contact" }
  ];

  const getInvolvedLinks = [
    { href: "/involved", label: "Volunteer" },
    { href: "/involved", label: "Donate" },
    { href: "/involved", label: "Voice 4 Planet" }
  ];

  const policyLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/refund-policy", label: "Refund Policy" }, 
    { href: "/terms-conditions", label: "Terms & Conditions" }
  ];

  const socialLinks = [
    { href: "https://www.facebook.com/profile.php?id=61553804921224", icon: Facebook, label: "Facebook", color: "hover:text-blue-500" },
    { href: "https://x.com/CCRRD_NGO", icon: Twitter, label: "Twitter", color: "hover:text-sky-400" },
    { href: "https://www.linkedin.com/in/ccrrd-ngo-313990375/", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-600" },
    { href: "https://instagram.com/ccrrd_ngo", icon: Instagram, label: "Instagram", color: "hover:text-pink-500" },
    { href: "https://www.youtube.com/@CCRRD_NGO", icon: Youtube, label: "Youtube", color: "hover:text-pink-500" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-green-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative">
        <div className="container mx-auto py-16 px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Logo + About Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src="/logo.png" 
                    alt="CCRRD Logo"
                    className="h-12 w-auto filter brightness-0 invert"
                  />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We are committed to advancing research and action for a sustainable future. Join us in our mission.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white/90 tracking-wide uppercase">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map(({ href, icon: Icon, label, color }) => (
                    <Link
                      key={label}
                      href={href}
                      aria-label={label}
                      className={`p-2 bg-white/10 rounded-full backdrop-blur-sm ${color} hover:bg-white/20 hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center text-gray-300 hover:text-white transition-all duration-200"
                    >
                      <ChevronRight className="h-3 w-3 mr-2 text-green-400 group-hover:translate-x-1 transition-transform duration-200" />
                      <span className="text-sm group-hover:text-green-400">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get Involved */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white relative">
                Get Involved
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {getInvolvedLinks.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center text-gray-300 hover:text-white transition-all duration-200"
                    >
                      <ChevronRight className="h-3 w-3 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-200" />
                      <span className="text-sm group-hover:text-blue-400">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Policies */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white relative">
                Our Policies
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {policyLinks.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center text-gray-300 hover:text-white transition-all duration-200"
                    >
                      <ChevronRight className="h-3 w-3 mr-2 text-purple-400 group-hover:translate-x-1 transition-transform duration-200" />
                      <span className="text-sm group-hover:text-purple-400">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white relative">
                Contact Us
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
              </h3>
              <div className="space-y-4">
                
                {/* Address */}
                {/* <div className="flex items-start space-x-3 group">
                  <MapPin className="h-4 w-4 mt-1 text-green-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      123 Green Way<br />
                      Eco City, 12345
                    </p>
                  </div>
                </div> */}

                {/* Email */}
                <div className="flex items-center space-x-3 group">
                  <Mail className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <a
                    href="mailto:info@ccrrd.org"
                    className="text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    info@ccrrd.org
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3 group">
                  <Phone className="h-4 w-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <a
                    href="tel:+919447474629"
                    className="text-sm text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    (+91) 9447474629
                  </a>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Phone className="h-4 w-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <a
                    href="tel:+918848091303"
                    className="text-sm text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    (+91) 8848091303
                  </a>
                </div>
              </div>

              {/* Newsletter Signup */}
            
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>&copy; {currentYear} CCRRD. All Rights Reserved.</span>
              </div>

              {/* Made with love */}
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Made with</span>
                <Heart className="h-3 w-3 text-red-400 animate-pulse" />
                <span>for our planet</span>
              </div>

              {/* Developer Link */}
              <div className="flex items-center space-x-6 text-sm">
                <Link href="https://www.koremaed.com" className="text-gray-400 hover:text-white transition-colors">
                  Developed By Koremaed
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
    </footer>
  );
}