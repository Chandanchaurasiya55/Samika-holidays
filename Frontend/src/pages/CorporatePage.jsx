import React, { useState } from 'react';
import { 
  Users, Building2, Calendar, MapPin, Send, CheckCircle2, ChevronRight, ChevronLeft,
  Utensils, Car, Compass, Award, ShieldCheck, Headphones, Tag, Phone, Sparkles, MessageCircle, ArrowRight, Laptop, Presentation, Shield
} from 'lucide-react';

export default function CorporatePage({ onOpenEnquiry, postsList = [] }) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  const defaultCorporateDestinations = [
    { title: 'Jim Corbett Riverside Lodges', sub: 'Open-Air Amphitheaters & Jungle Safaris', image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80', capacity: '20 - 300 Delegates' },
    { title: 'Nainital Lakeview Heritage', sub: 'Colonial Ballrooms & Offsite Strategy Meetings', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', capacity: '20 - 150 Delegates' },
    { title: 'Bhimtal Pine Retreats', sub: 'Peaceful Valley Outings & Team Activities', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', capacity: '25 - 200 Delegates' },
    { title: 'Rishikesh Adventure Camps', sub: 'White Water Rafting & Leadership Workshops', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', capacity: '30 - 250 Delegates' },
    { title: 'Mussoorie Hilltop Resorts', sub: 'MICE Infrastructure & Panoramic Valley Vistas', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', capacity: '40 - 300 Delegates' },
    { title: 'Kausani Himalayan Silence', sub: 'Executive Boardroom Retreats with Himalayan Peaks', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80', capacity: '15 - 80 Delegates' },
  ];

  const dynamicPosts = postsList.map(p => ({
    title: p.title,
    sub: p.subtitle || p.description || 'Corporate Retreat Venue',
    image: p.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    capacity: 'Bespoke Capacity'
  }));

  const corporateDestinations = dynamicPosts.length > 0 ? [...dynamicPosts, ...defaultCorporateDestinations] : defaultCorporateDestinations;

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#F8FAFC] text-slate-900">
      
      {/* ========================================================================= */}
      {/* 🌟 1. EXECUTIVE HERO SECTION (REDESIGNED ULTRA-LUXURY)                     */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0F172A] text-white pt-16 sm:pt-20 pb-28 sm:pb-36 px-4 sm:px-6 lg:px-8 min-h-[580px] sm:min-h-[640px] flex flex-col justify-between overflow-hidden">
        
        {/* Background HD Image Overlay */}
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2400&q=90')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/75 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-transparent to-transparent" />

        {/* Decorative Top Leaf Ornament */}
        <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none opacity-80 z-10">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <path d="M-20 -20 Q40 40 80 10 Q120 -20 160 30" stroke="#E11D48" strokeWidth="3" fill="none" />
            <path d="M30 20 C20 40, 50 60, 40 80 C60 70, 80 50, 60 30 Z" fill="#FF6B35" opacity="0.9" />
          </svg>
        </div>

        {/* Main Hero Title Content */}
        <div className="relative z-20 max-w-4xl mx-auto text-center space-y-5 my-auto pt-6">
          
          <div className="inline-flex items-center gap-2 bg-[#E11D48]/20 text-[#FF6B35] border border-[#E11D48]/40 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest backdrop-blur-md shadow-lg">
            <Users className="w-4 h-4 text-[#E11D48]" />
            <span>Samika Executive MICE & Corporate Offsites</span>
          </div>

          <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#E11D48] font-bold tracking-wide">
            Inspire & Energize Your Team
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] text-white tracking-tight drop-shadow-md">
            Corporate Tours & Offsite Retreats in <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF385C] to-[#E11D48] bg-clip-text text-transparent italic">
              Uttarakhand Himalayas
            </span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Elevate your leadership team with state-of-the-art MICE conference halls, riverside team bonding, safari adventures, and luxury mountain resort buyouts.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#corporate-rfp"
              className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-rose-900/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Itemized Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/916284073623?text=Hello%20Samika%20Holidays%2C%20I%20want%20to%20plan%20a%20corporate%20offsite."
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-slate-100 text-[#0F172A] px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 text-[#06B6D4] fill-[#06B6D4]" />
              <span>WhatsApp Corporate Desk</span>
            </a>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🌟 2. FLOATING EXECUTIVE STATS STRIP                                     */}
      {/* ========================================================================= */}
      <div className="relative -mt-20 sm:-mt-24 z-30 w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          <div className="pt-2 md:pt-0 space-y-2 text-left sm:text-center">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-[#E11D48] flex items-center justify-center mx-auto">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="font-serif text-lg sm:text-xl font-bold text-[#0F172A]">MICE Conference Halls</div>
            <div className="text-xs text-slate-500 font-normal">Hi-Tech AV & Boardroom Setup</div>
          </div>

          <div className="pt-2 md:pt-0 space-y-2 text-left sm:text-center">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#FF6B35] flex items-center justify-center mx-auto">
              <Users className="w-5 h-5" />
            </div>
            <div className="font-serif text-lg sm:text-xl font-bold text-[#0F172A]">Team Bonding Safaris</div>
            <div className="text-xs text-slate-500 font-normal">Corbett Safaris & Rafting Trips</div>
          </div>

          <div className="pt-2 md:pt-0 space-y-2 text-left sm:text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-[#06B6D4] flex items-center justify-center mx-auto">
              <Utensils className="w-5 h-5" />
            </div>
            <div className="font-serif text-lg sm:text-xl font-bold text-[#0F172A]">Gala Dinners & Nights</div>
            <div className="text-xs text-slate-500 font-normal">Riverside Bonfires & DJ Nights</div>
          </div>

          <div className="pt-2 md:pt-0 space-y-2 text-left sm:text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="font-serif text-lg sm:text-xl font-bold text-[#0F172A]">Quote Within 2 Hours</div>
            <div className="text-xs text-slate-500 font-normal">Itemized RFP & Corporate Discounts</div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 3. STANDALONE PROPOSAL RFP FORM SECTION                                */}
      {/* ========================================================================= */}
      <section id="corporate-rfp" className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg space-y-8">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D48] flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>OFFICIAL PROPOSAL REQUEST</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Request an Itemized Corporate Quote
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Fill out your group size and requirements to receive a customized presentation & discounted proposal within 2 hours.
            </p>
          </div>

          {formSubmitted ? (
            <div className="py-12 text-center space-y-3 bg-emerald-50 rounded-3xl border border-emerald-200 max-w-2xl mx-auto p-8">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-emerald-950">Proposal Request Received!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you! Our Head of Executive MICE & Offsites will review your details and contact you via phone/email with customized venue quotes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">Contact Person Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 font-semibold focus:outline-none focus:border-[#E11D48] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">Company / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Innovations Pvt Ltd"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 font-semibold focus:outline-none focus:border-[#E11D48] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 6284 073 623"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 font-semibold focus:outline-none focus:border-[#E11D48] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">Official Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="hr@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 font-semibold focus:outline-none focus:border-[#E11D48] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">Estimated Group Size</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 font-semibold focus:outline-none focus:border-[#E11D48] cursor-pointer">
                    <option>10 - 25 Delegates (Executive Team)</option>
                    <option>25 - 60 Delegates (Department Outing)</option>
                    <option>60 - 150 Delegates (Company Offsite)</option>
                    <option>150+ Full Resort Buyout</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">Preferred Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Jim Corbett, Nainital, Rishikesh"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 font-semibold focus:outline-none focus:border-[#E11D48] focus:bg-white transition-all"
                  />
                </div>

              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white py-4 px-10 rounded-2xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-rose-900/20 cursor-pointer hover:scale-105"
                >
                  Submit Proposal Request →
                </button>
              </div>
            </form>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 4. POPULAR CORPORATE OFFSITE DESTINATIONS                              */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold text-[#E11D48] tracking-widest flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#FF6B35]" />
              <span>OFFSITE LOCATIONS</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Handpicked Corporate Retreat Venues
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Equipped with high-speed fiber internet, projector halls, team activities, Pahadi feasts & luxury suites.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {corporateDestinations.map((dest, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer"
              onClick={() => onOpenEnquiry && onOpenEnquiry(`Corporate Offsite: ${dest.title}`)}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img 
                  src={dest.image} 
                  alt={dest.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3.5 left-3.5 bg-[#0F172A]/90 backdrop-blur-xs text-[#FF6B35] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {dest.capacity}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#E11D48] transition-colors leading-snug">
                    {dest.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {dest.sub}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#E11D48] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Request Details & Dates</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🌟 5. CORPORATE CONSULTATION BANNER                                      */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-[#FF6B35] border border-rose-500/40 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Dedicated MICE Account Manager</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold leading-tight">
              Need a Custom Resort Buyout Proposal?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Speak directly with our senior corporate planner to customize conference halls, team adventure activities, and special corporate packages.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://wa.me/916284073623?text=Hello%20Samika%20Holidays%2C%20I%20want%20to%20plan%20a%20corporate%20retreat."
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-7 py-4 rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-rose-900/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp MICE Concierge</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
