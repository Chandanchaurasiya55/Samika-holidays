import React, { useState } from 'react';
import { 
  Hotel, MapPin, Star, Wifi, Waves, Utensils, Sparkles, Car, ShieldCheck, 
  Search, Filter, Calendar, Users, Headphones, Phone, MessageCircle 
} from 'lucide-react';

export default function HotelsPage({ onOpenEnquiry, onSelectHotel, hotelsList = [] }) {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [isDestOpen, setIsDestOpen] = useState(false);

  const hotels = hotelsList || [];
  
  const allDestOptions = Array.from(new Set([
    'Nainital', 'Jim Corbett', 'Mussoorie', 'Rishikesh', 'Bhimtal', 'Auli', 
    'Chopta', 'Ranikhet', 'Kausani', 'Dhanaulti', 'Haridwar', 'Mukteshwar',
    ...hotels.map(h => h.dest).filter(Boolean)
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
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-[#0F382C] text-white pt-16 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[420px] flex flex-col justify-center">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="relative max-w-7xl mx-auto text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Hotel className="w-4 h-4" />
            <span>Handpicked Stays</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">
            Luxury Hotels & Resorts <br /> in Uttarakhand
          </h1>
          <p className="text-stone-200 text-sm sm:text-base max-w-xl mx-auto">
            Book verified stays with best price guarantee, breathtaking Himalayan views & 24x7 guest support.
          </p>
        </div>
      </section>

      {/* Floating Search & Filter Bar */}
      <div className="relative -mt-20 sm:-mt-24 z-30 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-white rounded-2xl p-5 shadow-2xl border border-stone-200 text-stone-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            
            {/* Custom Destination Input with React Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 focus-within:border-[#0F382C] focus-within:ring-1 focus-within:ring-[#0F382C] transition-all">
                <MapPin className="w-5 h-5 text-[#0F382C] shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[10px] font-bold uppercase text-stone-400">Destination</label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Type destination (e.g. Nainital)"
                    value={selectedDestination}
                    onFocus={() => setIsDestOpen(true)}
                    onBlur={() => setTimeout(() => setIsDestOpen(false), 200)}
                    onChange={(e) => {
                      setSelectedDestination(e.target.value);
                      setIsDestOpen(true);
                    }}
                    className="w-full bg-transparent text-xs font-bold text-stone-800 focus:outline-none placeholder:text-stone-400"
                  />
                </div>
              </div>

              {/* Custom White Clean Dropdown Menu */}
              {isDestOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200/90 py-2 z-50 max-h-64 overflow-y-auto divide-y divide-stone-100 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onMouseDown={() => {
                      setSelectedDestination('');
                      setIsDestOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-xs font-bold text-stone-700 hover:bg-emerald-50 hover:text-[#0F382C] flex items-center justify-between transition-colors"
                  >
                    <span>All Uttarakhand Destinations</span>
                    <span className="text-[10px] text-stone-400 font-semibold">{hotels.length} Stays</span>
                  </button>

                  {matchingDests.map((dest) => {
                    const count = hotels.filter(h => h.dest === dest).length;
                    return (
                      <button
                        key={dest}
                        type="button"
                        onMouseDown={() => {
                          setSelectedDestination(dest);
                          setIsDestOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-bold text-stone-800 hover:bg-amber-50 hover:text-[#C8933E] flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#C8933E]" />
                          <span>{dest}</span>
                        </div>
                        {count > 0 && (
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-bold">
                            {count} {count === 1 ? 'Hotel' : 'Hotels'}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {matchingDests.length === 0 && (
                    <div className="px-4 py-3 text-xs text-stone-500 text-center font-medium">
                      Press search to find stays matching "{selectedDestination}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <Calendar className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Check-in / Check-out</label>
                <input type="date" className="w-full bg-transparent text-xs font-semibold text-stone-700 focus:outline-none" />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <Users className="w-5 h-5 text-[#0F382C] shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase text-stone-400">Guests & Rooms</label>
                <select className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer">
                  <option>2 Guests, 1 Room</option>
                  <option>4 Guests, 2 Rooms</option>
                  <option>Family Suite</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => onOpenEnquiry('Hotel Booking Inquiry')}
              className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-4 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors h-full"
            >
              <Search className="w-4 h-4" />
              <span>Search Hotels</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hotel Cards Grid - 4 Columns in 1 Row */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 space-y-8 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-[#C8933E] tracking-wider">VERIFIED PROPERTIES</span>
            <h2 className="font-serif text-3xl font-bold text-[#0F382C]">Top Rated Stays</h2>
          </div>
          <span className="text-xs font-bold text-stone-500">{filteredHotels.length} Stays Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {filteredHotels.map((hotel) => (
            <div 
              key={hotel.id} 
              onClick={() => onSelectHotel && onSelectHotel(hotel)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-stone-100">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-md">
                    {hotel.tag}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C8933E]" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{hotel.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#0F382C] transition-colors leading-snug">
                    {hotel.name}
                  </h3>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 text-[11px] text-stone-600 pt-1">
                    {hotel.amenities.map((am, i) => (
                      <span key={i} className="bg-[#FAF7F2] border border-stone-200 px-2 py-0.5 rounded-md font-medium">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-3">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Starting from</span>
                  <div className="text-lg font-extrabold text-[#0F382C]">₹{hotel.price} <span className="text-xs font-normal text-stone-500">/Night</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectHotel ? onSelectHotel(hotel) : onOpenEnquiry(`Booking for ${hotel.name}`);
                    }}
                    className="bg-[#0F382C] hover:bg-[#0C2D23] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Why Book Hotels Banner */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-[#FAF7F2] rounded-2xl border border-stone-200 p-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <ShieldCheck className="w-8 h-8 text-[#C8933E] mx-auto" />
            <h4 className="font-bold text-sm text-[#0F382C]">Verified Stays</h4>
            <p className="text-xs text-stone-500">Every resort & hotel is physically verified by our team.</p>
          </div>
          <div className="space-y-2">
            <Sparkles className="w-8 h-8 text-[#C8933E] mx-auto" />
            <h4 className="font-bold text-sm text-[#0F382C]">Best Price Guarantee</h4>
            <p className="text-xs text-stone-500">Unbeatable rates with zero hidden booking charges.</p>
          </div>
          <div className="space-y-2">
            <Headphones className="w-8 h-8 text-[#C8933E] mx-auto" />
            <h4 className="font-bold text-sm text-[#0F382C]">24x7 Assistance</h4>
            <p className="text-xs text-stone-500">On-ground support throughout your stay in Uttarakhand.</p>
          </div>
          <div className="space-y-2">
            <Car className="w-8 h-8 text-[#C8933E] mx-auto" />
            <h4 className="font-bold text-sm text-[#0F382C]">Free Pick & Drop</h4>
            <p className="text-xs text-stone-500">Complimentary transfer assistance on selected packages.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
