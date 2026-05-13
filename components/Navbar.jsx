"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Research", href: "/research" },
    { name: "Our Work", href: "/work" },
    { name: "Get Involved", href: "/involved" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={150}
                height={50}
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#214392] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-blue-50"
              >
                {item.name}
              </a>
            ))}

            {/* Donate Button */}
            <a
              href="https://rzp.io/rzp/Ef4HgSgF"
              className="ml-4 px-4 py-2 bg-[#347c3b] text-white rounded-md text-sm font-medium hover:bg-[#285e2f] transition-colors duration-300"
            >
              Donate
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <a
              href="https://rzp.io/rzp/Ef4HgSgF"
              className="px-3 py-1 bg-[#347c3b] text-white rounded-md text-sm font-medium hover:bg-[#285e2f] transition-colors duration-300"
            >
              Donate
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#214392] inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-50 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#214392] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
