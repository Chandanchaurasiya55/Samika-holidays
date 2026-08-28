import React from 'react';
import {
  Users, MapPin, Award, Headphones, ShieldCheck, Sparkles,
  Hotel, ArrowRight, Compass, Car, Heart, MessageCircle,
  Star, CheckCircle2, Phone, Trees, Mountain, Globe, Eye
} from 'lucide-react';

export default function AboutUsPage({ onOpenEnquiry }) {
  return (
    <div className="space-y-16 pb-20 bg-[#FAF7F2]/40 min-h-screen">
      
      {/* ========================================================================= */}
      {/* 🌟 ULTRA-LUXURY IMMERSIVE HERO SECTION                                   */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0F382C] text-white min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden pt-16 pb-28 px-4 sm:px-6 lg:px-8">
        
        {/* Background Majestic Himalayas Image with Gradient Blend */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F382C] via-[#0F382C]/75 to-[#0A261E]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent pointer-events-none" />

        <div className="relative w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto text-center space-y-7 z-10">
          
          {/* Top Brand Pill */}
          <div className="inline-flex items-center gap-2 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg animate-in fade-in zoom-in duration-500">
            <Sparkles className="w-4 h-4" />
            <span>Rooted In Himalayan Warmth & Heritage</span>
          </div>

          {/* Majestic Hero Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-5xl mx-auto">
            Crafting Unforgettable Journeys Across <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#F3DFB5] via-[#C8933E] to-[#F3DFB5] bg-clip-text text-transparent italic">
              Devbhoomi Uttarakhand
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-stone-200 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            More than just a travel brand, Atithya Stay is your trusted mountain companion. 
            We blend authentic Pahadi warmth with handpicked luxury resorts, bespoke itineraries, and 24/7 dedicated on-trip care.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenEnquiry('Plan Journey - About Us')}
              className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-8 py-4 rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-[#C8933E]/20 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Plan Your Journey With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919258677823"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md px-7 py-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Talk to Our Local Host</span>
            </a>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🌟 FLOATING GLASSMORPHIC HIGHLIGHTS PILL OVERLAY                          */}
      {/* ========================================================================= */}
      <div className="relative -mt-20 z-20 w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-stone-50 transition-colors">
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-[#0F382C] border border-emerald-100 flex items-center justify-center shrink-0 shadow-xs">
              <Users className="w-6 h-6 text-[#C8933E]" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900">10,000+ Happy Guests</div>
              <div className="text-xs text-stone-500 font-medium">Memorable mountain holidays</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-stone-50 transition-colors">
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-[#0F382C] border border-emerald-100 flex items-center justify-center shrink-0 shadow-xs">
              <MapPin className="w-6 h-6 text-[#C8933E]" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900">100% Local Expertise</div>
              <div className="text-xs text-stone-500 font-medium">Native Himalayan planners</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-stone-50 transition-colors">
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-[#0F382C] border border-emerald-100 flex items-center justify-center shrink-0 shadow-xs">
              <Award className="w-6 h-6 text-[#C8933E]" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900">Verified Luxury Stays</div>
              <div className="text-xs text-stone-500 font-medium">Quality & comfort audited</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-stone-50 transition-colors">
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-[#0F382C] border border-emerald-100 flex items-center justify-center shrink-0 shadow-xs">
              <Headphones className="w-6 h-6 text-[#C8933E]" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900">24x7 Dedicated Care</div>
              <div className="text-xs text-stone-500 font-medium">Always with you on the road</div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 OUR STORY & VISION COLLAGE                                            */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 pt-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Collage with floating badge */}
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
                  <Trees className="w-4 h-4 text-[#C8933E]" />
                  <span>Pure Himalayan Wilderness</span>
                </span>
              </div>

              <div className="h-48 rounded-2xl overflow-hidden shadow-md group">
                <img
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80"
                  alt="Temples of Uttarakhand"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="h-48 rounded-2xl overflow-hidden shadow-md group">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                  alt="Scenic River Valley"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-3 sm:right-6 bg-[#0F382C] text-white p-4 rounded-2xl shadow-xl border border-emerald-700 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8933E] text-stone-950 flex items-center justify-center font-bold text-lg">
                ★
              </div>
              <div>
                <div className="text-sm font-bold">100% Verified</div>
                <div className="text-[10px] text-emerald-200">Hospitality & Stays</div>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#C8933E]">
              <Mountain className="w-3.5 h-3.5" />
              <span>Our Philosophy & Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              Hospitality Rooted in the Ancient Spirit of <span className="text-[#0F382C]">Atithi Devo Bhava</span>
            </h2>
            
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Founded with an intimate love for the mountains and a mission to elevate Himalayan travel, 
              <strong> Atithya Stay</strong> was born out of a desire to connect discerning travelers with authentic hospitality.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              From handpicked luxury jungle resorts in Jim Corbett to serene lakeside villas in Nainital, 
              from high-altitude spiritual retreats to fairy-tale destination weddings – every stay in our portfolio 
              is personally vetted for hygiene, scenic brilliance, and impeccable service.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200">
                <div className="text-2xl font-serif font-bold text-[#0F382C]">500+</div>
                <div className="text-xs text-stone-500 font-medium mt-0.5">Audited Properties</div>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200">
                <div className="text-2xl font-serif font-bold text-[#C8933E]">4.9 / 5</div>
                <div className="text-xs text-stone-500 font-medium mt-0.5">Average Traveler Rating</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 STATS METRICS BANNER                                                  */}
      {/* ========================================================================= */}
      <section className="bg-[#0F382C] text-white py-14 shadow-inner">
        <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {[
            { count: '10,000+', label: 'Happy Travelers', icon: Users },
            { count: '500+', label: 'Verified Resorts', icon: Hotel },
            { count: '25+', label: 'Destinations Covered', icon: MapPin },
            { count: '100+', label: 'Curated Itineraries', icon: Compass },
            { count: '4.9 ★', label: 'Satisfaction Score', icon: Award },
            { count: '24x7', label: 'On-Road Assistance', icon: Headphones },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Icon className="w-6 h-6 text-[#C8933E] mx-auto" />
                <div className="font-serif text-2xl sm:text-3xl font-extrabold text-white">{stat.count}</div>
                <div className="text-xs text-stone-300 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 OUR CORE VALUES                                                       */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#C8933E]">OUR FOUNDATIONAL PILLARS</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">What Drives Us Every Day</h2>
          <div className="w-16 h-1 bg-[#C8933E] mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: 'Authentic Integrity', desc: 'Transparent pricing with zero hidden costs, guaranteed honest recommendations.', icon: ShieldCheck },
            { title: 'Service Excellence', desc: 'Uncompromising standards of cleanliness, culinary delights, and warm hosting.', icon: Award },
            { title: 'Heartfelt Hospitality', desc: 'Treating every traveler as our honored guest, embodying Atithi Devo Bhava.', icon: Heart },
            { title: 'Eco Sustainability', desc: 'Promoting responsible mountain tourism, preserving the fragile Himalayan ecology.', icon: Sparkles },
            { title: 'Guest Safety First', desc: '24/7 emergency response, verified mountain drivers, and round-the-clock safety.', icon: ShieldCheck },
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 space-y-4 group">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#0F382C] group-hover:bg-[#0F382C] group-hover:text-[#C8933E] flex items-center justify-center transition-colors border border-stone-200">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900">{val.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 WHAT MAKES US DIFFERENT                                               */}
      {/* ========================================================================= */}
      <section className="bg-white py-16 border-y border-stone-200">
        <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C8933E]">THE ATITHYA ADVANTAGE</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Why Travelers Choose Atithya Stay</h2>
            <div className="w-16 h-1 bg-[#C8933E] mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[
              { title: 'Handpicked Stays', desc: 'Personally audited boutique resorts & luxury hotels.', icon: Hotel },
              { title: 'Curated Experiences', desc: 'Secret trails, stargazing, river rafting & safari.', icon: Sparkles },
              { title: 'Seamless Transfers', desc: 'Expert mountain drivers and sanitized luxury cabs.', icon: Car },
              { title: 'Custom Itineraries', desc: 'Bespoke packages tailored to your dates and budget.', icon: Compass },
              { title: '24x7 Trip Concierge', desc: 'A dedicated trip manager assigned to every booking.', icon: Headphones },
              { title: 'Best Value Promise', desc: 'Direct hotel tie-ups ensure unmatched price & value.', icon: Award },
            ].map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <div key={idx} className="bg-[#FAF7F2] rounded-2xl p-5 border border-stone-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-white text-[#0F382C] shadow-2xs flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#C8933E]" />
                  </div>
                  <h4 className="font-bold text-xs text-stone-900">{diff.title}</h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed">{diff.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 READY TO EXPLORE BANNER CTA                                           */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-[#0F382C] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-emerald-800 relative overflow-hidden">
          
          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8933E]">START YOUR HIMALAYAN EXPEDITION</span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold">Have Questions or Need a Custom Plan?</h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Connect directly with our local destination specialists to curate your next family holiday, couple getaway, or corporate retreat.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 shrink-0">
            <button
              onClick={() => onOpenEnquiry('General Support - About Us')}
              className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-7 py-3.5 rounded-2xl font-bold text-xs shadow-xl transition-all cursor-pointer"
            >
              Talk to Our Expert →
            </button>
            <a
              href="https://wa.me/919258677823"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-md"
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
