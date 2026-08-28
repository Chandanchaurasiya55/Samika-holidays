import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Users, Search, Tag, ShieldCheck, Hotel, PhoneCall, 
  Sparkles, Compass, Utensils, Car, Flame, Heart, Award, Clock, Headphones, RefreshCw, MessageCircle, X, ChevronRight, Check
} from 'lucide-react';

export default function TourPackagesPage({ onOpenEnquiry, onSelectPackage, packagesList = [], initialDestination = '' }) {
  const [activeCategory, setActiveCategory] = useState('All Packages');
  const [searchDestination, setSearchDestination] = useState(initialDestination || '');
  const [isDestOpen, setIsDestOpen] = useState(false);

  useEffect(() => {
    if (initialDestination !== undefined) {
      setSearchDestination(initialDestination);
    }
  }, [initialDestination]);

  const categories = [
    { id: 'All Packages', label: 'All Packages', icon: Sparkles },
    { id: 'Family Tours', label: 'Family Tours', icon: Users },
    { id: 'Wildlife & Safari', label: 'Wildlife & Safari', icon: Compass },
    { id: 'Spiritual Tours', label: 'Spiritual Tours', icon: Award },
    { id: 'Honeymoon', label: 'Honeymoon', icon: Heart },
    { id: 'Adventure', label: 'Adventure', icon: Flame },
    { id: 'Corporate Tours', label: 'Corporate & Groups', icon: Tag },
  ];

  const packages = packagesList || [];

  const filteredPackages = packages.filter(pkg => {
    // 1. Category check
    const matchesCategory = 
      !activeCategory || 
      activeCategory === 'All Packages' || 
      (pkg.category && pkg.category.toLowerCase().includes(activeCategory.toLowerCase())) ||
      (activeCategory.toLowerCase().includes(pkg.category?.toLowerCase() || ''));

    // 2. Search query check
    const q = (searchDestination || '').trim().toLowerCase();
    if (!q) return matchesCategory;

    const tokens = q.split(/[\s,-]+/).filter(t => t.length > 1);
    const searchString = [
      pkg.title || '',
      pkg.subtitle || '',
      pkg.category || '',
      pkg.dest || '',
      ...(Array.isArray(pkg.highlights) ? pkg.highlights : []),
      ...(Array.isArray(pkg.specs) ? pkg.specs : [])
    ].join(' ').toLowerCase();

    const matchesSearch = 
      searchString.includes(q) || 
      tokens.some(t => searchString.includes(t));

    return matchesCategory && matchesSearch;
  });

  const packageDestinations = [
    'Jim Corbett', 'Nainital', 'Rishikesh', 'Mussoorie', 'Kainchi Dham', 
    'Bhimtal', 'Auli', 'Chopta', 'Kedarnath', 'Mukteshwar', 'Kausani'
  ];

  return (
    <div className="space-y-16 pb-20 bg-[#F8FAFC] text-slate-900">
      
      {/* Hero Section */}
      <section className="relative bg-[#0F172A] text-white pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[440px] flex flex-col justify-center">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/40" />

        <div className="relative max-w-4xl mx-auto text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-[#FF6B35] border border-rose-500/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Samika Holidays • Curated Tour Itineraries</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Uttarakhand Tour Packages <br />
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF385C] to-[#E11D48] bg-clip-text text-transparent italic">
              Crafted for Every Traveler
            </span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            From Jim Corbett jungle adventures and Nainital lake retreats to divine Chardham pilgrimages.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-slate-200">
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <Tag className="w-3.5 h-3.5 text-[#FF6B35]" /> Best Price Guarantee
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <Hotel className="w-3.5 h-3.5 text-[#E11D48]" /> Verified Resort Stays
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <Headphones className="w-3.5 h-3.5 text-[#06B6D4]" /> 24/7 Dedicated Driver & Guide
            </span>
          </div>
        </div>
      </section>

      {/* Floating Search Bar */}
      <div className="relative -mt-20 sm:-mt-24 z-30 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200/90">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
            
            {/* Destination dropdown */}
            <div className="relative">
              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-[#E11D48] focus-within:bg-white transition-all">
                <MapPin className="w-5 h-5 text-[#E11D48] shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[10px] font-bold uppercase text-slate-400">Search Destination</label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="e.g. Corbett, Nainital, Kedarnath..."
                    value={searchDestination}
                    onFocus={() => setIsDestOpen(true)}
                    onBlur={() => setTimeout(() => setIsDestOpen(false), 200)}
                    onChange={(e) => {
                      setSearchDestination(e.target.value);
                      setIsDestOpen(true);
                    }}
                    className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {isDestOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95">
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSearchDestination('');
                      setIsDestOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-[#E11D48] flex items-center justify-between cursor-pointer"
                  >
                    <span>All Destinations</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{packages.length} Packages</span>
                  </button>

                  {packageDestinations.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onMouseDown={() => {
                        setSearchDestination(d);
                        setIsDestOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-800 hover:bg-rose-50 hover:text-[#E11D48] flex items-center gap-2 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>{d}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Travel Date */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <Calendar className="w-5 h-5 text-[#0F172A] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-slate-400">Preferred Month</label>
                <select className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer">
                  <option>Next 30 Days (Instant)</option>
                  <option>Upcoming Summer Holidays</option>
                  <option>Autumn / Festival Season</option>
                  <option>Winter Snow Season</option>
                </select>
              </div>
            </div>

            {/* Traveler Group */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <Users className="w-5 h-5 text-[#0F172A] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-slate-400">Travelers</label>
                <select className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer">
                  <option>Couple (2 Adults)</option>
                  <option>Family (3-5 Members)</option>
                  <option>Small Group (6-10 Members)</option>
                  <option>Large Corporate Group (15+)</option>
                </select>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onOpenEnquiry('Custom Package Booking Inquiry')}
              className="w-full bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white py-4 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20 transition-all h-full cursor-pointer hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Custom Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white shadow-md shadow-rose-500/20 scale-105'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-[#E11D48] hover:text-[#E11D48]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tour Package Cards Grid */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-extrabold text-[#E11D48] tracking-widest">HANDPICKED ITINERARIES</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">{activeCategory} in Uttarakhand</h2>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
            {filteredPackages.length} Available Packages
          </span>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-xl mx-auto">
            <Compass className="w-12 h-12 text-[#E11D48] mx-auto" />
            <h3 className="font-serif text-xl font-bold text-slate-800">No Packages Matching Your Search</h3>
            <p className="text-xs text-slate-500">
              We create 100% bespoke mountain itineraries tailored to your dates and budget.
            </p>
            <button
              onClick={() => onOpenEnquiry('Custom Uttarakhand Package')}
              className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-6 py-3 rounded-2xl text-xs font-bold hover:opacity-90"
            >
              Request Custom Package
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => {
              const specsList = Array.isArray(pkg.specs) ? pkg.specs : [];
              return (
                <div
                  key={pkg.id}
                  onClick={() => onSelectPackage && onSelectPackage(pkg)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={pkg.image || pkg.images?.[0] || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Duration Badge */}
                      <div className="absolute top-3.5 left-3.5 bg-[#0F172A]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                        <Clock className="w-3 h-3 text-[#FF6B35]" />
                        <span>{pkg.duration || '3 Days / 2 Nights'}</span>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{pkg.rating || '4.9'}</span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 space-y-4">
                      <div>
                        <span className="text-[10px] font-extrabold text-[#E11D48] uppercase tracking-wider block mb-1">
                          {pkg.category || 'Uttarakhand Tour'}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#E11D48] transition-colors leading-snug">
                          {pkg.title}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {pkg.subtitle || 'Experience the beauty of Uttarakhand with Samika Holidays'}
                        </p>

                        {/* Specs Grid */}
                        {specsList.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100">
                            {specsList.slice(0, 3).map((spec, idx) => (
                              <span key={idx} className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md font-semibold text-slate-600">
                                ✓ {spec}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">From</span>
                      <div className="text-lg font-extrabold text-slate-900">
                        ₹{pkg.price} <span className="text-xs font-normal text-slate-500">/{pkg.priceUnit || 'person'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/919258677823?text=${encodeURIComponent(`Hello Samika Holidays, I want to book the package: ${pkg.title} (Price: ₹${pkg.price})`)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-9 h-9 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                      </a>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPackage(pkg);
                        }}
                        className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-900/10 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Why Book With Samika Holidays? */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#E11D48]">PEACE OF MIND TRAVEL</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Why Book With Samika Holidays?
            </h2>
            <div className="w-16 h-1 bg-[#E11D48] mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { title: 'Tailored Plans', desc: 'Customizable day-wise tours.', icon: Compass, color: 'text-rose-600 bg-rose-50' },
              { title: 'Best Rate Guarantee', desc: 'Direct resort and transport tie-ups.', icon: Award, color: 'text-orange-600 bg-orange-50' },
              { title: 'Experienced Drivers', desc: 'Expert hills chauffeurs.', icon: Car, color: 'text-cyan-600 bg-cyan-50' },
              { title: 'Audited Stays', desc: 'Vetted hygienic hotels & camps.', icon: Hotel, color: 'text-purple-600 bg-purple-50' },
              { title: '24x7 Trip Concierge', desc: 'On-ground assistance anytime.', icon: Headphones, color: 'text-emerald-600 bg-emerald-50' },
              { title: 'Instant Confirmation', desc: 'Hassle-free booking vouchers.', icon: ShieldCheck, color: 'text-amber-600 bg-amber-50' },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="space-y-3 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
                  <div className={`w-11 h-11 rounded-xl ${feature.color} flex items-center justify-center mx-auto shadow-2xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">{feature.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
