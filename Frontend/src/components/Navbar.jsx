import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, User, LogOut, ChevronDown, Ticket, ShieldCheck, LayoutDashboard } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenLogin, isLoggedIn, onLogout, isAdminAuthenticated, onAdminLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-2xs px-[5px]">
      {/* Main Header Bar */}
      <div className="w-full max-w-[98%] 2xl:max-w-[1800px] mx-auto px-[5px] sm:px-[5px] lg:px-[5px] h-20 lg:h-22 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center cursor-pointer shrink-0 py-1.5 ml-[17px] transition-transform duration-200 hover:scale-[1.02]"
        >
          <img 
            src="/logo.png" 
            alt="Atithya Stay Logo" 
            className="h-14 sm:h-16 lg:h-[72px] max-h-[74px] w-auto object-contain drop-shadow-2xs" 
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-[#0F382C] font-bold'
                    : 'text-stone-700 hover:text-[#0F382C]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#C8933E] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Admin Panel / User Profile / Login Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 relative">
          {isAdminAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="bg-stone-900 hover:bg-black text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-amber-500/50 shadow-sm transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-[#C8933E] text-stone-950 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[9px] text-[#C8933E] uppercase font-extrabold tracking-wider">Super Admin</span>
                  <span className="text-xs">Control Panel</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* Admin Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-stone-800 hover:bg-stone-100 hover:text-[#0F382C] transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#C8933E]" />
                    <span>Admin Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onAdminLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-stone-100 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Admin Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="bg-emerald-50 hover:bg-emerald-100 text-[#0F382C] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-emerald-300 shadow-sm transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-[#0F382C] text-[#C8933E] flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
                <span>My Profile</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-100 hover:text-[#0F382C] transition-colors"
                  >
                    <Ticket className="w-4 h-4 text-[#C8933E]" />
                    <span>My Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-stone-100 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-5 py-2.5 rounded-xl text-xs xl:text-sm font-bold flex items-center gap-2 shadow-sm border border-emerald-900 transition-all hover:scale-105"
            >
              <User className="w-4 h-4 text-[#C8933E]" />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                activeTab === item.id
                  ? 'bg-[#0F382C] text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {item.label}
            </button>
          ))}

          {isAdminAuthenticated && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-4 py-3 rounded-lg text-base font-bold text-amber-800 bg-amber-50 flex items-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Admin Dashboard</span>
            </button>
          )}

          {isLoggedIn && !isAdminAuthenticated && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-left px-4 py-3 rounded-lg text-base font-bold text-[#0F382C] bg-emerald-50"
            >
              My Dashboard
            </button>
          )}

          <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
            {isAdminAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAdminLogout();
                }}
                className="bg-red-600 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Admin Sign Out</span>
              </button>
            ) : isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="bg-red-600 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="bg-[#0F382C] text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5 text-[#C8933E]" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

