import React, { useState } from 'react';
import { 
  Users, Building2, Calendar, MapPin, Send, CheckCircle2, ChevronRight, ChevronLeft,
  Utensils, Car, Compass, Award, ShieldCheck, Headphones, Tag, Phone, Sparkles, MessageCircle
} from 'lucide-react';

export default function CorporatePage({ onOpenEnquiry, postsList = [] }) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3500);
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
    <div className="space-y-16 pb-20 bg-[#F8FAFC] text-slate-900">
      
      {/* Corporate Hero Section with Form Overlay */}
      <section className="relative bg-[#0F172A] text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 min-h-[560px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-black/60" />

        <div className="relative max-w-[97%] 2xl:max-w-[1780px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
          
          {/* Left Corporate Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-rose-500/20 text-[#FF6B35] border border-rose-500/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              <Users className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Samika Executive MICE & Offsites</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold leading-tight text-white">
              Corporate Tours & Offsite Retreats in <br />
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF385C] to-[#E11D48] bg-clip-text text-transparent italic">
                Uttarakhand Himalayas
              </span>
            </h1>

            <p className="text-slate-200 text-xs sm:text-base leading-relaxed max-w-xl font-normal">
              Energize your leadership team and staff with world-class conference facilities, riverside team bonding, and luxury mountain resorts.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-xs font-semibold">Team Building</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#E11D48]" />
                <span className="text-xs font-semibold">Conference Halls</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold">Luxury Lodging</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#06B6D4]" />
                <span className="text-xs font-semibold">Custom Inclusions</span>
              </div>
            </div>
          </div>

          {/* Right Form Overlay */}
          <div className="lg:col-span-5 bg-white/98 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/80 shadow-2xl text-slate-900">
            <h3 className="font-serif text-xl font-bold text-[#0F172A] mb-1">
              Request Corporate Proposal
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Get an itemized itinerary & volume discount quote within 2 hours.
            </p>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="text-base font-bold text-emerald-900">Enquiry Received!</div>
                <p className="text-xs text-slate-600">Our senior MICE manager will call you shortly with customized corporate options.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Contact Person</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#E11D48] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Company Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Organization"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#E11D48] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#E11D48] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Official Email</label>
                    <input
                      type="email"
                      required
                      placeholder="corporate@company.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#E11D48] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Group Size</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#E11D48] cursor-pointer">
                      <option>10 - 25 Delegates</option>
                      <option>25 - 60 Delegates</option>
                      <option>60 - 150 Delegates</option>
                      <option>150+ Full Resort Buyout</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Preferred Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Jim Corbett, Nainital"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-rose-900/20 mt-2 cursor-pointer"
                >
                  Request Official Quotation
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Popular Corporate Destinations */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold text-[#E11D48] tracking-widest">OFFSITE LOCATIONS</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Top Corporate Offsite Hubs in Uttarakhand
          </h2>
          <div className="w-16 h-1 bg-[#E11D48] mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {corporateDestinations.map((dest, idx) => (
            <div
              key={idx}
              className="relative aspect-[16/11] rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-slate-200"
              onClick={() => onOpenEnquiry(`Corporate Tour in ${dest.title}`)}
            >
              <img
                src={dest.image}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-extrabold px-3 py-1 rounded-full">
                {dest.capacity || 'All Group Sizes'}
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <h3 className="font-serif text-xl font-bold group-hover:text-[#FF6B35] transition-colors">{dest.title}</h3>
                <p className="text-xs text-slate-300">{dest.sub}</p>
                <div className="pt-2 text-xs font-bold text-[#FF8A00] flex items-center gap-1">
                  <span>Enquire Offsite Package</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold text-[#E11D48] tracking-widest">COMPLETE EVENT MANAGEMENT</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">End-to-End Corporate Solutions</h2>
            <div className="w-16 h-1 bg-[#E11D48] mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[
              { title: 'Team Building Games', desc: 'Adventure tasks, paintball, raft building & treasure hunts.', icon: Users, color: 'text-rose-600 bg-rose-50' },
              { title: 'MICE Infrastructure', desc: 'AV projectors, stage setups, high-speed WiFi & conference halls.', icon: Building2, color: 'text-orange-600 bg-orange-50' },
              { title: 'Luxury Accommodation', desc: 'Single & twin sharing rooms in premium 4/5 star resorts.', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
              { title: 'Gourmet Catering', desc: 'Customized lavish buffets, tea breaks & cocktail dinners.', icon: Utensils, color: 'text-cyan-600 bg-cyan-50' },
              { title: 'Luxury Fleet Coaches', desc: 'AC Volvos, Tempo Travellers & private executive SUVs.', icon: Car, color: 'text-purple-600 bg-purple-50' },
              { title: 'Customized Billing', desc: 'Corporate invoicing with GST credit and dedicated billing account.', icon: Compass, color: 'text-amber-600 bg-amber-50' },
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="bg-[#F8FAFC] rounded-3xl p-5 border border-slate-200/80 shadow-2xs space-y-3 text-left">
                  <div className={`w-11 h-11 rounded-2xl ${srv.color} flex items-center justify-center shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">{srv.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Counter & CTA */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl border border-slate-800">
          
          <div className="grid grid-cols-3 gap-6 text-center divide-x divide-white/20 w-full lg:w-auto">
            <div className="px-3">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#FF6B35]">500+</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Corporate Groups Hosted</div>
            </div>
            <div className="px-3">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#E11D48]">60+</div>
              <div className="text-xs text-slate-300 font-medium mt-1">MICE Verified Resorts</div>
            </div>
            <div className="px-3">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#06B6D4]">100%</div>
              <div className="text-xs text-slate-300 font-medium mt-1">On-Time Execution</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-end">
            <div className="text-center sm:text-right">
              <div className="font-serif text-lg font-bold">Need a Customized Offsite Quote?</div>
              <p className="text-xs text-slate-300">Talk directly to our corporate accounts desk.</p>
            </div>
            <button
              onClick={() => onOpenEnquiry('Custom Corporate Package')}
              className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shrink-0 shadow-lg shadow-rose-900/30 transition-all hover:scale-105 cursor-pointer"
            >
              Contact Corporate Desk
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
