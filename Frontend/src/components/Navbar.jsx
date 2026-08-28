import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, User, LogOut, ChevronDown, Ticket, ShieldCheck, LayoutDashboard, Sparkles, Compass } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenLogin, isLoggedIn, onLogout, isAdminAuthenticated, onAdminLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'hotels', label: 'Hotels & Resorts' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">

      {/* Main Header Bar */}
      <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center cursor-pointer shrink-0 py-1 pl-1 sm:pl-3 transition-transform duration-300 hover:scale-[1.03]"
        >
          <img 
            src="/logo.png" 
            alt="Samika Holidays Logo" 
            className="h-13 sm:h-15 lg:h-16 max-h-[68px] w-auto object-contain drop-shadow-xs" 
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-2 text-xs xl:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#E11D48] to-[#FF6B35] shadow-md shadow-rose-500/20 font-bold'
                    : 'text-slate-700 hover:text-[#E11D48] hover:bg-slate-100/80'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action: WhatsApp & Login */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 relative">
         

          {isAdminAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-amber-500/40 shadow-sm transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#E11D48] text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[9px] text-[#FF6B35] uppercase font-extrabold tracking-wider">Super Admin</span>
                  <span className="text-xs">Control Panel</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* Admin Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-[#E11D48] transition-colors cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#E11D48]" />
                    <span>Admin Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onAdminLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100 mt-1 cursor-pointer"
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
                className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-300 shadow-2xs transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#E11D48] to-[#FF6B35] text-white flex items-center justify-center font-bold">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>My Account</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-[#E11D48] transition-colors cursor-pointer"
                  >
                    <Ticket className="w-4 h-4 text-[#E11D48]" />
                    <span>My Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100 mt-1 cursor-pointer"
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
              className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-5 py-2.5 rounded-xl text-xs xl:text-sm font-bold flex items-center gap-2 shadow-md shadow-rose-500/20 transition-all hover:scale-105 cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login / Register</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white font-bold shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}

          {isAdminAuthenticated && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-amber-900 bg-amber-50 flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Admin Dashboard</span>
            </button>
          )}

          {isLoggedIn && !isAdminAuthenticated && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-rose-900 bg-rose-50 cursor-pointer"
            >
              My Dashboard
            </button>
          )}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="https://wa.me/916284073623"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Concierge</span>
            </a>

            {isAdminAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAdminLogout();
                }}
                className="bg-red-600 text-white px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Admin Sign Out</span>
              </button>
            ) : isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="bg-red-600 text-white px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-rose-500/20"
              >
                <User className="w-4 h-4" />
                <span>Login / Register</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
