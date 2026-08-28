import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Star, Wifi, Waves, Utensils, Sparkles, Car, ShieldCheck, 
  Phone, MessageCircle, Calendar, Users, Share2, Check, Hotel, Coffee, Wind, Flame, ChevronRight
} from 'lucide-react';

export default function HotelDetailPage({ 
  hotel, 
  onBack, 
  onOpenEnquiry, 
  allHotels = [], 
  onSelectHotel 
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!hotel) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#0F172A]">Hotel Not Found</h2>
        <p className="text-slate-600 text-sm max-w-md">The property you are looking for might have been moved or removed.</p>
        <button
          onClick={onBack}
          className="bg-[#0F172A] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-[#E11D48] transition-all cursor-pointer"
        >
          View All Hotels
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${hotel.name} | Samika Holidays`,
        text: `Check out ${hotel.name} on Samika Holidays!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const galleryImages = (hotel.images && hotel.images.length > 0) 
    ? hotel.images 
    : [
        hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
      ];

  const relatedHotels = allHotels.filter(h => h.id !== hotel.id).slice(0, 3);

  return (
    <div className="space-y-10 pb-20 pt-6 bg-[#F8FAFC] text-slate-900">
      
      {/* Breadcrumb Navigation */}
      <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0F172A] hover:text-[#E11D48] bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hotels</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#E11D48] bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>{copied ? 'Link Copied!' : 'Share Resort'}</span>
        </button>
      </div>

      {/* Main Grid: Gallery & Sticky Booking Summary */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Gallery & Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Gallery Component */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-md bg-slate-900 border border-slate-200">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>{hotel.location}</span>
                </div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{hotel.rating || '4.9'}</span>
                  <span className="text-slate-400 font-normal">/5</span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === i ? 'border-[#E11D48] ring-2 ring-rose-200 scale-[1.02]' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hotel Title & Header Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 bg-rose-500/10 text-[#E11D48] px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>{hotel.tag || 'Verified Mountain Luxury Stay'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {hotel.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <MapPin className="w-4 h-4 text-[#FF6B35]" />
                  <span>{hotel.location} • Uttarakhand</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Samika Verified Partner</span>
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="font-serif text-xl font-bold text-slate-900">About This Property</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {hotel.description || 'Set amidst lush oak and pine forests with panoramic mountain view balconies, premium wooden interiors, swimming pool, and multi-cuisine restaurant serving traditional Pahadi delicacies.'}
                </p>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-slate-900">Property Highlights & Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { name: 'Free High-Speed WiFi', icon: Wifi },
                  { name: 'Panoramic Balcony Views', icon: Wind },
                  { name: 'Multi-Cuisine Restaurant', icon: Utensils },
                  { name: 'Bonfire & Evening Music', icon: Flame },
                  { name: '24/7 Room Service', icon: Coffee },
                  { name: 'Mountain Chauffeur Parking', icon: Car },
                  ...(Array.isArray(hotel.amenities) ? hotel.amenities.map(a => ({ name: a, icon: Sparkles })) : [])
                ].slice(0, 8).map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700">
                      <Icon className="w-4 h-4 text-[#E11D48] shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Summary Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
              
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting From</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    ₹{hotel.price || '4,500'}
                    <span className="text-xs font-normal text-slate-500"> /night</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-rose-50 text-[#E11D48] text-xs font-bold px-3 py-1 rounded-full border border-rose-200">
                    Instant Booking
                  </span>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="space-y-3">
                <button
                  onClick={() => onOpenEnquiry(`Booking for ${hotel.name}`)}
                  className="w-full bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white py-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve Room Now</span>
                </button>

                <a
                  href={`https://wa.me/916284073623?text=${encodeURIComponent(`Hello Samika Holidays, I want to check room availability for: ${hotel.name}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat with Resort Concierge</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Best Price Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Complimentary Welcome Drink & Breakfast</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free Cancellation up to 48 hours prior</span>
                </div>
              </div>

            </div>

            {/* Support Call Box */}
            <div className="bg-[#0F172A] text-white rounded-3xl p-6 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-[#FF6B35] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Need Group or Custom Rates?</h4>
                  <p className="text-[11px] text-slate-300">Call our Uttarakhand stay desk</p>
                </div>
              </div>
              <a 
                href="tel:+916284073623"
                className="block text-center bg-white/10 hover:bg-white/20 py-2.5 rounded-xl font-bold text-xs transition-colors"
              >
                +91 6284 073 623
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* Related Hotels */}
      {relatedHotels.length > 0 && (
        <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-slate-900">Similar Recommended Resorts</h3>
            <button onClick={onBack} className="text-xs font-bold text-[#E11D48] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedHotels.map(h => (
              <div
                key={h.id}
                onClick={() => onSelectHotel && onSelectHotel(h)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={h.image || h.images?.[0]} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{h.location}</span>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#E11D48] transition-colors truncate">{h.name}</h4>
                  <div className="text-xs font-extrabold text-[#E11D48]">₹{h.price} /night</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
