import React from 'react';
import {
  Users, MapPin, Award, Headphones, ShieldCheck, Sparkles,
  Hotel, ArrowRight, Compass, Car, Heart, MessageCircle,
  Star, CheckCircle2, Phone, Trees, Mountain, Globe, Eye,
  Shield, Clock, Utensils, Waves
} from 'lucide-react';

export default function AboutUsPage({ onOpenEnquiry }) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* ========================================================================= */}
      {/* 🌟 1. HERO SECTION (CINEMATIC SUNSET HIMALAYAN PANORAMA)                  */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0F172A] text-white min-h-[580px] lg:min-h-[640px] flex flex-col justify-between overflow-hidden pt-14 pb-28 px-4 sm:px-6 lg:px-8">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=90')` }}
        />
        {/* Gradient Overlays matching logo dark navy */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-transparent to-transparent" />

        {/* Decorative Autumn Leaf Accent */}
        <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none opacity-80 z-10">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <path d="M-20 -20 Q40 40 80 10 Q120 -20 160 30" stroke="#E11D48" strokeWidth="3" fill="none" />
            <path d="M30 20 C20 40, 50 60, 40 80 C60 70, 80 50, 60 30 Z" fill="#FF6B35" opacity="0.9" />
            <path d="M70 15 C85 35, 115 30, 110 55 C125 40, 115 15, 95 10 Z" fill="#E11D48" opacity="0.85" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto text-center space-y-6 my-auto pt-6">
          
          <div className="inline-flex items-center gap-2 bg-[#E11D48]/20 text-[#FF6B35] border border-[#E11D48]/40 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4 text-[#E11D48]" />
            <span>Rooted In Himalayan Warmth & Hospitality</span>
          </div>

          <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#E11D48] font-bold tracking-wide">
            The Story of Samika Holidays
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] max-w-5xl mx-auto drop-shadow-md">
            Crafting Unforgettable Journeys Across <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF385C] to-[#E11D48] bg-clip-text text-transparent italic">
              Devbhoomi Uttarakhand
            </span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-base max-w-3xl mx-auto leading-relaxed font-normal">
            More than just a travel brand, Samika Holidays is your trusted local mountain concierge. 
            We blend authentic Pahadi warmth with handpicked luxury resorts, bespoke itineraries, and 24/7 dedicated on-trip care.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry('Plan Journey - About Us')}
              className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-rose-900/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan Your Custom Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/916284073623?text=Hello%20Samika%20Holidays%2C%20I%20want%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-slate-100 text-[#0F172A] px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 text-[#06B6D4] fill-[#06B6D4]" />
              <span>Talk to Our Local Host</span>
            </a>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🌟 2. FLOATING METRICS TRUST STRIP                                        */}
      {/* ========================================================================= */}
      <div className="relative -mt-20 z-30 w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          <div className="pt-2 md:pt-0 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-black text-[#0F172A]">10,000+</div>
            <div className="text-xs text-slate-500 font-medium">Happy Travelers Hosted</div>
          </div>

          <div className="pt-2 md:pt-0 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-black text-[#E11D48]">500+</div>
            <div className="text-xs text-slate-500 font-medium">Audited & Verified Resorts</div>
          </div>

          <div className="pt-2 md:pt-0 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-black text-[#FF6B35]">4.9 ★</div>
            <div className="text-xs text-slate-500 font-medium">Average Traveler Rating</div>
          </div>

          <div className="pt-2 md:pt-0 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-black text-[#06B6D4]">100%</div>
            <div className="text-xs text-slate-500 font-medium">On-Ground Local Concierge</div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 3. OUR HERITAGE STORY & PHOTO COLLAGE (SPLIT SCREEN)                   */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D48] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#FF6B35]" />
                <span>OUR ORIGINS & PASSION</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0F172A] leading-tight">
                Born in the Himalayas, Dedicated to Excellence
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Founded in Uttarakhand, <strong className="text-slate-900 font-bold">Samika Holidays</strong> was built with a simple mission: to eliminate common travel hassles such as unvetted hotel claims, hidden middleman markups, and poor local coordination.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We personally inspect every resort, train experienced mountain drivers, and design custom itineraries around your family's pace. Whether it's an adventurous tiger safari in Jim Corbett, a peaceful lake holiday in Nainital, or a sacred pilgrimage to Kedarnath, we are with you at every step.
            </p>

            {/* Checkmark Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                '100% Physically Audited Resorts',
                'Custom Flexible Family Packages',
                'Zero Hidden Charges & Honest Rates',
                'Emergency 24x7 Road Support',
                'VIP Helicopter & Yatra Care',
                'Handpicked Local Driver Guides'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-rose-50 text-[#E11D48] border border-rose-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry('Heritage Story Inquiry')}
                className="bg-[#0F172A] hover:bg-[#E11D48] text-white px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Discover Our Travel Packages</span>
                <ArrowRight className="w-4 h-4 text-[#FF6B35]" />
              </button>
            </div>

          </div>

          {/* Right HD Photo Grid Column */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/5] bg-slate-100 group">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
                  alt="Nainital Lake Vista" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1 text-left">
                <div className="text-xs font-bold text-[#E11D48]">Nainital & Lake District</div>
                <div className="text-[11px] text-slate-500 font-medium">Boutique Lakeside Stays</div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-[#0F172A] text-white p-5 rounded-3xl border border-slate-800 shadow-sm space-y-2 text-left">
                <div className="flex items-center gap-1.5 text-[#FF6B35] font-extrabold text-xs">
                  <Sparkles className="w-4 h-4 text-[#E11D48]" />
                  <span>Pahadi Hospitality</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  "Atithi Devo Bhava is in our blood. Every guest receives authentic mountain care."
                </p>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/5] bg-slate-100 group">
                <img 
                  src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80" 
                  alt="Jim Corbett Tiger Safari" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 4. CORE PILLARS & VALUES GRID (4 GLASS CARDS)                          */}
      {/* ========================================================================= */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#E11D48]">THE SAMIKA PROMISE</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">Built On Four Pillars of Trust</h2>
            <div className="w-16 h-1 bg-[#E11D48] mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Audited Luxury Stays',
                desc: 'Every hotel, cottage, and resort is physically vetted for hygiene, mountain views, and delicious food.',
                icon: Hotel,
                color: 'text-rose-600 bg-rose-50 border-rose-200'
              },
              {
                title: 'Bespoke Itineraries',
                desc: 'Tailored for families, newlyweds, spiritual yatris, and corporate offsite retreats with flexible pacing.',
                icon: Compass,
                color: 'text-orange-600 bg-orange-50 border-orange-200'
              },
              {
                title: '24/7 Dedicated Care',
                desc: 'A personal travel manager is assigned to your trip for instant road support & concierge help.',
                icon: Headphones,
                color: 'text-cyan-600 bg-cyan-50 border-cyan-200'
              },
              {
                title: 'Direct Unbeatable Rates',
                desc: 'Direct resort partnerships mean zero hidden fees and guaranteed best pricing for all packages.',
                icon: ShieldCheck,
                color: 'text-amber-600 bg-amber-50 border-amber-200'
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-[#F8FAFC] rounded-3xl p-7 border border-slate-200 shadow-2xs hover:shadow-xl transition-all duration-300 space-y-4 text-left group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${pillar.color} border flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-[#E11D48] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 5. REGIONAL COVERAGE SHOWCASE                                          */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-left space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D48] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#FF6B35]" />
            <span>REGIONAL EXPERTISE</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Our On-Ground Destinations in Uttarakhand
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Verified resort networks and local coordination desks operating in every major Himalayan destination.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Jim Corbett', tag: 'Wildlife Safaris', img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80' },
            { name: 'Nainital', tag: 'Lake Resorts', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
            { name: 'Rishikesh', tag: 'River Rafting & Yoga', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
            { name: 'Mussoorie', tag: 'Hill Station Vistas', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80' },
            { name: 'Kainchi Dham', tag: 'Spiritual Ashram', img: '/kainchi_dham.png' },
            { name: 'Kedarnath', tag: 'High Yatra Shrines', img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80' },
          ].map((item, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden aspect-[4/5] group bg-slate-900 border border-slate-200">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-left space-y-0.5">
                <div className="font-serif font-bold text-sm group-hover:text-[#FF6B35] transition-colors">{item.name}</div>
                <div className="text-[10px] text-slate-300">{item.tag}</div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🌟 6. BOTTOM CONSULTATION BANNER                                         */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-[#FF6B35] border border-rose-500/40 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Personalized Holiday Concierge</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold leading-tight">
              Ready to Explore Uttarakhand?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Connect with our local travel managers today for custom itinerary planning, verified resort bookings, and special seasonal discounts.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry('Direct Trip Plan - About Us')}
              className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-7 py-4 rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-rose-900/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Custom Itinerary</span>
            </button>

            <a
              href="https://wa.me/916284073623?text=Hello%20Samika%20Holidays%2C%20I%20want%20to%20plan%20a%20trip."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
