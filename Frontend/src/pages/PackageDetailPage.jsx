import React, { useState } from 'react';
import { 
  ArrowLeft, Calendar, MapPin, CheckCircle, Utensils, Hotel, Car, Compass, 
  Phone, ShieldCheck, Sparkles, Star, Users, MessageCircle, Clock, 
  HelpCircle, Share2, Award, Heart, Check, X
} from 'lucide-react';

export default function PackageDetailPage({ 
  pkg, 
  onBack, 
  onOpenEnquiry, 
  allPackages = [], 
  onSelectPackage 
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!pkg) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#0F382C]">Package Not Found</h2>
        <p className="text-stone-600 text-sm max-w-md">The package you are looking for might have been moved or removed.</p>
        <button
          onClick={onBack}
          className="bg-[#0F382C] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-[#0C2D23] transition-all"
        >
          View All Packages
        </button>
      </div>
    );
  }

  // Handle Share URL
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${pkg.title} | Samika Holidays`,
        text: `Check out ${pkg.title} on Samika Holidays!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Gallery images from package or defaults
  const galleryImages = (pkg.images && pkg.images.length > 0)
    ? pkg.images
    : [
        pkg.image,
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
      ].filter(Boolean);

  // Inclusions
  const inclusionsList = (pkg.inclusions && pkg.inclusions.length > 0)
    ? pkg.inclusions
    : (pkg.specs && pkg.specs.length > 0)
      ? pkg.specs
      : ['Verified 3/4★ Hotels', 'Daily Meals', 'All Sightseeing', 'Private Transport'];

  // Itinerary
  const itineraryList = (pkg.itinerary && pkg.itinerary.length > 0)
    ? pkg.itinerary
    : [
        {
          day: 'Day 1',
          title: 'Arrival, Warm Welcome & Resort Check-in',
          desc: 'Arrive at your destination and get received by our courteous driver. Check in at your luxury mountain view resort, refresh, and spend the evening enjoying local mall roads or scenic lake promenade.'
        },
        {
          day: 'Day 2',
          title: 'Full Day Guided Sightseeing & Exploration',
          desc: 'Wake up to sunrise views over the Himalayas. Enjoy a wholesome breakfast followed by a full-day guided excursion covering iconic viewpoints, historic temples, waterfalls, and nature walks.'
        },
        {
          day: 'Final Day',
          title: 'Memories, Souvenirs & Departure',
          desc: 'After breakfast, take in the morning mountain breeze and pack unforgettable memories. Depart in comfort with our dedicated cab drop service.'
        }
      ];

  // Related Packages (excluding current)
  const relatedPackages = allPackages.filter(p => p.id !== pkg.id).slice(0, 3);

  return (
    <div className="space-y-10 pb-20 pt-6">
      
      {/* Breadcrumb Navigation & Back Button */}
      <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-stone-200">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F382C] hover:text-[#C8933E] transition-colors bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Packages</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-[#0F382C] bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C8933E]" />
              <span>{copied ? 'Link Copied!' : 'Share Package'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT CONTENT COLUMN (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Title Section */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-[#C8933E] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {pkg.duration}
                </span>
                {pkg.badge && (
                  <span className={`text-white text-xs font-bold px-3 py-1 rounded-full uppercase ${pkg.badgeColor || 'bg-[#0F382C]'}`}>
                    {pkg.badge}
                  </span>
                )}
                <span className="bg-stone-100 text-stone-700 text-xs font-bold px-3 py-1 rounded-full">
                  {pkg.category || 'Uttarakhand Tour'}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F382C] leading-tight">
                {pkg.title}
              </h1>
              
              <p className="text-stone-600 text-base sm:text-lg font-medium">
                {pkg.subtitle || 'Experience the serene beauty, high peaks & luxury hospitality of Uttarakhand.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-500 pt-1">
                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{pkg.rating || '4.9 (180 Reviews)'}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                  <MapPin className="w-4 h-4 text-[#C8933E]" />
                  <span>Uttarakhand, India</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Verified Package</span>
                </div>
              </div>
            </div>

            {/* Gallery Image Hero */}
            <div className="space-y-3">
              <div className="relative h-80 sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-xl bg-stone-900 border border-stone-200">
                <img
                  src={galleryImages[activeImageIndex] || pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5 sm:gap-4">
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx 
                          ? 'border-[#C8933E] scale-[1.02] shadow-md ring-2 ring-[#C8933E]/30' 
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview Key Features Grid */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#0F382C]">Package Overview & Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-stone-200/80">
                  <Clock className="w-5 h-5 text-[#0F382C] mb-2" />
                  <span className="text-[11px] text-stone-500 font-bold uppercase block">Duration</span>
                  <span className="text-sm font-bold text-stone-900">{pkg.duration}</span>
                </div>
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-stone-200/80">
                  <Sparkles className="w-5 h-5 text-[#C8933E] mb-2" />
                  <span className="text-[11px] text-stone-500 font-bold uppercase block">Starting Price</span>
                  <span className="text-sm font-bold text-[#C8933E]">₹{pkg.price} <span className="text-[10px] text-stone-500 font-normal">/{pkg.priceUnit || 'person'}</span></span>
                </div>
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-stone-200/80">
                  <Users className="w-5 h-5 text-[#0F382C] mb-2" />
                  <span className="text-[11px] text-stone-500 font-bold uppercase block">Group Type</span>
                  <span className="text-sm font-bold text-stone-900">Family / Couple / Solo</span>
                </div>
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-stone-200/80">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                  <span className="text-[11px] text-stone-500 font-bold uppercase block">Support</span>
                  <span className="text-sm font-bold text-emerald-700">24x7 Assistance</span>
                </div>
              </div>
            </div>

            {/* Inclusions & Amenities */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#0F382C]">Included In This Tour</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {inclusionsList.map((inc, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights of Experience */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#0F382C]">Highlights of This Experience</h3>
              <ul className="space-y-3">
                {(pkg.highlights || [
                  'Handpicked 3-Star & 4-Star mountain view luxury stays',
                  'Private dedicated vehicle with experienced local driver',
                  'Customizable itinerary to suit your family or group preferences',
                  'Zero hidden charges & 100% price guarantee'
                ]).map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-stone-700">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed Day-by-Day Itinerary */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#0F382C]">Day-by-Day Tour Itinerary</h3>
              <div className="space-y-5">
                {itineraryList.map((item, idx) => (
                  <div key={idx} className="relative pl-6 sm:pl-8 border-l-2 border-[#C8933E] space-y-1">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#C8933E] border-2 border-white shadow-xs" />
                    <span className="text-xs font-bold uppercase text-[#C8933E] tracking-wider">{item.day || `Day ${idx + 1}`}</span>
                    <h4 className="font-bold text-base text-stone-900">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT STICKY BOOKING CARD (4 Cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xl space-y-6">
              
              <div>
                <span className="text-[11px] text-stone-400 font-bold uppercase tracking-wider block">Total Package Starting From</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#0F382C]">₹{pkg.price}</span>
                  <span className="text-sm text-stone-500 font-medium">/{pkg.priceUnit || 'person'}</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-1">✓ Taxes & Inclusions Included</span>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between font-semibold">
                  <span>Selected Package:</span>
                  <span className="text-[#0F382C] font-bold text-right">{pkg.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-bold text-stone-800">{pkg.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customization:</span>
                  <span className="text-emerald-700 font-bold">100% Available</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry({
                    title: pkg.title,
                    price: pkg.price,
                    destination: pkg.dest || pkg.location || 'Uttarakhand',
                    image: pkg.image,
                    duration: pkg.duration
                  })}
                  className="w-full bg-[#C8933E] hover:bg-[#B5812F] text-white py-4 rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Now & Pay Online</span>
                </button>

                <a
                  href={`https://wa.me/919258677823?text=${encodeURIComponent(`Hello Samika Holidays, I want to book the package: ${pkg.title} (Price: ₹${pkg.price})`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="tel:+919258677823"
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0F382C]" />
                  <span>Call Expert (+91 9258677823)</span>
                </a>
              </div>

              {/* Assurances */}
              <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant booking confirmation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No hidden cancellation fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified local driver & guide</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Recommended Other Packages */}
      {relatedPackages.length > 0 && (
        <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 pt-10 border-t border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase font-bold text-[#C8933E] tracking-wider">MORE EXPERIENCES</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F382C]">Similar Tour Packages</h3>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-bold text-[#0F382C] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPackages.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectPackage(item)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {item.duration}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#0F382C] transition-colors">{item.title}</h4>
                    <p className="text-xs text-stone-500 line-clamp-2">{item.subtitle}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase font-bold">From</span>
                    <span className="text-base font-extrabold text-[#0F382C]">₹{item.price}</span>
                  </div>
                  <span className="text-xs font-bold text-[#C8933E] group-hover:underline">
                    View Details →
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
