import React, { useState } from 'react';
import { 
  Hotel, MapPin, Star, Wifi, Waves, Utensils, Sparkles, Car, ShieldCheck, 
  Search, Filter, Calendar, Users, Headphones, Phone, MessageCircle, ChevronRight, Trees, Check, Mountain
} from 'lucide-react';

export default function HotelsPage({ onOpenEnquiry, onSelectHotel, hotelsList = [] }) {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [isDestOpen, setIsDestOpen] = useState(false);

  const hotels = hotelsList || [];
  
  const allDestOptions = Array.from(new Set([
    'Jim Corbett', 'Nainital', 'Bhimtal', 'Mussoorie', 'Rishikesh', 'Auli', 
    'Chopta', 'Mukteshwar', 'Ranikhet', 'Kausani', 'Haridwar', 'Kedarnath',
    ...hotels.map(h => h.dest || h.location).filter(Boolean)
  ]));

  const matchingDests = selectedDestination.trim() === ''
    ? allDestOptions
    : allDestOptions.filter(d => d.toLowerCase().includes(selectedDestination.toLowerCase().trim()));

  const filteredHotels = (!selectedDestination || selectedDestination === 'All' || selectedDestination.trim() === '')
    ? hotels 
    : hotels.filter(h => {
        const q = selectedDestination.toLowerCase().trim();
        return (
          (h.dest && h.dest.toLowerCase().includes(q)) ||
          (h.location && h.location.toLowerCase().includes(q)) ||
          (h.name && h.name.toLowerCase().includes(q)) ||
          (h.tag && h.tag.toLowerCase().includes(q))
        );
      });

  return (
    <div className="space-y-16 pb-20 bg-[#F8FAFC] text-slate-900">
      
      {/* Hero Section */}
      <section className="relative bg-[#0F172A] text-white pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[440px] flex flex-col justify-center">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/40" />

        <div className="relative max-w-4xl mx-auto text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-[#FF6B35] border border-rose-500/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Samika Verified Stays</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Luxury Hotels & Boutique Resorts <br />
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF385C] to-[#E11D48] bg-clip-text text-transparent italic">
              Across Uttarakhand
            </span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Handpicked riverside safari lodges, lakeside heritage estates, and scenic mountain villas with guaranteed best rates.
          </p>
        </div>
      </section>

      {/* Floating Search & Filter Bar */}
      <div className="relative -mt-20 sm:-mt-24 z-30 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200/90">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
            
            {/* Custom Destination Input */}
            <div className="relative">
              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-[#E11D48] focus-within:bg-white transition-all">
                <MapPin className="w-5 h-5 text-[#E11D48] shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[10px] font-bold uppercase text-slate-400">Destination</label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Search by city/hill..."
                    value={selectedDestination}
                    onFocus={() => setIsDestOpen(true)}
                    onBlur={() => setTimeout(() => setIsDestOpen(false), 200)}
                    onChange={(e) => {
                      setSelectedDestination(e.target.value);
                      setIsDestOpen(true);
                    }}
                    className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Dropdown Menu */}
              {isDestOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 max-h-64 overflow-y-auto divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSelectedDestination('');
                      setIsDestOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-[#E11D48] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>All Uttarakhand Destinations</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{hotels.length} Stays</span>
                  </button>

                  {matchingDests.map((dest) => {
                    const count = hotels.filter(h => (h.dest === dest || h.location?.includes(dest))).length;
                    return (
                      <button
                        key={dest}
                        type="button"
                        onMouseDown={() => {
                          setSelectedDestination(dest);
                          setIsDestOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-800 hover:bg-rose-50 hover:text-[#E11D48] flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                          <span>{dest}</span>
                        </div>
                        {count > 0 && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                            {count} Stays
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Check-in info */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <Calendar className="w-5 h-5 text-[#0F172A] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-slate-400">Stay Dates</label>
                <input type="date" className="w-full bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer" />
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <Users className="w-5 h-5 text-[#0F172A] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-slate-400">Rooms & Guests</label>
                <select className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer">
                  <option>2 Adults • 1 Deluxe Room</option>
                  <option>4 Adults • 2 Family Rooms</option>
                  <option>Family Luxury Suite</option>
                  <option>Group Booking (5+ Rooms)</option>
                </select>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => onOpenEnquiry('Hotel Booking Inquiry')}
              className="w-full bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white py-4 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20 transition-all h-full cursor-pointer hover:scale-[1.02]"
            >
              <Search className="w-4 h-4" />
              <span>Search Available Resorts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-extrabold text-[#E11D48] tracking-widest">VERIFIED LUXURY PORTFOLIO</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">Featured Resorts & Boutique Villas</h2>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
            {filteredHotels.length} Properties Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHotels.map((hotel) => (
            <div 
              key={hotel.id} 
              onClick={() => onSelectHotel && onSelectHotel(hotel)}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                  <img 
                    src={hotel.image || hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-3.5 left-3.5 bg-black/65 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                    {hotel.tag || hotel.category || 'Luxury Stay'}
                  </span>
                  <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{hotel.rating || '4.9'}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>{hotel.location}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#E11D48] transition-colors leading-snug">
                    {hotel.name}
                  </h3>

                  {/* Amenities */}
                  {Array.isArray(hotel.amenities) && hotel.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600 pt-1">
                      {hotel.amenities.slice(0, 3).map((am, i) => (
                        <span key={i} className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md font-semibold text-slate-600">
                          ✓ {am}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Starting from</span>
                  <div className="text-base font-extrabold text-slate-900">
                    ₹{hotel.price} <span className="text-xs font-normal text-slate-500">/Night</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectHotel ? onSelectHotel(hotel) : onOpenEnquiry(`Booking for ${hotel.name}`);
                  }}
                  className="bg-[#0F172A] hover:bg-[#E11D48] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#E11D48] mx-auto flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-slate-900">100% Verified Stays</h4>
            <p className="text-xs text-slate-500">Every resort & hotel is physically audited for hygiene, view & comfort.</p>
          </div>

          <div className="space-y-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF6B35] mx-auto flex items-center justify-center shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-slate-900">Direct Contract Rates</h4>
            <p className="text-xs text-slate-500">Guaranteed best pricing with zero commission markups or hidden fees.</p>
          </div>

          <div className="space-y-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 mx-auto flex items-center justify-center shadow-xs">
              <Headphones className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-slate-900">24x7 Trip Manager</h4>
            <p className="text-xs text-slate-500">On-ground assistance throughout your stay in Uttarakhand.</p>
          </div>

          <div className="space-y-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center shadow-xs">
              <Car className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-slate-900">Sanitized Transfers</h4>
            <p className="text-xs text-slate-500">Reliable mountain chauffeurs for station & airport pickups.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
