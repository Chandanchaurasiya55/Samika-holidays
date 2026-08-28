import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Users, Search, Star, ShieldCheck, Tag, Headphones, 
  Car, Hotel, Compass, Award, Phone, MessageCircle, ChevronRight, ChevronLeft,
  Sparkles, Camera, Utensils, Wifi, Waves, Trees, CheckCircle2, LayoutGrid,
  Luggage, Snowflake, Tent, Home, Leaf, Heart, BookOpen, Clock, X, ArrowRight,
  TrendingUp, Check, Eye, Flame, Mountain, Shield, ChevronDown, Play, Pause
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
  // Slider Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Search Engine Form State
  const [searchDest, setSearchDest] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestSelection, setGuestSelection] = useState('2 Guests, 1 Room');
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const [activeDestCategory, setActiveDestCategory] = useState('All');

  // Ultra HD Cinematic Slider Images & Captions
  const heroSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=90',
      title: 'Nainital & Serene Lakes',
      sub: 'Emerald Waters, Boating & Pine Forest Trails',
      tag: 'Lakes & Mountain Retreats'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=2400&q=90',
      title: 'Jim Corbett Tiger Reserve',
      imageAlt: 'Jim Corbett Wildlife Safari',
      sub: 'Jungle Safaris, Sal Forests & Riverside Luxury Lodges',
      tag: 'Wildlife Adventure'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=90',
      title: 'Rishikesh & Holy Ganga',
      sub: 'White Water Rafting, Spiritual Aarti & Yoga Retreats',
      tag: 'Adventure & Wellness'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2400&q=90',
      title: 'Kedarnath & Chardham Shrines',
      sub: 'Sacred High-Altitude Yatra & VIP Helicopter Care',
      tag: 'Divine Pilgrimage'
    },
    
  ];

  // Auto Slider Carousel Timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const allPackages = packagesList.length > 0 ? packagesList : featuredPackages;
  const allHotels = hotelsList || [];

  // Curated popular destinations for Uttarakhand
  const defaultPopularDestinations = [
    { 
      id: 'dest-1',
      searchKey: 'Jim Corbett',
      name: 'Jim Corbett National Park', 
      tag: 'Tiger Safaris, Riverside Lodges & Dense Sal Forests', 
      category: 'Wildlife',
      rating: '4.9',
      nightInfo: 'From ₹4,500/night',
      img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'dest-2',
      searchKey: 'Nainital',
      name: 'Nainital & Lake District', 
      tag: 'Boating on Naini Lake, Snow View & Mall Road', 
      category: 'Lakes',
      rating: '4.9',
      nightInfo: 'From ₹3,800/night',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'dest-3',
      searchKey: 'Kainchi Dham',
      name: 'Kainchi Dham & Bhowali', 
      tag: 'Neem Karoli Baba Sacred Ashram & Valley Views', 
      category: 'Spiritual',
      rating: '5.0',
      nightInfo: 'Spiritual Darshan Tour',
      img: '/kainchi_dham.png' 
    },
    { 
      id: 'dest-4',
      searchKey: 'Rishikesh',
      name: 'Rishikesh & Ganga Valley', 
      tag: 'White Water Rafting, Yoga & Divine Evening Aarti', 
      category: 'Adventure',
      rating: '4.9',
      nightInfo: 'From ₹2,900/night',
      img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'dest-5',
      searchKey: 'Mussoorie',
      name: 'Mussoorie Queen of Hills', 
      tag: 'Kempty Falls, Colonial Charm & Himalayan Vistas', 
      category: 'Hills',
      rating: '4.8',
      nightInfo: 'From ₹4,200/night',
      img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'dest-6',
      searchKey: 'Bhimtal',
      name: 'Bhimtal & Naukuchiatal', 
      tag: 'Tranquil Nine-Cornered Lakes & Paragliding', 
      category: 'Lakes',
      rating: '4.8',
      nightInfo: 'From ₹3,200/night',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'dest-7',
      searchKey: 'Kedarnath',
      name: 'Kedarnath & Chardham', 
      tag: 'Sacred Himalayan Shrines & Helicopter Assistance', 
      category: 'Spiritual',
      rating: '5.0',
      nightInfo: 'Pilgrimage Packages',
      img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 'dest-8',
      searchKey: 'Auli',
      name: 'Auli Snow & Ski Slopes', 
      tag: 'Nanda Devi Views, Ski Slopes & Gondola Rides', 
      category: 'Hills',
      rating: '4.9',
      nightInfo: 'Alpine Resort Stays',
      img: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80' 
    }
  ];

  const popularDestinations = destinationsList.length > 0 ? destinationsList : defaultPopularDestinations;

  const filteredDestinations = activeDestCategory === 'All' 
    ? popularDestinations 
    : popularDestinations.filter(d => (d.category || '').toLowerCase() === activeDestCategory.toLowerCase());

  const handleDestinationSelect = (destName) => {
    setSearchDest(destName);
    setIsDestOpen(false);
    if (onNavigateToPackages) {
      onNavigateToPackages(destName);
    } else {
      setActiveTab('packages');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchDest.trim()) {
      handleDestinationSelect(searchDest);
    } else {
      setActiveTab('packages');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 bg-[#F8FAFC] text-slate-900 pb-20">
      
      {/* ========================================================================= */}
      {/* 🌟 1. HERO SECTION WITH DYNAMIC HD SLIDER & MODERN FLOATING BADGES        */}
      {/* ========================================================================= */}
      <section 
        className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex flex-col justify-between overflow-hidden pt-8 sm:pt-12 pb-36 sm:pb-48 lg:pb-52 px-4 sm:px-6 lg:px-8 bg-[#0F172A]"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Background HD Carousel Slider */}
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100 pointer-events-none'
            } transition-transform duration-[6000ms]`}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Soft Ambient Overlay for maximum readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-black/20" />
          </div>
        ))}

        {/* Decorative Top-Left Autumn Leaf Ornament */}
        <div className="absolute top-0 left-0 w-36 sm:w-48 lg:w-60 h-36 sm:h-48 lg:h-60 pointer-events-none opacity-90 z-20">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <path d="M-20 -20 Q40 40 80 10 Q120 -20 160 30" stroke="#E11D48" strokeWidth="3" fill="none" />
            <path d="M30 20 C20 40, 50 60, 40 80 C60 70, 80 50, 60 30 Z" fill="#FF6B35" opacity="0.9" />
            <path d="M70 15 C85 35, 115 30, 110 55 C125 40, 115 15, 95 10 Z" fill="#E11D48" opacity="0.85" />
            <path d="M120 25 C140 45, 165 40, 160 65 C175 45, 160 20, 140 15 Z" fill="#F59E0B" opacity="0.85" />
          </svg>
        </div>



        {/* Main Hero Content Area */}
        <div className="relative z-20 w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pt-4 sm:pt-8">
          
          {/* Left Text Column */}
          <div className="max-w-2xl space-y-2.5 text-left">
            
            {/* Live Active Slide Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E11D48]/10 border border-[#E11D48]/20 px-3.5 py-1 rounded-full text-xs font-extrabold text-[#E11D48] shadow-2xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>{heroSlides[currentSlide].tag}</span>
            </div>

            {/* Cursive Tagline */}
            <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#E11D48] font-bold tracking-wide leading-none">
              Discover The Beauty of
            </p>

            {/* Main Bold Heading */}
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black text-[#0F172A] tracking-tight leading-[0.95] -mt-1">
              Uttarakhand
            </h1>

            {/* Subheading */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] pt-0.5">
              with Samika Holidays
            </h2>

            {/* Offerings Bullet Line */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-semibold text-slate-700 pt-1">
              <span>Hotels</span>
              <span className="text-[#E11D48]">•</span>
              <span>Resorts</span>
              <span className="text-[#E11D48]">•</span>
              <span>Tour Packages</span>
              <span className="text-[#E11D48]">•</span>
              <span>Destination Weddings</span>
              <span className="text-[#E11D48]">•</span>
              <span>Corporate Tours</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => setActiveTab('packages')}
                className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-900/20 transition-all cursor-pointer hover:scale-105"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                href="https://wa.me/919258677823?text=Hello%20Samika%20Holidays%2C%20I%20want%20to%20plan%20a%20trip%20to%20Uttarakhand."
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 text-[#06B6D4] fill-[#06B6D4]" />
                <span>WhatsApp Us</span>
              </a>
            </div>

          </div>

          {/* Right Floating Trust Badge Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/80 space-y-3.5 max-w-[220px] self-end lg:self-center mr-2 sm:mr-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 fill-amber-500/20 text-amber-600" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">Best Price</div>
                <div className="text-[10px] text-slate-500 font-semibold">Guaranteed</div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200 text-[#06B6D4] flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">24x7 Customer</div>
                <div className="text-[10px] text-slate-500 font-semibold">Support</div>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Dots & Active Slide Name Bar */}
        <div className="relative z-20 w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto flex items-center justify-between pt-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
            <span>{heroSlides[currentSlide].title}</span>
          </div>

          <div className="flex items-center gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentSlide ? 'w-8 bg-[#E11D48]' : 'w-2 bg-slate-400/60 hover:bg-slate-700'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🌟 2. BOTTOM FLOATING SEARCH BAR                                           */}
      {/* ========================================================================= */}
      <div className="relative -mt-44 sm:-mt-56 lg:-mt-64 z-30 w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearchSubmit} className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Field 1: DESTINATION */}
            <div className="lg:col-span-3 relative">
              <div className="flex items-center justify-between p-3 sm:p-3.5 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-[#E11D48] focus-within:bg-white transition-all">
                <div className="flex items-center gap-3 w-full">
                  <MapPin className="w-5 h-5 text-[#E11D48] shrink-0" />
                  <div className="w-full text-left">
                    <label className="block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400">DESTINATION</label>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Where are you going?"
                      value={searchDest}
                      onFocus={() => setIsDestOpen(true)}
                      onBlur={() => setTimeout(() => setIsDestOpen(false), 200)}
                      onChange={(e) => {
                        setSearchDest(e.target.value);
                        setIsDestOpen(true);
                      }}
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <Calendar className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
              </div>

              {/* Destination Dropdown */}
              {isDestOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    Popular Uttarakhand Locations
                  </div>
                  {popularDestinations
                    .filter(d => (d.name || d.searchKey || '').toLowerCase().includes(searchDest.toLowerCase()))
                    .map((dest) => (
                      <div
                        key={dest.id}
                        onMouseDown={() => handleDestinationSelect(dest.searchKey || dest.name)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-rose-50 hover:text-[#E11D48] text-xs font-semibold cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                          <span>{dest.name}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">{dest.category}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Field 2: CHECK-IN */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between p-3 sm:p-3.5 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-[#E11D48] focus-within:bg-white transition-all">
                <div className="text-left w-full">
                  <label className="block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400">CHECK-IN</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
                  />
                </div>
                <Calendar className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              </div>
            </div>

            {/* Field 3: CHECK-OUT */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between p-3 sm:p-3.5 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-[#E11D48] focus-within:bg-white transition-all">
                <div className="text-left w-full">
                  <label className="block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400">CHECK-OUT</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
                  />
                </div>
                <Hotel className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              </div>
            </div>

            {/* Field 4: GUESTS & ROOMS */}
            <div className="lg:col-span-3 relative">
              <div 
                onClick={() => setIsGuestsOpen(!isGuestsOpen)}
                className="flex items-center justify-between p-3 sm:p-3.5 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:border-[#E11D48] transition-all"
              >
                <div className="text-left">
                  <label className="block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400">GUESTS & ROOMS</label>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                    {guestSelection}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-1" />
              </div>

              {isGuestsOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                  {[
                    '1 Guest, 1 Room',
                    '2 Guests, 1 Room',
                    '3 Guests, 1 Room',
                    '4 Guests, 2 Rooms',
                    'Family Suite (4+ Guests)',
                    'Group Booking (5+ Rooms)'
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setGuestSelection(opt);
                        setIsGuestsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Field 5: Search Button */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white py-3.5 sm:py-4 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Search Now</span>
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 3. METRIC STATS TRUST STRIP                                            */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          <div className="pt-2 md:pt-0 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F172A]">500+</div>
            <div className="text-xs text-slate-500 font-medium">Audited & Verified Resorts</div>
          </div>

          <div className="pt-2 md:pt-0 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#E11D48]">4.9 ★</div>
            <div className="text-xs text-slate-500 font-medium">Average Traveler Rating</div>
          </div>

          <div className="pt-2 md:pt-0 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#FF6B35]">10,000+</div>
            <div className="text-xs text-slate-500 font-medium">Happy Travelers Hosted</div>
          </div>

          <div className="pt-2 md:pt-0 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#06B6D4]">24x7</div>
            <div className="text-xs text-slate-500 font-medium">Dedicated On-Trip Care</div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 4. TOP TRENDING DESTINATIONS GRID                                     */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D48] flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#FF6B35]" />
              <span>EXPLORE BY REGION</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Top Trending Destinations in Uttarakhand
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              From Jim Corbett tiger reserves to Nainital lakes and high-altitude spiritual shrines.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Wildlife', 'Lakes', 'Spiritual', 'Hills', 'Adventure'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveDestCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeDestCategory === cat
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-[#E11D48]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.slice(0, 8).map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleDestinationSelect(dest.searchKey || dest.name)}
              className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer bg-slate-900 aspect-[4/5] flex flex-col justify-end p-6 border border-slate-200/50"
            >
              <img
                src={dest.img}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Category Pill Top */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {dest.category || 'Uttarakhand'}
                </span>
              </div>

              {/* Rating Top Right */}
              {dest.rating && (
                <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{dest.rating}</span>
                </div>
              )}

              {/* Card Content */}
              <div className="relative z-10 space-y-1.5 text-white">
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight group-hover:text-[#FF6B35] transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                  {dest.tag}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-[#FF8A00] font-bold">
                  <span>{dest.nightInfo || 'Explore Packages'}</span>
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🌟 5. HANDPICKED LUXURY HOTELS & RESORTS                                 */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D48] flex items-center gap-1.5">
              <Hotel className="w-4 h-4 text-[#FF6B35]" />
              <span>HANDPICKED STAYS</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Luxury Hotels & Boutique Mountain Resorts
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Personally inspected for scenic brilliance, top hygiene, swimming pools, Pahadi delicacies, and warm hospitality.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('hotels')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D48] hover:text-[#FF6B35] transition-colors cursor-pointer"
          >
            <span>View All Resorts ({allHotels.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allHotels.slice(0, 6).map((hotel) => (
            <div
              key={hotel.id}
              onClick={() => onSelectHotel && onSelectHotel(hotel)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between cursor-pointer"
            >
              {/* Hotel Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={hotel.image || hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3.5 left-3.5 bg-black/65 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
                  <MapPin className="w-3 h-3 text-[#FF6B35]" />
                  <span>{hotel.location}</span>
                </div>

                <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{hotel.rating || '4.9'}</span>
                </div>
              </div>

              {/* Hotel Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-extrabold text-[#E11D48] uppercase tracking-wider mb-1">
                    {hotel.category || 'Luxury Resort & Spa'}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#E11D48] transition-colors leading-snug">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed font-normal">
                    {hotel.description || 'Surrounded by lush forests with panoramic mountain view balconies, dining, and bonfire nights.'}
                  </p>

                  {/* Amenity Pills */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] text-slate-600 font-semibold">
                    <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-cyan-600" /> Free WiFi
                    </span>
                    <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Utensils className="w-3 h-3 text-orange-600" /> Multi-Cuisine
                    </span>
                    <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Mountain className="w-3 h-3 text-purple-600" /> Mountain View
                    </span>
                  </div>
                </div>

                {/* Price & Book Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting From</span>
                    <div className="text-lg font-extrabold text-slate-900">
                      ₹{hotel.price || '4,500'} <span className="text-xs font-normal text-slate-500">/night</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEnquiry(`Booking Enquiry: ${hotel.name}`);
                    }}
                    className="bg-[#0F172A] hover:bg-[#E11D48] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Reserve</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🌟 6. BEST-SELLING TOUR PACKAGES                                          */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D48] flex items-center gap-1.5">
              <Luggage className="w-4 h-4 text-[#FF6B35]" />
              <span>POPULAR ITINERARIES</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Best-Selling Uttarakhand Tour Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Carefully planned itineraries featuring private sanitized cabs, top hotel stays, sightseeing entry, and local guides.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('packages')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D48] hover:text-[#FF6B35] transition-colors cursor-pointer"
          >
            <span>View All Packages ({allPackages.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPackages.slice(0, 6).map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onSelectPackage && onSelectPackage(pkg)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between cursor-pointer"
            >
              {/* Package Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={pkg.image || pkg.images?.[0] || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3.5 left-3.5 bg-[#0F172A]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                  <Clock className="w-3 h-3 text-[#FF6B35]" />
                  <span>{pkg.duration || '3 Days / 2 Nights'}</span>
                </div>

                <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{pkg.rating || '4.9'}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-extrabold text-[#E11D48] uppercase tracking-wider mb-1">
                    {pkg.category || 'Uttarakhand Tour'}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#E11D48] transition-colors leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed font-normal">
                    {pkg.subtitle || pkg.description || 'Experience the beauty of Uttarakhand with handpicked stays and expert drivers.'}
                  </p>

                  {Array.isArray(pkg.specs) && pkg.specs.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      {pkg.specs.slice(0, 3).map((spec, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
                          ✓ {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price & Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Package From</span>
                    <div className="text-lg font-extrabold text-slate-900">
                      ₹{pkg.price || '6,999'} <span className="text-xs font-normal text-slate-500">/{pkg.priceUnit || 'person'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/919258677823?text=${encodeURIComponent(`Hello Samika Holidays, I want to inquire about: ${pkg.title}`)}`}
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
                      className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-md shadow-rose-900/10 hover:scale-105 cursor-pointer"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🌟 7. DESTINATION WEDDINGS & CORPORATE SHOWCASE BANNER                    */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Weddings Showcase Card */}
          <div className="relative rounded-3xl overflow-hidden bg-[#0F172A] p-8 sm:p-12 text-white border border-rose-500/30 shadow-xl flex flex-col justify-between min-h-[380px] group">
            <img
              src="/wedding_hero.png"
              alt="Destination Weddings in Uttarakhand"
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent" />

            <div className="relative z-10 space-y-3 max-w-md">
              <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-[#FF6B35] border border-rose-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-current text-[#E11D48]" />
                <span>Royal Himalayan Celebrations</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Destination Weddings in Uttarakhand
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Exchange vows amidst mist-covered peaks, lush pine lawns, and riverside resorts in Jim Corbett, Nainital, Mussoorie & Rishikesh.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <button
                onClick={() => setActiveTab('weddings')}
                className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl inline-flex items-center gap-2 shadow-lg shadow-rose-900/30 transition-all hover:scale-105 cursor-pointer"
              >
                <span>Explore Wedding Venues</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Corporate Retreats Showcase Card */}
          <div className="relative rounded-3xl overflow-hidden bg-[#1E293B] p-8 sm:p-12 text-white border border-cyan-500/30 shadow-xl flex flex-col justify-between min-h-[380px] group">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
              alt="Corporate Tours and Conferences"
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B] via-[#1E293B]/80 to-transparent" />

            <div className="relative z-10 space-y-3 max-w-md">
              <div className="inline-flex items-center gap-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Executive Outings & Conferences</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Corporate Tours & Offsite Retreats
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Inspire your teams with state-of-the-art conference resorts, riverside bonfires, jungle safaris, and team-building adventure activities.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <button
                onClick={() => setActiveTab('corporate')}
                className="bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl inline-flex items-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <span>Plan Corporate Offsite</span>
                <ArrowRight className="w-4 h-4 text-[#E11D48]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 8. WHY BOOK WITH SAMIKA HOLIDAYS / ADVANTAGE                           */}
      {/* ========================================================================= */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#E11D48]">THE SAMIKA ADVANTAGE</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">Why Travelers Trust Samika Holidays</h2>
            <div className="w-16 h-1 bg-[#E11D48] mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[
              { title: 'Audited Stays', desc: '100% physically vetted boutique resorts & hotels.', icon: Hotel, color: 'text-rose-600 bg-rose-50' },
              { title: 'Curated Trails', desc: 'Hidden waterfalls, sacred temples & jungle safaris.', icon: Sparkles, color: 'text-amber-600 bg-amber-50' },
              { title: 'Sanitized Cabs', desc: 'Experienced mountain drivers & on-time transfers.', icon: Car, color: 'text-cyan-600 bg-cyan-50' },
              { title: 'Custom Itineraries', desc: 'Flexible packages built around your family & dates.', icon: Compass, color: 'text-purple-600 bg-purple-50' },
              { title: '24x7 Assistance', desc: 'Dedicated trip manager assigned to every booking.', icon: Headphones, color: 'text-emerald-600 bg-emerald-50' },
              { title: 'Best Value Guarantee', desc: 'Direct resort contracts ensure unbeatable prices.', icon: Award, color: 'text-orange-600 bg-orange-50' },
            ].map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <div key={idx} className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
                  <div className={`w-11 h-11 rounded-xl ${diff.color} shadow-2xs flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">{diff.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{diff.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 9. TRAVEL JOURNAL & BLOGS PREVIEW                                      */}
      {/* ========================================================================= */}
      {blogsList && blogsList.length > 0 && (
        <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D48] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#FF6B35]" />
                <span>HIMALAYAN TRAVEL JOURNAL</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Latest Travel Guides & Insider Stories
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                Tips, weather guides, best times to visit, and offbeat scenic destinations curated by our local explorers.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('blogs')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#E11D48] hover:text-[#FF6B35] transition-colors cursor-pointer"
            >
              <span>View All Articles ({blogsList.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsList.slice(0, 3).map((blog) => (
              <div
                key={blog.id}
                onClick={() => onSelectBlog && onSelectBlog(blog)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={blog.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3.5 left-3.5 bg-[#0F172A]/90 backdrop-blur-xs text-[#FF6B35] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      {blog.category || 'Travel Guide'}
                    </span>
                    <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FF6B35]" />
                      <span>{blog.readTime || '5 min'}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      By {blog.author || 'Samika Holiday Travel Desk'} {blog.location && `• ${blog.location}`}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#E11D48] transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {stripHtml(blog.subtitle || blog.content)}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/50">
                  <span className="text-[#E11D48] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </section>
      )}

    </div>
  );
}
