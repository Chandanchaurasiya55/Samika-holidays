import React, { useState } from 'react';
import { 
  MapPin, Calendar, Users, Search, Tag, ShieldCheck, Hotel, PhoneCall, 
  Sparkles, Compass, Utensils, Car, Flame, Heart, Award, Clock, Headphones, RefreshCw, MessageCircle, X, ChevronRight
} from 'lucide-react';

export default function TourPackagesPage({ onOpenEnquiry, onSelectPackage, packagesList = [], initialDestination = '' }) {
  const [activeCategory, setActiveCategory] = useState('All Packages');
  const [searchDestination, setSearchDestination] = useState(initialDestination || '');
  const [isDestOpen, setIsDestOpen] = useState(false);

  React.useEffect(() => {
    if (initialDestination !== undefined) {
      setSearchDestination(initialDestination);
    }
  }, [initialDestination]);

  const categories = [
    { id: 'All Packages', label: 'All Packages', icon: Sparkles },
    { id: 'Family Tours', label: 'Family Tours', icon: Users },
    { id: 'Adventure', label: 'Adventure', icon: Compass },
    { id: 'Spiritual Tours', label: 'Spiritual Tours', icon: Award },
    { id: 'Honeymoon', label: 'Honeymoon', icon: Heart },
    { id: 'Corporate Tours', label: 'Corporate Tours', icon: Tag },
    { id: 'Student Groups', label: 'Student Groups', icon: Users },
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

    // Tokens matching (e.g. "Jim Corbett National Park" matches "Jim Corbett Wildlife Tour")
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

  const packageDestinations = ['Nainital', 'Jim Corbett', 'Chardham', 'Mussoorie', 'Rishikesh', 'Bhimtal', 'Auli', 'Chopta', 'Mukteshwar', 'Kausani'];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-[#0F382C] text-white pt-16 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[420px] flex flex-col justify-center">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')` }}
        />

        <div className="relative max-w-7xl mx-auto text-center space-y-4 z-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Tour Packages
          </h1>
          <p className="text-stone-200 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Curated experiences for every kind of traveler
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-[#C8933E]">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xs px-4 py-2 rounded-full border border-[#C8933E]/30">
              <Tag className="w-4 h-4" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xs px-4 py-2 rounded-full border border-[#C8933E]/30">
              <Hotel className="w-4 h-4" />
              <span>Verified Hotels</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xs px-4 py-2 rounded-full border border-[#C8933E]/30">
              <Headphones className="w-4 h-4" />
              <span>24x7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Perfectly Floating Search Bar */}
      <div className="relative -mt-20 sm:-mt-24 z-30 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-white rounded-2xl p-5 shadow-2xl border border-stone-200 text-stone-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
            
            {/* Destination Input with Custom Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 focus-within:border-[#0F382C] focus-within:ring-1 focus-within:ring-[#0F382C] transition-all">
                <MapPin className="w-5 h-5 text-[#0F382C] shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[10px] font-bold uppercase text-stone-400">Destination</label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Where are you going?"
                    value={searchDestination}
                    onFocus={() => setIsDestOpen(true)}
                    onBlur={() => setTimeout(() => setIsDestOpen(false), 200)}
                    onChange={(e) => {
                      setSearchDestination(e.target.value);
                      setIsDestOpen(true);
                    }}
                    className="w-full bg-transparent text-xs font-bold text-stone-800 placeholder-stone-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Custom White Dropdown Menu */}
              {isDestOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200/90 py-2 z-50 max-h-64 overflow-y-auto divide-y divide-stone-100 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSearchDestination('');
                      setIsDestOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-stone-700 hover:bg-emerald-50 hover:text-[#0F382C] flex items-center justify-between transition-colors"
                  >
                    <span>All Tour Packages</span>
                  </button>
                  {packageDestinations
                    .filter(d => !searchDestination || d.toLowerCase().includes(searchDestination.toLowerCase().trim()))
                    .map((dest) => (
                      <button
                        key={dest}
                        type="button"
                        onMouseDown={() => {
                          setSearchDestination(dest);
                          setIsDestOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-bold text-stone-800 hover:bg-amber-50 hover:text-[#C8933E] flex items-center gap-2 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#C8933E]" />
                        <span>{dest}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Check-in */}
            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <Calendar className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Check-in</label>
                <input
                  type="date"
                  className="w-full bg-transparent text-xs font-semibold text-stone-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <Calendar className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Check-out</label>
                <input
                  type="date"
                  className="w-full bg-transparent text-xs font-semibold text-stone-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Guests & Rooms */}
            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <Users className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Guests & Rooms</label>
                <select className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer">
                  <option>2 Guests, 1 Room</option>
                  <option>4 Guests, 2 Rooms</option>
                  <option>6+ Group Tour</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={() => setActiveCategory('All Packages')}
              className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-4 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors h-full"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

          </div>
        </div>
      </div>

      {/* Filter Category Pills Bar */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 pt-4 space-y-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'All Packages'
              ? packages.length
              : packages.filter(p => p.category && p.category.toLowerCase().includes(cat.id.toLowerCase())).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id === 'All Packages') {
                    setSearchDestination('');
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#0F382C] text-white border-[#0F382C] shadow-md'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C8933E]' : 'text-stone-500'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Search / Destination Filter Bar */}
        {searchDestination && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50/90 border border-amber-200/90 rounded-2xl px-4 py-2.5 text-xs text-stone-800 animate-in fade-in">
            <div className="flex items-center gap-2 font-bold">
              <MapPin className="w-4 h-4 text-[#C8933E] shrink-0" />
              <span>
                Filtering by: <span className="text-[#0F382C] font-extrabold">"{searchDestination}"</span> ({filteredPackages.length} {filteredPackages.length === 1 ? 'package' : 'packages'} found)
              </span>
            </div>
            <button
              onClick={() => setSearchDestination('')}
              className="bg-white hover:bg-red-50 text-red-600 hover:text-red-700 font-extrabold px-3 py-1 rounded-xl border border-red-200 flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
            >
              <span>Clear Filter (Show All {packages.length})</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* Package Cards Grid */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-stone-200 shadow-sm max-w-xl mx-auto space-y-4 my-8">
            <div className="w-16 h-16 bg-amber-50 text-[#C8933E] rounded-2xl flex items-center justify-center mx-auto border border-amber-200">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">No Packages Found</h3>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              We couldn't find packages matching "{searchDestination || activeCategory}". Try resetting filters to explore all tours.
            </p>
            <button
              onClick={() => {
                setSearchDestination('');
                setActiveCategory('All Packages');
              }}
              className="bg-[#0F382C] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#0C2D23] transition-all shadow-md"
            >
              View All Tour Packages ({packages.length})
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {filteredPackages.map((pkg) => {
              const specsList = Array.isArray(pkg.specs) && pkg.specs.length > 0
                ? pkg.specs
                : (Array.isArray(pkg.inclusions) && pkg.inclusions.length > 0
                    ? pkg.inclusions
                    : ['Verified Hotel', 'Sightseeing', 'Daily Meals', 'Transport']);

              return (
                <div
                  key={pkg.id}
                  onClick={() => onSelectPackage(pkg)}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-stone-100">
                    <img
                      src={pkg.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-md border border-white/20">
                      {pkg.duration || '3N / 4D'}
                    </span>
                    {pkg.category && (
                      <span className="absolute top-4 right-4 bg-[#0F382C]/90 backdrop-blur-md text-[#C8933E] text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-[#C8933E]/30 uppercase tracking-wider">
                        {pkg.category}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#0F382C] transition-colors leading-snug">
                        {pkg.title}
                      </h3>
                      <p className="text-xs font-medium text-stone-500 mt-1 line-clamp-2">
                        {pkg.subtitle || 'Experience the beauty of Uttarakhand with Samika Holidays'}
                      </p>

                      {/* Specs Icons */}
                      <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600 font-medium">
                        {specsList.slice(0, 4).map((spec, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <Hotel className="w-3.5 h-3.5 text-[#0F382C] shrink-0" />
                            <span className="truncate max-w-[110px]">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & CTA Button */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">From</span>
                        <div className="text-base font-extrabold text-stone-900">
                          ₹{pkg.price} <span className="text-[11px] font-normal text-stone-500">/{pkg.priceUnit || 'person'}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPackage(pkg);
                        }}
                        className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1"
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
      <section className="bg-white py-16 border-y border-stone-200">
        <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 text-center space-y-12">
          
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#0F382C]">
              Why Book With Samika Holidays?
            </h2>
            <div className="w-16 h-0.5 bg-[#C8933E] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { title: 'Best Price Guarantee', desc: 'We ensure the best prices always', icon: Tag },
              { title: 'Verified Hotels', desc: 'Handpicked & quality assured stays', icon: ShieldCheck },
              { title: '24x7 Support', desc: 'We are here to help you anytime', icon: Headphones },
              { title: 'Customized Packages', desc: 'Tailor-made for your unique needs', icon: Compass },
              { title: 'Safe & Secure Booking', desc: '100% secure payment & data protection', icon: ShieldCheck },
              { title: 'Flexible Cancellation', desc: 'Easy cancellation on selected packages', icon: RefreshCw },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-4 rounded-xl text-center space-y-2 border border-transparent hover:border-stone-200 hover:bg-[#FAF7F2] transition-all">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#0F382C] flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xs text-stone-900">{feature.title}</h4>
                  <p className="text-[11px] text-stone-500 leading-tight">{feature.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Help Banner CTA */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-[#0F382C] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Headphones className="w-7 h-7 text-[#C8933E]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold">Need Help Choosing a Package?</h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-1">
                Our travel experts are here to help you plan the perfect trip.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenEnquiry('Package Consultation')}
              className="border-2 border-[#C8933E] text-[#C8933E] hover:bg-[#C8933E] hover:text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all"
            >
              Talk to Our Expert
            </button>
            
            <a
              href="https://wa.me/919258677823"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Or WhatsApp Us +91 9258677823</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
