import React from 'react';
import { MapPin, Phone, Mail, Globe, MessageCircle, Heart, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const handleNavClick = (tabId) => {
    if (setActiveTab) setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1120] text-slate-300 pt-16 pb-10 border-t border-slate-800 relative overflow-hidden">
      {/* Ambient gradient glows matching logo petals */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Consultation Card */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-3xl p-6 sm:p-8 lg:p-10 mb-14 border border-slate-700/80 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-[#FF6B35] border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Bespoke Himalayan Escapes & Events</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Ready to Plan Your Dream Uttarakhand Journey?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with our local tour specialists for customized itineraries, boutique resort deals & verified bookings.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/919258677823?text=Hello%20Samika%20Holidays%2C%20I%20want%20to%20plan%20my%20trip."
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-rose-900/30 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Instant WhatsApp Inquiry</span>
            </a>
            <a
              href="tel:+919258677823"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-[#FF6B35]" />
              <span>Call Us Now</span>
            </a>
          </div>
        </div>

        {/* Direct Footer Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              className="inline-flex items-center cursor-pointer bg-white rounded-2xl p-2.5 shadow-md hover:opacity-95 transition-all hover:scale-[1.02]" 
              onClick={() => handleNavClick('home')}
            >
              <img 
                src="/logo.png" 
                alt="Samika Holidays Logo" 
                className="h-14 sm:h-16 w-auto object-contain" 
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Samika Holidays is your premier hospitality partner across Uttarakhand. Specializing in verified luxury resorts, curated wildlife safaris, pilgrimage tours, destination weddings, and corporate offsite retreats.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {/* Facebook */}
              <a href="https://www.facebook.com/samikaholidays" target='_blank' rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-[#FF6B35] hover:border-[#FF6B35] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.23 0-1.62.77-1.62 1.56V12h2.78l-.44 3h-2.34v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/Samikaholidays" target='_blank' rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-[#E11D48] hover:border-[#E11D48] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/919258677823" target="_blank" rel="noreferrer" title="Chat on WhatsApp" className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 hover:text-emerald-300 hover:border-emerald-500 transition-all">
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-semibold text-white text-xs tracking-wider uppercase mb-3 border-b border-slate-800 pb-2 inline-block">
              Quick Explore
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {[
                { name: 'Home Experience', tab: 'home' },
                { name: 'Luxury Hotels & Resorts', tab: 'hotels' },
                { name: 'Curated Tour Packages', tab: 'packages' },
                { name: 'Top Destinations', tab: 'destinations' },
                { name: 'Destination Weddings', tab: 'weddings' },
                { name: 'Corporate Retreats', tab: 'corporate' },
                { name: 'Travel Journal / Blogs', tab: 'blogs' },
                { name: 'Our Heritage & Story', tab: 'about' },
                { name: 'Contact & Support', tab: 'contact' }
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.tab)}
                    className="text-slate-400 hover:text-[#FF6B35] transition-colors cursor-pointer text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Top Destinations (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-semibold text-white text-xs tracking-wider uppercase mb-3 border-b border-slate-800 pb-2 inline-block">
              Trending Destinations
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs font-medium">
              {[
                'Jim Corbett Safari',
                'Nainital Lake City',
                'Bhimtal & Naukuchiatal',
                'Mukteshwar Orchards',
                'Rishikesh Rafting',
                'Mussoorie Queen of Hills',
                'Kainchi Dham Ashram',
                'Kedarnath Yatra',
                'Auli Snow Slopes',
                'Kausani Himalayan View'
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="text-slate-400 hover:text-[#FF6B35] transition-colors text-left truncate max-w-[150px] cursor-pointer"
                  >
                    • {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Reservations Desk (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-semibold text-white text-xs tracking-wider uppercase mb-3 border-b border-slate-800 pb-2 inline-block">
              Reservations & Help Desk
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                <span className="text-slate-400">Headquarters in Uttarakhand with local hubs in Nainital, Corbett & Haridwar.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF6B35] shrink-0" />
                <a href="tel:+919258677823" className="hover:text-white transition-colors font-semibold">
                  +91 92586 77823 / +91 78199 13686
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF6B35] shrink-0" />
                <a href="mailto:reservations@samikaholidays.com" className="hover:text-white transition-colors font-medium">
                  reservations@samikaholidays.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#FF6B35] shrink-0" />
                <span className="text-slate-400">www.samikaholidays.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Tagline Strip */}
        <div className="py-6 flex items-center justify-center gap-3 text-center border-b border-slate-800/80">
          <span className="text-[#FF6B35] text-lg">☀️</span>
          <span className="font-serif italic text-base sm:text-xl text-[#FF8A00] font-medium tracking-wide">
            Samika Holidays – Crafting Timeless Mountain Memories Across Uttarakhand
          </span>
          <span className="text-[#FF6B35] text-lg">☀️</span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Samika Holidays. All Rights Reserved.
          </div>

          <div className="text-center text-slate-400">
            <span>Developed with care by </span>
            <a 
              href="https://buimbdigital.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#FF6B35] hover:text-[#FFA07A] font-semibold hover:underline transition-colors"
            >
              Buimb Research and LLP
            </a>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Guest Safety & Refund</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
