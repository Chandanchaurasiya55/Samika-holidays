import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Users, Search, Star, ShieldCheck, Tag, Headphones, 
  Car, Hotel, Compass, Award, Phone, MessageCircle, ChevronRight, ChevronLeft,
  Sparkles, Camera, Utensils, Wifi, Waves, Trees, CheckCircle2, LayoutGrid,
  Luggage, Snowflake, Tent, Home, Leaf, Heart, BookOpen, Clock, X
} from 'lucide-react';

const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
};

export default function HomePage({ 
  onOpenEnquiry, 
  onSelectPackage, 
  onSelectHotel, 
  onSelectBlog,
  setActiveTab, 
  featuredPackages = [],
  packagesList = [],
  hotelsList = [],
  destinationsList = [],
  blogsList = [],
  onNavigateToPackages
}) {
  const [activeResortImage, setActiveResortImage] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [searchDest, setSearchDest] = useState('');
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);

  const heroImages = [
    '/nainital_hero.png',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80'
  ];

  // Extended slides with cloned first slide for infinite seamless right-to-left loop
  const extendedHeroImages = [...heroImages, heroImages[0]];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitionEnabled(true);
      setCurrentHeroIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroTransitionEnd = () => {
    if (currentHeroIndex >= heroImages.length) {
      setIsTransitionEnabled(false);
      setCurrentHeroIndex(0);
    }
  };

  useEffect(() => {
    if (!isTransitionEnabled) {
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isTransitionEnabled]);

  const resortImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  ];

  const [activeDestCategory, setActiveDestCategory] = useState('All');

  const allPackages = packagesList.length > 0 ? packagesList : featuredPackages;
  const allHotels = hotelsList || [];

  const defaultPopularDestinations = [
    { 
      id: 'dest-1',
      searchKey: 'Jim Corbett',
      name: 'Jim Corbett National Park', 
      tag: 'Wildlife Adventure in Nainital District', 
      category: 'Wildlife',
      rating: '4.8',
      iconType: 'paw',
      nightInfo: 'Tour Package • 1 Night',
      img: '/corbett_tiger.png' 
    },
    { 
      id: 'dest-2',
      searchKey: 'Nainital',
      name: 'Nainital Lake City', 
      tag: 'Emerald Lakes, Boating & Hill Views', 
      category: 'Lakes',
      rating: '4.9',
      iconType: 'waves',
      nightInfo: 'Tour Package • 1 Night',
      img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'dest-3',
      searchKey: 'Kainchi Dham',
      name: 'Kainchi Dham & Ashram', 
      tag: 'Seek Peace & Blessings in Divine Abode', 
      category: 'Spiritual',
      rating: '5.0',
      iconType: 'temple',
      nightInfo: 'Tour Package',
      img: '/kainchi_dham.png' 
    },
    { 
      id: 'dest-4',
      searchKey: 'Mussoorie',
      name: 'Mussoorie & Dhanaulti', 
      tag: 'Clouds of Hills & Pure Relaxation', 
      category: 'Hills',
      rating: '4.8',
      iconType: 'tent',
      nightInfo: 'Tour Package • 1 Night',
      img: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'dest-5',
      searchKey: 'Rishikesh',
      name: 'Rishikesh Yoga Capital', 
      tag: 'Ganga Aarti, River Rafting & Wellness', 
      category: 'Spiritual',
      rating: '4.7',
      iconType: 'yoga',
      nightInfo: 'Tour Package',
      img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'dest-6',
      searchKey: 'Auli',
      name: 'Auli Snow & Ski Paradise', 
      tag: '360° Nanda Devi Views & Snow Sports', 
      category: 'Snow',
      rating: '4.9',
      iconType: 'snow',
      nightInfo: 'Tour Package',
      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'dest-7',
      searchKey: 'Bhimtal',
      name: 'Bhimtal & Naukuchiatal', 
      tag: 'Serene Lakeside Life & Quiet Peace', 
      category: 'Lakes',
      rating: '4.8',
      iconType: 'leaf',
      nightInfo: 'Tour Package',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'dest-8',
      searchKey: 'Mukteshwar',
      name: 'Mukteshwar Dham', 
      tag: 'Apple Orchards & Himalayan View Retreats', 
      category: 'Hills',
      rating: '4.8',
      iconType: 'home',
      nightInfo: 'Tour Package',
      img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' 
    }
  ];

  const renderDestIcon = (iconType) => {
    switch (iconType) {
      case 'paw':
        return (
          <svg className="w-4 h-4 text-emerald-300 fill-current" viewBox="0 0 24 24">
            <circle cx="6" cy="7" r="2" />
            <circle cx="11" cy="4" r="2" />
            <circle cx="16" cy="6" r="2" />
            <circle cx="19" cy="11" r="2" />
            <path d="M14.5 14.5c-.8-.8-2.2-.8-3 0-1.8 1.8-4.5 1-4.5 3.5 0 2.2 2.8 4 6 4s6-1.8 6-4c0-2.5-2.7-1.7-4.5-3.5z" />
          </svg>
        );
      case 'waves':
        return <Waves className="w-4 h-4 text-emerald-300" />;
      case 'temple':
        return (
          <svg className="w-4 h-4 text-emerald-300 fill-current" viewBox="0 0 24 24">
            <path d="M12 2L4 7v2h16V7l-8-5zm6 9h-2v8h2v-8zm-5 0h-2v8h2v-8zm-5 0H6v8h2v-8zM2 21h20v2H2v-2z"/>
          </svg>
        );
      case 'tent':
        return <Tent className="w-4 h-4 text-emerald-300" />;
      case 'yoga':
        return <Sparkles className="w-4 h-4 text-emerald-300" />;
      case 'snow':
        return <Snowflake className="w-4 h-4 text-emerald-300" />;
      case 'leaf':
        return <Leaf className="w-4 h-4 text-emerald-300" />;
      case 'home':
        return <Home className="w-4 h-4 text-emerald-300" />;
      default:
        return <MapPin className="w-4 h-4 text-emerald-300" />;
    }
  };

  const dynamicDestinations = (destinationsList && destinationsList.length > 0)
    ? destinationsList
    : defaultPopularDestinations;

  const handleDestinationClick = (dest) => {
    const k = (dest.searchKey || dest.name || '').toLowerCase();
    const tokens = k.split(/[\s,-]+/).filter(t => t.length > 1);

    // Look for matching package in allPackages
    const matchedPkg = allPackages.find(p => {
      const searchString = [
        p.title || '',
        p.subtitle || '',
        p.category || '',
        p.dest || '',
        ...(Array.isArray(p.highlights) ? p.highlights : []),
        ...(Array.isArray(p.specs) ? p.specs : [])
      ].join(' ').toLowerCase();

      return searchString.includes(k) || tokens.some(t => searchString.includes(t));
    });

    if (matchedPkg && onSelectPackage) {
      onSelectPackage(matchedPkg);
    } else if (onNavigateToPackages) {
      onNavigateToPackages(dest.searchKey || dest.name);
    } else {
      setActiveTab('packages');
    }
  };

  return (
    <div className="space-y-6 lg:space-y-16 pb-16">
      
      {/* Exact Home Page Hero Section */}
      <section className="relative bg-stone-900 text-white min-h-[auto] lg:min-h-[640px] flex flex-col justify-between px-3 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-4 sm:pb-6 lg:pb-28 overflow-visible">
        
        {/* Infinite Seamless Carousel (Always Slides Right-to-Left) */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className={`flex w-full h-full ${
              isTransitionEnabled ? 'transition-transform duration-1000 ease-in-out' : ''
            }`}
            style={{ transform: `translateX(-${currentHeroIndex * 100}%)` }}
            onTransitionEnd={handleHeroTransitionEnd}
          >
            {extendedHeroImages.map((img, idx) => (
              <div 
                key={idx}
                className="w-full h-full flex-shrink-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${img}')` }}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-black/40 pointer-events-none" />

        {/* Slide Indicators */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col gap-2.5">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsTransitionEnabled(true);
                setCurrentHeroIndex(idx);
              }}
              className={`w-2.5 rounded-full transition-all duration-300 ${
                (currentHeroIndex % heroImages.length) === idx 
                  ? 'h-8 bg-[#D49E35]' 
                  : 'h-2.5 bg-white/40 hover:bg-white/75'
              }`}
              title={`Slide ${idx + 1}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Hero Main Content Area */}
        <div className="relative max-w-[1580px] mx-auto w-full my-auto pt-4 sm:pt-6 z-10 text-center sm:text-left px-2 sm:px-6 lg:px-8 xl:px-10">
          
          {/* Left Column Text & Action Buttons */}
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            
            {/* Gold Script Heading */}
            <div className="font-serif italic text-2xl sm:text-4xl text-[#C8933E] font-medium tracking-wide">
              Discover The Beauty of
            </div>

            {/* Giant Title */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
              Uttarakhand
            </h1>
            
            <div className="font-serif text-2xl sm:text-4xl font-semibold text-white tracking-tight">
              with Atithya Stay
            </div>

            {/* Category Bullets */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-stone-100 pt-1 sm:pt-2">
              <span>Hotels</span>
              <span className="text-[#C8933E] font-bold">•</span>
              <span>Resorts</span>
              <span className="text-[#C8933E] font-bold">•</span>
              <span>Tour Packages</span>
              <span className="text-[#C8933E] font-bold">•</span>
              <span>Destination Weddings</span>
              <span className="text-[#C8933E] font-bold">•</span>
              <span>Corporate Tours</span>
            </div>

            {/* CTA Buttons (Screenshot Match) */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button
                onClick={() => onOpenEnquiry('Hotel & Trip Booking')}
                className="bg-[#D49E35] hover:bg-[#B88628] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 sm:gap-2.5 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                <span>Book Now</span>
              </button>

              <a
                href="https://wa.me/919258677823"
                target="_blank"
                rel="noreferrer"
                className="bg-stone-900/50 hover:bg-stone-900/80 text-white border border-white/30 backdrop-blur-md px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 sm:gap-2.5 transition-all"
              >
                <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-400 fill-current" />
                <span>WhatsApp Us</span>
              </a>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* MOBILE SEARCH BAR: SINGLE COMPACT ROW (EXPANDS ON CLICK)                  */}
        {/* ========================================================================= */}
        <div className="lg:hidden relative mt-6 max-w-lg mx-auto w-full z-20">
          {!isMobileSearchExpanded ? (
            /* Single Compact Row (Default Collapsed) */
            <div
              onClick={() => setIsMobileSearchExpanded(true)}
              className="bg-white rounded-2xl p-3 shadow-2xl border border-stone-200 text-stone-800 cursor-pointer flex items-center justify-between transition-all hover:border-[#0F382C] active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F382C] text-[#C8933E] flex items-center justify-center shrink-0 shadow-xs">
                  <Search className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#0F382C]">
                    {searchDest || 'Where are you going?'}
                  </div>
                  <div className="text-[10px] text-stone-500 font-medium">
                    Dates • Guests • Search Stays & Tours
                  </div>
                </div>
              </div>
              <div className="bg-[#0F382C] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs">
                <span>Search</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C8933E]" />
              </div>
            </div>
          ) : (
            /* Full Expanded Card on Mobile */
            <div className="bg-white rounded-2xl p-4 shadow-2xl border border-stone-200 text-stone-800 space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F382C]">
                  <Compass className="w-4 h-4 text-[#C8933E]" />
                  <span>Search Stays & Tour Packages</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileSearchExpanded(false)}
                  className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Destination Input */}
              <div className="relative">
                <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 focus-within:border-[#0F382C]">
                  <MapPin className="w-4 h-4 text-[#0F382C] shrink-0" />
                  <div className="w-full text-left">
                    <label className="block text-[9px] font-bold uppercase text-stone-400">Destination</label>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="e.g. Nainital / Jim Corbett"
                      value={searchDest}
                      onFocus={() => setIsDestOpen(true)}
                      onBlur={() => setTimeout(() => setIsDestOpen(false), 200)}
                      onChange={(e) => {
                        setSearchDest(e.target.value);
                        setIsDestOpen(true);
                      }}
                      className="w-full bg-transparent text-xs font-bold text-stone-800 focus:outline-none placeholder:text-stone-400"
                    />
                  </div>
                </div>

                {isDestOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2 z-50 max-h-48 overflow-y-auto divide-y divide-stone-100">
                    {['Nainital', 'Jim Corbett', 'Mussoorie', 'Rishikesh', 'Bhimtal', 'Auli', 'Mukteshwar']
                      .filter(d => !searchDest || d.toLowerCase().includes(searchDest.toLowerCase().trim()))
                      .map((dest) => (
                        <button
                          key={dest}
                          type="button"
                          onMouseDown={() => {
                            setSearchDest(dest);
                            setIsDestOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-stone-800 hover:bg-amber-50 hover:text-[#C8933E] flex items-center gap-2"
                        >
                          <MapPin className="w-3 h-3 text-[#C8933E]" />
                          <span>{dest}</span>
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <Calendar className="w-4 h-4 text-[#0F382C] shrink-0" />
                  <div className="text-left w-full">
                    <label className="block text-[9px] font-bold uppercase text-stone-400">Check-in</label>
                    <input
                      type="date"
                      className="w-full bg-transparent text-[11px] font-semibold text-stone-700 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <Calendar className="w-4 h-4 text-[#0F382C] shrink-0" />
                  <div className="text-left w-full">
                    <label className="block text-[9px] font-bold uppercase text-stone-400">Check-out</label>
                    <input
                      type="date"
                      className="w-full bg-transparent text-[11px] font-semibold text-stone-700 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                <Users className="w-4 h-4 text-[#0F382C] shrink-0" />
                <div className="text-left w-full">
                  <label className="block text-[9px] font-bold uppercase text-stone-400">Guests & Rooms</label>
                  <select className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer">
                    <option>2 Guests, 1 Room</option>
                    <option>4 Guests, 2 Rooms</option>
                    <option>Group / Wedding</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={() => {
                  setIsMobileSearchExpanded(false);
                  setActiveTab('packages');
                }}
                className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#C8933E]" />
                <span>Search Now</span>
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP SEARCH BAR: EXACT ORIGINAL 5-COLUMN HORIZONTAL FLOATING BAR       */}
        {/* ========================================================================= */}
        <div className="hidden lg:block absolute -bottom-10 left-4 right-4 max-w-[1400px] mx-auto bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl border border-stone-200 text-stone-800 z-20">
          <div className="grid grid-cols-5 gap-3 items-center">
            
            {/* Custom Destination Input */}
            <div className="relative">
              <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 focus-within:border-[#0F382C] focus-within:ring-1 focus-within:ring-[#0F382C] transition-all">
                <MapPin className="w-5 h-5 text-[#0F382C] shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[10px] font-bold uppercase text-stone-400">Destination</label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Where are you going? (e.g. Nainital)"
                    value={searchDest}
                    onFocus={() => setIsDestOpen(true)}
                    onBlur={() => setTimeout(() => setIsDestOpen(false), 200)}
                    onChange={(e) => {
                      setSearchDest(e.target.value);
                      setIsDestOpen(true);
                    }}
                    className="w-full bg-transparent text-xs font-bold text-stone-800 focus:outline-none placeholder:text-stone-400"
                  />
                </div>
              </div>

              {/* Custom Clean Floating Dropdown */}
              {isDestOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200/90 py-2 z-50 max-h-64 overflow-y-auto divide-y divide-stone-100 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSearchDest('');
                      setIsDestOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-stone-700 hover:bg-emerald-50 hover:text-[#0F382C] flex items-center justify-between transition-colors"
                  >
                    <span>All Destinations in Uttarakhand</span>
                  </button>
                  {['Nainital', 'Jim Corbett', 'Mussoorie', 'Rishikesh', 'Bhimtal', 'Auli', 'Chopta', 'Ranikhet', 'Kausani', 'Dhanaulti', 'Haridwar']
                    .filter(d => !searchDest || d.toLowerCase().includes(searchDest.toLowerCase().trim()))
                    .map((dest) => (
                      <button
                        key={dest}
                        type="button"
                        onMouseDown={() => {
                          setSearchDest(dest);
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
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
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
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <Calendar className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Check-out</label>
                <input
                  type="date"
                  className="w-full bg-transparent text-xs font-semibold text-stone-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <Users className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Guests & Rooms</label>
                <select className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer">
                  <option>2 Guests, 1 Room</option>
                  <option>4 Guests, 2 Rooms</option>
                  <option>Group / Wedding</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={() => setActiveTab('packages')}
              className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all h-full cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#C8933E]" />
              <span>Search Now</span>
            </button>

          </div>
        </div>

      </section>

      {/* Spacer to prevent search bar overlap on Desktop */}
      <div className="hidden lg:block h-10" />

      {/* Popular Destinations (Exact Pixel-Perfect Match with User Screenshot) */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 space-y-6 pt-0 lg:pt-4">
        
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase text-[#C8933E] tracking-widest flex items-center gap-1.5">
              EXPLORE TOP PLACES 
              <Leaf className="w-3.5 h-3.5 text-[#C8933E] fill-current" />
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F382C] tracking-tight">
              Popular Destinations
            </h2>
            {/* Small Gold Decorative Flourish Line */}
            <div className="flex items-center gap-1.5 py-1">
              <div className="w-10 h-0.5 bg-[#C8933E]/50 rounded-full" />
              <div className="w-2 h-2 rotate-45 border border-[#C8933E] bg-[#C8933E]/20" />
              <div className="w-16 h-0.5 bg-[#C8933E]/50 rounded-full" />
            </div>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              Handpicked getaways across Uttarakhand's most loved locations
            </p>
          </div>

          {/* Interactive Filter Pills Capsule */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF7F2] p-1.5 rounded-2xl border border-stone-200 self-start md:self-auto">
            {[
              { label: 'All Destinations', value: 'All', icon: LayoutGrid },
              { label: 'Lakes', value: 'Lakes' },
              { label: 'Wildlife', value: 'Wildlife' },
              { label: 'Spiritual', value: 'Spiritual' },
              { label: 'Hills', value: 'Hills' },
              { label: 'Snow & Ski', value: 'Snow' }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeDestCategory === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveDestCategory(tab.value)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0F382C] text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
                  }`}
                >
                  {TabIcon && <TabIcon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C8933E]' : 'text-stone-500'}`} />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic 8-Card Grid (Exact Static Screenshot Layout - No Hover Movement) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {dynamicDestinations
            .filter(dest => activeDestCategory === 'All' || dest.category === activeDestCategory)
            .slice(0, 8)
            .map((dest) => (
              <div
                key={dest.id}
                onClick={() => handleDestinationClick(dest)}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between cursor-pointer"
              >
                {/* Image Container with Seamless SVG Wave Divider */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-white">
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />

                  {/* SVG Wavy Bottom Divider (No gaps or line artifacts) */}
                  <svg 
                    className="absolute -bottom-1.5 left-0 right-0 w-full h-8 text-white fill-white pointer-events-none z-10" 
                    viewBox="0 0 1440 320" 
                    preserveAspectRatio="none"
                  >
                    <path d="M0,192L60,181.3C120,171,240,149,360,165.3C480,181,600,235,720,240C840,245,960,203,1080,176C1200,149,1320,139,1380,133.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                  </svg>

                  {/* Top-Left Circular Category Icon */}
                  <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-full bg-[#0A261E]/90 border border-emerald-500/40 text-emerald-300 flex items-center justify-center shadow-md backdrop-blur-xs z-20">
                    {renderDestIcon(dest.iconType)}
                  </div>

                  {/* Top-Right Star Rating Badge */}
                  <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md text-amber-300 border border-white/20 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md z-20">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span className="text-white font-extrabold">{dest.rating || '4.8'}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 pt-2 flex-1 flex flex-col justify-between space-y-3 bg-white">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium line-clamp-1 mt-1">
                      {dest.tag}
                    </p>
                  </div>

                  {/* Card Bottom Row */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-stone-600 font-semibold">
                      <Luggage className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{dest.nightInfo || 'Tour Package'}</span>
                    </div>

                    <span className="text-[#C8933E] font-bold inline-flex items-center gap-1">
                      <span>Explore Tours</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            ))}
        </div>

        {/* View All Destinations Button if user wants to see more on Destinations Page */}
        <div className="text-center pt-2">
          <button
            onClick={() => setActiveTab('destinations')}
            className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-stone-100 text-[#0F382C] font-bold px-6 py-2.5 rounded-full border border-stone-200 text-xs transition-all shadow-xs"
          >
            <span>Explore All {dynamicDestinations.length}+ Uttarakhand Destinations</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C8933E]" />
          </button>
        </div>

      </section>

      {/* 5-Stats Icon Row (Exact Screenshot Match with Laurel Borders) */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex items-center justify-between gap-4">
          
          {/* Left Laurel Branch Illustration */}
          <div className="hidden xl:block text-[#C8933E] opacity-70 shrink-0 select-none">
            <svg className="w-7 h-18 fill-current" viewBox="0 0 100 200">
              <path d="M50 180 Q30 140 25 100 Q20 60 40 20 Q45 50 35 90 Q30 130 50 180 Z" />
              <circle cx="30" cy="50" r="7" />
              <circle cx="20" cy="90" r="7" />
              <circle cx="25" cy="130" r="7" />
            </svg>
          </div>

          {/* 5 Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center divide-y sm:divide-y-0 md:divide-x divide-stone-200 flex-1">
            
            {/* Stat 1 */}
            <div className="p-2 space-y-1.5">
              <div className="w-12 h-12 rounded-full bg-[#0F382C] text-[#C8933E] flex items-center justify-center mx-auto shadow-sm border border-emerald-800">
                <Hotel className="w-5 h-5" />
              </div>
              <div className="font-serif text-2xl font-bold text-stone-900">500+</div>
              <div className="text-xs font-bold text-stone-800">Hotels & Resorts</div>
              <div className="text-[11px] text-stone-500">Across Uttarakhand</div>
            </div>

            {/* Stat 2 */}
            <div className="p-2 space-y-1.5 pt-4 sm:pt-2">
              <div className="w-12 h-12 rounded-full bg-[#C8933E] text-stone-950 flex items-center justify-center mx-auto shadow-sm border border-amber-600/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="font-serif text-2xl font-bold text-stone-900">25+</div>
              <div className="text-xs font-bold text-stone-800">Top Destinations</div>
              <div className="text-[11px] text-stone-500">To Explore</div>
            </div>

            {/* Stat 3 */}
            <div className="p-2 space-y-1.5 pt-4 md:pt-2">
              <div className="w-12 h-12 rounded-full bg-[#0F382C] text-[#C8933E] flex items-center justify-center mx-auto shadow-sm border border-emerald-800">
                <Users className="w-5 h-5" />
              </div>
              <div className="font-serif text-2xl font-bold text-stone-900">10K+</div>
              <div className="text-xs font-bold text-stone-800">Happy Travelers</div>
              <div className="text-[11px] text-stone-500">Every Year</div>
            </div>

            {/* Stat 4 */}
            <div className="p-2 space-y-1.5 pt-4 md:pt-2">
              <div className="w-12 h-12 rounded-full bg-[#C8933E] text-stone-950 flex items-center justify-center mx-auto shadow-sm border border-amber-600/30">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="font-serif text-2xl font-bold text-stone-900">24x7</div>
              <div className="text-xs font-bold text-stone-800">Customer Support</div>
              <div className="text-[11px] text-stone-500">Always Here to Help</div>
            </div>

            {/* Stat 5 */}
            <div className="p-2 space-y-1.5 pt-4 lg:pt-2 col-span-2 sm:col-span-1">
              <div className="w-12 h-12 rounded-full bg-[#0F382C] text-emerald-400 flex items-center justify-center mx-auto shadow-sm border border-emerald-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="font-serif text-2xl font-bold text-stone-900">100%</div>
              <div className="text-xs font-bold text-stone-800">Secure & Safe</div>
              <div className="text-[11px] text-stone-500">Booking</div>
            </div>

          </div>

          {/* Right Laurel Branch Illustration */}
          <div className="hidden xl:block text-[#C8933E] opacity-70 shrink-0 select-none scale-x-[-1]">
            <svg className="w-7 h-18 fill-current" viewBox="0 0 100 200">
              <path d="M50 180 Q30 140 25 100 Q20 60 40 20 Q45 50 35 90 Q30 130 50 180 Z" />
              <circle cx="30" cy="50" r="7" />
              <circle cx="20" cy="90" r="7" />
              <circle cx="25" cy="130" r="7" />
            </svg>
          </div>

        </div>
      </section>

      {/* Featured Tour Packages Section */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold text-[#C8933E] tracking-wider">POPULAR PACKAGES</span>
            <h2 className="font-serif text-3xl font-bold text-[#0F382C]">Featured Packages</h2>
          </div>
          <button 
            onClick={() => setActiveTab('packages')}
            className="text-xs font-bold text-stone-600 hover:text-[#0F382C] flex items-center gap-1"
          >
            <span>View All Packages</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {featuredPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              onClick={() => onSelectPackage && onSelectPackage(pkg)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-stone-100">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className={`absolute top-3 left-3 ${pkg.badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase`}>
                    {pkg.badge}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>{pkg.duration}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{pkg.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#0F382C] transition-colors leading-snug">
                    {pkg.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 text-[11px] text-stone-600">
                    {(Array.isArray(pkg.specs) && pkg.specs.length > 0
                      ? pkg.specs
                      : (Array.isArray(pkg.inclusions) ? pkg.inclusions : ['Verified Hotels', 'Sightseeing', 'Meals', 'Transport'])
                    ).slice(0, 3).map((sp, i) => (
                      <span key={i} className="bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200/60 font-medium">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-4">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Starting</span>
                  <div className="text-lg font-extrabold text-stone-900">₹{pkg.price} <span className="text-xs font-normal text-stone-500">/Person</span></div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPackage ? onSelectPackage(pkg) : onOpenEnquiry(pkg.title);
                  }}
                  className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  View Details
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Corbett Fun Resort Spotlight */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden h-72 sm:h-80 shadow-lg">
            <img
              src={resortImages[activeResortImage]}
              alt="Corbett Fun Resort"
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <button
                onClick={() => setActiveResortImage((prev) => (prev > 0 ? prev - 1 : resortImages.length - 1))}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveResortImage((prev) => (prev < resortImages.length - 1 ? prev + 1 : 0))}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase font-bold text-[#C8933E] tracking-wider">Luxury Stays</span>
            
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-3xl font-bold text-[#0F382C]">Corbett Fun Resort</h3>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-stone-700 ml-1">4.8 (750 Reviews)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Experience luxury amidst the wilderness, premium rooms, delicious cuisine, and world-class hospitality in the heart of Jim Corbett National Park.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-stone-700 font-medium p-2 bg-white rounded-lg border border-stone-200">
                <Waves className="w-4 h-4 text-[#0F382C]" />
                <span>Swimming Pool</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-700 font-medium p-2 bg-white rounded-lg border border-stone-200">
                <Utensils className="w-4 h-4 text-[#0F382C]" />
                <span>Restaurant</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-700 font-medium p-2 bg-white rounded-lg border border-stone-200">
                <Wifi className="w-4 h-4 text-[#0F382C]" />
                <span>Free WiFi</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Prices start from</span>
                <div className="text-2xl font-bold text-[#0F382C]">₹5,499 <span className="text-xs font-normal text-stone-500">/Night</span></div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onSelectHotel && onSelectHotel({
                    id: 'htl-1',
                    name: 'Corbett Fun Resort',
                    location: 'Jim Corbett, Uttarakhand',
                    dest: 'Jim Corbett',
                    rating: '4.8 (750 Reviews)',
                    price: '5,499',
                    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
                    tag: 'Luxury Jungle Resort',
                    amenities: ['Pool', 'Restaurant', 'WiFi', 'Parking', 'Spa', 'Jungle View']
                  })}
                  className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition-all"
                >
                  View Resort Details
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Travel Blogs & Guides Showcase (Shown when Admin publishes blogs) */}
      {blogsList && blogsList.length > 0 && (
        <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#C8933E] mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Travel Guides & Stories</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
                Latest From Our Travel Desk
              </h2>
            </div>

            <button
              onClick={() => setActiveTab && setActiveTab('blogs')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F382C] hover:text-[#C8933E] transition-colors cursor-pointer group"
            >
              <span>View All Articles</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsList.slice(0, 3).map((blog) => {
              const targetId = blog.id || blog._id;
              return (
                <div
                  key={targetId}
                  onClick={() => {
                    if (onSelectBlog) onSelectBlog(blog);
                    else if (setActiveTab) setActiveTab('blogs');
                  }}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-stone-900">
                      <img
                        src={blog.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3.5 left-3.5 bg-[#0F382C]/90 backdrop-blur-xs text-emerald-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                        {blog.category || 'Travel Guide'}
                      </span>
                      <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C8933E]" />
                        <span>{blog.readTime || '5 min'}</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                        By {blog.author || 'Atithya Travel Desk'} {blog.location && `• ${blog.location}`}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#0F382C] transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                        {stripHtml(blog.subtitle || blog.content)}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 border-t border-stone-100 flex items-center justify-between text-xs bg-stone-50/50">
                    <span className="text-[#C8933E] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Story</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Ready For Your Next Adventure? Banner CTA */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-[#0F382C] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">Ready For Your Next Adventure?</h3>
            <p className="text-stone-300 text-xs sm:text-sm mt-1">Let's explore the beauty of Uttarakhand together.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenEnquiry('Next Adventure Booking')}
              className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all"
            >
              Book Now
            </button>
            <a
              href="https://wa.me/919258677823"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+919258677823"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
