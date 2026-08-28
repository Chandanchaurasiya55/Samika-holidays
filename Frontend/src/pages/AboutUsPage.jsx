import React from 'react';
import {
  Users, MapPin, Award, Headphones, ShieldCheck, Sparkles,
  Hotel, ArrowRight, Compass, Car, Heart, MessageCircle,
  Star, CheckCircle2, Phone, Trees, Mountain, Globe, Eye
} from 'lucide-react';

export default function AboutUsPage({ onOpenEnquiry }) {
  return (
    <div className="space-y-16 pb-20 bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative bg-[#0F172A] text-white min-h-[560px] lg:min-h-[620px] flex items-center justify-center overflow-hidden pt-16 pb-28 px-4 sm:px-6 lg:px-8">
        
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/75 to-black/80" />

        <div className="relative w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto text-center space-y-6 z-10">
          
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-[#FF6B35] border border-rose-500/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Rooted In Himalayan Warmth & Hospitality</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-5xl mx-auto">
            Crafting Unforgettable Journeys Across <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF385C] to-[#E11D48] bg-clip-text text-transparent italic">
              Devbhoomi Uttarakhand
            </span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-base max-w-3xl mx-auto leading-relaxed font-normal">
            More than just a travel brand, Samika Holidays is your trusted mountain concierge. 
            We blend authentic Pahadi warmth with handpicked luxury resorts, bespoke itineraries, and 24/7 dedicated on-trip care.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => onOpenEnquiry('Plan Journey - About Us')}
              className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-rose-900/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Plan Your Journey With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919258677823?text=Hello%20Samika%20Holidays%2C%20I%20want%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noreferrer"
              className="bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-md px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Talk to Our Local Host</span>
            </a>
          </div>

        </div>
      </section>

      {/* FLOATING HIGHLIGHTS OVERLAY */}
      <div className="relative -mt-16 z-20 w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#E11D48] border border-rose-100 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">10,000+ Happy Guests</div>
              <div className="text-xs text-slate-500 font-medium">Memorable mountain holidays</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF6B35] border border-orange-100 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">100% Local Expertise</div>
              <div className="text-xs text-slate-500 font-medium">Native Himalayan planners</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Audited Luxury Stays</div>
              <div className="text-xs text-slate-500 font-medium">Hygiene & view verified</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">24x7 Dedicated Care</div>
              <div className="text-xs text-slate-500 font-medium">Always with you on the road</div>
            </div>
          </div>

        </div>
      </div>

      {/* OUR STORY & VISION COLLAGE */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 relative h-72 rounded-3xl overflow-hidden shadow-lg group">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
                  alt="Himalayan Travelers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-xs font-bold flex items-center gap-1.5">
                  <Trees className="w-4 h-4 text-[#FF6B35]" />
                  <span>Pure Himalayan Wilderness</span>
                </span>
              </div>

              <div className="h-48 rounded-2xl overflow-hidden shadow-md group">
                <img
                  src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80"
                  alt="Corbett Safari"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="h-48 rounded-2xl overflow-hidden shadow-md group">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  alt="Nainital Lake"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -right-3 sm:right-6 bg-[#0F172A] text-white p-4 rounded-2xl shadow-xl border border-rose-500/40 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E11D48] text-white flex items-center justify-center font-bold text-lg">
                ★
              </div>
              <div>
                <div className="text-sm font-bold">100% Verified</div>
                <div className="text-[10px] text-rose-200">Hospitality & Stays</div>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#E11D48]">
              <Mountain className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Our Philosophy & Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Hospitality Rooted in the Spirit of <span className="text-[#E11D48]">Atithi Devo Bhava</span>
            </h2>
            
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              Founded with an intimate love for the mountains and a mission to elevate Himalayan travel, 
              <strong> Samika Holidays</strong> was born out of a desire to connect discerning travelers with authentic hospitality.
            </p>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              From handpicked luxury jungle resorts in Jim Corbett to serene lakeside villas in Nainital, 
              from high-altitude spiritual retreats to fairy-tale destination weddings – every stay in our portfolio 
              is personally vetted for hygiene, scenic brilliance, and impeccable service.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-2xl font-serif font-bold text-[#0F172A]">500+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Audited Properties</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-2xl font-serif font-bold text-[#E11D48]">4.9 / 5</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Average Traveler Rating</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS METRICS BANNER */}
      <section className="bg-[#0F172A] text-white py-14 shadow-inner">
        <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {[
            { count: '10,000+', label: 'Happy Travelers', icon: Users, color: 'text-[#FF6B35]' },
            { count: '500+', label: 'Verified Resorts', icon: Hotel, color: 'text-[#E11D48]' },
            { count: '25+', label: 'Destinations Covered', icon: MapPin, color: 'text-[#06B6D4]' },
            { count: '100+', label: 'Curated Itineraries', icon: Compass, color: 'text-[#7C3AED]' },
            { count: '4.9 ★', label: 'Satisfaction Score', icon: Award, color: 'text-[#F59E0B]' },
            { count: '24x7', label: 'On-Road Assistance', icon: Headphones, color: 'text-emerald-400' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Icon className={`w-6 h-6 ${stat.color} mx-auto`} />
                <div className="font-serif text-2xl sm:text-3xl font-extrabold text-white">{stat.count}</div>
                <div className="text-xs text-slate-300 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BANNER CTA */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-rose-500/30">
          
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">START YOUR HIMALAYAN EXPEDITION</span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold">Have Questions or Need a Custom Plan?</h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Connect directly with our local destination specialists to curate your next family holiday, couple getaway, or corporate retreat.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => onOpenEnquiry('General Support - About Us')}
              className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-7 py-3.5 rounded-2xl font-bold text-xs shadow-xl transition-all cursor-pointer hover:scale-105"
            >
              Talk to Our Expert →
            </button>
            <a
              href="https://wa.me/919258677823?text=Hello%20Samika%20Holidays%2C%20I%20have%20an%20inquiry."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
