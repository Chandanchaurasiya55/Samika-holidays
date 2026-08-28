import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Star, Wifi, Waves, Utensils, Sparkles, Car, ShieldCheck, 
  Phone, MessageCircle, Calendar, Users, Share2, Check, Hotel, Coffee, Wind, Flame
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
        <h2 className="font-serif text-3xl font-bold text-[#0F382C]">Hotel Not Found</h2>
        <p className="text-stone-600 text-sm max-w-md">The property you are looking for might have been moved or removed.</p>
        <button
          onClick={onBack}
          className="bg-[#0F382C] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-[#0C2D23] transition-all"
        >
          View All Hotels
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${hotel.name} | Atithya Stay`,
        text: `Check out ${hotel.name} on Atithya Stay!`,
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
    <div className="space-y-10 pb-20 pt-6">
      
      {/* Breadcrumb Navigation */}
      <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-stone-200">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F382C] hover:text-[#C8933E] transition-colors bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Hotels & Resorts</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-[#0F382C] bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C8933E]" />
            <span>{copied ? 'Link Copied!' : 'Share Hotel'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Title & Ratings */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-[#C8933E] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {hotel.tag || 'Verified Resort'}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Physically Verified Property</span>
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F382C] leading-tight">
                {hotel.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-500 pt-1">
                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{hotel.rating || '4.8 (750 Reviews)'}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                  <MapPin className="w-4 h-4 text-[#C8933E]" />
                  <span>{hotel.location}</span>
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="space-y-3">
              <div className="relative h-80 sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-xl bg-stone-900 border border-stone-200">
                <img
                  src={galleryImages[activeImageIndex] || hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
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
            </div>

            {/* Hotel Highlights & Amenities */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#0F382C]">Property Amenities & Perks</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {(hotel.amenities || ['Pool', 'Restaurant', 'WiFi', 'Parking', 'Spa', 'Jungle View']).map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800">
                    <Hotel className="w-4 h-4 text-[#0F382C] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#0F382C]">About {hotel.name}</h3>
              <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
                {hotel.description || `Nestled amidst the pristine valleys and lush pine-covered slopes of ${hotel.location || 'Uttarakhand'}, ${hotel.name} offers an authentic luxury mountain retreat. Enjoy modern amenities, panoramic views from private balconies, curated multi-cuisine dining, and unmatched warm Himalayan hospitality.`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-stone-200 text-xs space-y-1">
                  <span className="font-bold text-[#0F382C] block">Check-In / Check-Out</span>
                  <span className="text-stone-600">{hotel.checkInOut || 'Check-in: 12:00 PM | Check-out: 11:00 AM'}</span>
                </div>
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-stone-200 text-xs space-y-1">
                  <span className="font-bold text-[#0F382C] block">Dining & Meals</span>
                  <span className="text-stone-600">{hotel.dining || 'Buffet Breakfast & Kumaoni cuisine available'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sticky Booking Card (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xl space-y-6">
              
              <div>
                <span className="text-[11px] text-stone-400 font-bold uppercase tracking-wider block">Starting Rate / Night</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#0F382C]">₹{hotel.price}</span>
                  <span className="text-sm text-stone-500 font-medium">/night</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-1">✓ Best Rate Guarantee (Zero Commission)</span>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between font-semibold">
                  <span>Selected Resort:</span>
                  <span className="text-[#0F382C] font-bold text-right">{hotel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-bold text-stone-800">{hotel.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry({
                    title: hotel.name,
                    price: hotel.price,
                    destination: hotel.location || hotel.dest || 'Uttarakhand',
                    image: hotel.image,
                    duration: 'Per Night Stay'
                  })}
                  className="w-full bg-[#C8933E] hover:bg-[#B5812F] text-white py-4 rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Resort & Pay Online</span>
                </button>

                <a
                  href={`https://wa.me/919258677823?text=${encodeURIComponent(`Hello Atithya Stay, I want to book rooms at: ${hotel.name} in ${hotel.location} (Starting: ₹${hotel.price}/night)`)}`}
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
                  <span>Call Hotel Desk (+91 9258677823)</span>
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
                  <span>Early check-in on request</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified 100% genuine property</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Other Resorts */}
      {relatedHotels.length > 0 && (
        <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 pt-10 border-t border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase font-bold text-[#C8933E] tracking-wider">RECOMMENDED PROPERTIES</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F382C]">More Stays in Uttarakhand</h3>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-bold text-[#0F382C] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedHotels.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectHotel(item)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#0F382C] transition-colors">{item.name}</h4>
                    <p className="text-xs text-stone-500">{item.location}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase font-bold">Starting from</span>
                    <span className="text-base font-extrabold text-[#0F382C]">₹{item.price} <span className="text-xs font-normal text-stone-500">/Night</span></span>
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
