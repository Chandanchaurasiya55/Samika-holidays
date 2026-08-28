import React from 'react';
import { MapPin, Compass, ArrowRight, Sun, Calendar, Sparkles, Hotel, Tag, Star } from 'lucide-react';

export default function DestinationsPage({ onOpenEnquiry, setActiveTab, destinationsList = [], postsList = [] }) {
  const dynamicPosts = postsList.map(p => ({
    title: p.title,
    sub: p.subtitle || 'Custom Highlighted Destination',
    tag: 'Featured',
    image: p.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    bestTime: 'All Seasons',
    stays: 'Available Stays',
    desc: p.description || 'Custom destination highlight published from Admin Dashboard.'
  }));

  const defaultDestinations = [
    {
      title: 'Jim Corbett National Park',
      sub: 'Wildlife Safaris, Royal Bengal Tigers & River Lodges',
      tag: 'Wildlife Adventure',
      image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
      bestTime: 'Oct to June',
      stays: '50+ Jungle Resorts',
      desc: 'India’s oldest national park known for thrilling open jeep safaris in Bijrani & Dhikala zones and riverside luxury lodges.'
    },
    {
      title: 'Nainital & Lake District',
      sub: 'Emerald Lakes, Naini Peak & Colonial Charm',
      tag: 'Lakes & Hills',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      bestTime: 'Year Round',
      stays: '60+ Lakeview Stays',
      desc: 'Picturesque valley surrounding the volcanic eye-shaped Naini Lake with boating, ropeway views, and cool mountain breezes.'
    },
    {
      title: 'Kainchi Dham & Neem Karoli Baba',
      sub: 'Sacred Himalayan Ashram & Spiritual Haven',
      tag: 'Spiritual Shrines',
      image: '/kainchi_dham.png',
      bestTime: 'All Seasons',
      stays: 'Boutique Homestays',
      desc: 'World-renowned spiritual retreat visited by seekers worldwide. Serene temple complex nestled in a forested mountain valley.'
    },
    {
      title: 'Bhimtal & Naukuchiatal',
      sub: 'Quiet Island Lakes & Kayaking Escapes',
      tag: 'Lake Retreat',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      bestTime: 'All Year Round',
      stays: '30+ Peaceful Resorts',
      desc: 'Serene alternative to Nainital featuring the unique island aquarium inside the lake, paragliding, and pine-clad nature trails.'
    },
    {
      title: 'Rishikesh & Ganga Valley',
      sub: 'River Rafting, Yoga Retreats & Sacred Ghats',
      tag: 'Adventure & Yoga',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      bestTime: 'Sept to May',
      stays: '40+ Luxury Camps & Spas',
      desc: 'Yoga capital of the world offering world-class white water rafting, cliff jumping, spiritual evening Ganga Aarti and luxury riverside camping.'
    },
    {
      title: 'Mussoorie Queen of Hills',
      sub: 'Kempty Falls, Mall Road & Himalayan Panoramas',
      tag: 'Classic Hill Station',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      bestTime: 'Mar to Nov',
      stays: '45+ Heritage Hotels',
      desc: 'Iconic British-era hill station with Gun Hill sunset points, Cloud’s End trails, vibrant bakeries, and panoramic Doon Valley vistas.'
    },
    {
      title: 'Kedarnath & Chardham Shrines',
      sub: 'Sacred High-Altitude Himalayan Yatra',
      tag: 'Sacred Pilgrimage',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
      bestTime: 'May to Oct',
      stays: 'Helicopter & Trek Packages',
      desc: 'One of the most sacred Jyotirlingas nestled amidst snow-clad peaks at 3,583 meters above sea level with helicopter and VIP darshan assistance.'
    },
    {
      title: 'Auli Snow Ski Resort',
      sub: 'Nanda Devi Views & Alpine Meadows',
      tag: 'Snow & Skiing',
      image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80',
      bestTime: 'Dec to Mar (Snow)',
      stays: 'Alpine Cottages & Resorts',
      desc: 'Premier skiing destination of India with Asia’s longest cable car ride and breathtaking 360-degree views of the majestic Nanda Devi peak.'
    }
  ];

  const dynamicDestItems = destinationsList.map(d => ({
    title: d.name,
    sub: d.tag,
    tag: d.category || 'Uttarakhand',
    image: d.img || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    bestTime: 'All Year Round',
    stays: d.nightInfo || 'Tour Packages Available',
    desc: d.tag || `${d.name} scenic destination in Uttarakhand.`
  }));

  const destinations = dynamicPosts.length > 0 || dynamicDestItems.length > 0
    ? [...dynamicPosts, ...dynamicDestItems]
    : defaultDestinations;

  return (
    <div className="space-y-16 pb-20 bg-[#F8FAFC] text-slate-900">
      
      {/* Hero Header */}
      <section className="relative bg-[#0F172A] text-white pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[440px] flex flex-col justify-center">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/40" />

        <div className="relative max-w-4xl mx-auto text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-[#FF6B35] border border-rose-500/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Samika Holidays • Destinations Guide</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Explore Iconic Destinations <br />
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF385C] to-[#E11D48] bg-clip-text text-transparent italic">
              Across Devbhoomi Uttarakhand
            </span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Discover emerald lakes, tiger reserves, divine pilgrimage shrines, and snow-capped Himalayan peaks curated with local insight.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
                  <img 
                    src={dest.image} 
                    alt={dest.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <span className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                    {dest.tag}
                  </span>

                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight group-hover:text-[#FF6B35] transition-colors">
                      {dest.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium truncate mt-0.5">{dest.sub}</p>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {dest.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-600 font-semibold">
                    <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                      <Calendar className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
                      <span className="truncate">{dest.bestTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                      <Hotel className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
                      <span className="truncate">{dest.stays}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveTab('packages')}
                  className="w-full bg-[#0F172A] hover:bg-[#E11D48] text-white py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <span>Explore Packages</span>
                  <ArrowRight className="w-4 h-4 text-[#FF6B35]" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">Unsure Which Destination to Pick?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our travel specialists will help you craft the perfect multi-city Uttarakhand itinerary based on your preferences.
            </p>
          </div>
          <button
            onClick={() => onOpenEnquiry('Custom Destination Consultation')}
            className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shrink-0 transition-all hover:scale-105 cursor-pointer shadow-lg shadow-rose-900/30"
          >
            Speak to a Destination Expert
          </button>
        </div>
      </section>

    </div>
  );
}
