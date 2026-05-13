"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  Upload,
  FileText,
  FolderOpen,
  Image,
  Mail,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

const navItems = [
  { name: "Research Applications", href: "/adm@ccadm/applications", icon: Users },
  { name: "Upload Board Members", href: "/adm@ccadm/board/upload", icon: Upload },
  { name: "Delete Board Members", href: "/adm@ccadm/board/manage", icon: Home },
  { name: "Upload New Post", href: "/adm@ccadm/posts", icon: FileText },
  { name: "Get Involved Applications", href: "/adm@ccadm/getinvolved", icon: Users },
  { name: "Upload Gallery Images", href: "/adm@ccadm/galleryImages", icon: Image },
  { name: "Upload Our Works", href: "/adm@ccadm/galleryProjects", icon: FolderOpen },
  { name: "Messages", href: "/adm@ccadm/messages", icon: Mail },
  { name: "Add & Edit Research", href: "/adm@ccadm/projects", icon: FolderOpen },
];

export default function Sidebar({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Auto-collapse on tablet screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setIsCollapsed(window.innerWidth < 1280); // Auto-collapse on lg screens
      } else if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-3 left-3 z-50 p-3 rounded-xl bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-all duration-200 hover:scale-105"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Collapse Toggle */}
      <button
        onClick={toggleCollapse}
        className="hidden lg:flex xl:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-gray-900 text-white shadow-md hover:bg-gray-800 transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? <Menu size={18} /> : <X size={18} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          ${isCollapsed ? 'w-16' : 'w-72 md:w-64 lg:w-16 xl:w-72'}
          bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
          text-white flex flex-col
          transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          shadow-2xl lg:shadow-xl border-r border-gray-700
        `}
      >
        {/* Logo / Title */}
        <div className={`flex items-center gap-3 mb-8 px-4 mt-6 ${isCollapsed && !isMobileMenuOpen ? 'justify-center px-2' : ''}`}>
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg flex-shrink-0">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          {(!isCollapsed || isMobileMenuOpen) && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
              CCRRD Admin
            </h2>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                title={isCollapsed && !isMobileMenuOpen ? item.name : ''}
                className={`
                  group flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm
                  transition-all duration-200 relative overflow-hidden
                  ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : ''}
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-300 hover:bg-gray-700/60 hover:text-white hover:scale-102"
                  }
                `}
              >
                {/* Active Indicator */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r"></span>
                )}
                
                <Icon
                  size={20}
                  className={`flex-shrink-0 ${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                  }`}
                />
                
                {(!isCollapsed || isMobileMenuOpen) && (
                  <span className="truncate min-w-0">{item.name}</span>
                )}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && !isMobileMenuOpen && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`mt-auto border-t border-gray-700 pt-4 ${isCollapsed && !isMobileMenuOpen ? 'px-2' : 'px-4'}`}>
          <div className={isCollapsed && !isMobileMenuOpen ? 'flex justify-center' : ''}>
            <LogoutButton collapsed={isCollapsed && !isMobileMenuOpen} />
          </div>
          
          {(!isCollapsed || isMobileMenuOpen) && (
            <div className="text-xs text-gray-400 mt-4 space-y-1">
              <p className="font-medium">Admin Dashboard</p>
              <p className="opacity-70">© 2025 CCRRD</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <div 
          className={`
            p-4 sm:p-6 lg:p-8 
            pt-16 sm:pt-20 lg:pt-8
            ${isCollapsed ? 'lg:ml-0' : 'lg:ml-0'}
            transition-all duration-300
          `}
        >
          <div className="max-w-full overflow-x-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}