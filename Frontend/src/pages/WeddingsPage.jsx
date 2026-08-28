import React from 'react';
import { 
  Heart, Sparkles, Utensils, Music, Camera, Car, ShieldCheck, 
  MapPin, CheckCircle2, MessageCircle, Phone, Award, Users, ArrowRight 
} from 'lucide-react';

export default function WeddingsPage({ onOpenEnquiry, postsList = [] }) {
  const defaultWeddingDestinations = [
    { title: 'Jim Corbett Riverside Lawns', sub: 'Riverside Mandaps & Jungle Luxury', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', capacity: '100 - 800 Guests' },
    { title: 'Nainital Lakeview Palaces', sub: 'Lakeside Romance & Heritage Elegance', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', capacity: '50 - 400 Guests' },
    { title: 'Bhimtal Pine Valleys', sub: 'Serene Green Lawns & Poolside Sangeet', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', capacity: '100 - 500 Guests' },
    { title: 'Mussoorie Queen of Hills', sub: 'Cloud End Hills & Grand Ballrooms', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', capacity: '150 - 600 Guests' },
    { title: 'Rishikesh Ganga Ghats', sub: 'Spiritual Vedic Weddings by the Holy River', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', capacity: '80 - 350 Guests' },
    { title: 'Mukteshwar Apple Orchards', sub: 'Intimate Himalayan View Sunsets', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80', capacity: '50 - 250 Guests' },
  ];

  const dynamicPosts = postsList.map(p => ({
    title: p.title,
    sub: p.subtitle || p.description || 'Exclusive Wedding Venue',
    image: p.image || '/wedding_hero.png',
    capacity: 'Tailored Capacity'
  }));

  const weddingDestinations = dynamicPosts.length > 0 ? [...dynamicPosts, ...defaultWeddingDestinations] : defaultWeddingDestinations;

  return (
    <div className="space-y-16 pb-20 bg-[#F8FAFC] text-slate-900">
      
      {/* Wedding Hero Section */}
      <section className="relative bg-[#0F172A] text-white min-h-[520px] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-16 pb-24">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-35"
          style={{ backgroundImage: `url('/wedding_hero.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-black/60" />

        <div className="relative max-w-4xl mx-auto text-center space-y-5 z-10">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-[#FF6B35] border border-rose-500/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 fill-[#E11D48] text-[#E11D48]" />
            <span>Royal Himalayan Destination Weddings</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Destination Weddings in <br />
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF385C] to-[#E11D48] bg-clip-text text-transparent italic">
              Devbhoomi Uttarakhand
            </span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Exchange sacred vows amidst mist-covered peaks, sprawling riverside lawns in Jim Corbett, and lakeside palaces in Nainital. Complete end-to-end wedding planning.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => onOpenEnquiry('Destination Wedding Plan')}
              className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-rose-900/30 transition-all hover:scale-105 cursor-pointer"
            >
              Plan Your Dream Wedding
            </button>

            <a
              href="https://wa.me/919258677823?text=Hello%20Samika%20Holidays%2C%20I%20want%20to%20plan%20a%20destination%20wedding%20in%20Uttarakhand."
              target="_blank"
              rel="noreferrer"
              className="bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
              <span>WhatsApp Wedding Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* Feature Pills Bar Overlay */}
      <div className="relative -mt-14 z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white rounded-3xl p-5 shadow-2xl border border-slate-700/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-xs font-bold text-center">
            <div className="space-y-1">
              <Sparkles className="w-5 h-5 text-[#FF6B35] mx-auto" />
              <span>Resort Venues</span>
            </div>
            <div className="space-y-1">
              <Utensils className="w-5 h-5 text-[#E11D48] mx-auto" />
              <span>Royal Catering</span>
            </div>
            <div className="space-y-1">
              <Heart className="w-5 h-5 text-[#FF385C] mx-auto" />
              <span>Themed Decor</span>
            </div>
            <div className="space-y-1">
              <Music className="w-5 h-5 text-[#06B6D4] mx-auto" />
              <span>Live DJ & Artists</span>
            </div>
            <div className="space-y-1">
              <Camera className="w-5 h-5 text-[#7C3AED] mx-auto" />
              <span>Cinematography</span>
            </div>
            <div className="space-y-1">
              <Car className="w-5 h-5 text-[#F59E0B] mx-auto" />
              <span>Guest Logistics</span>
            </div>
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
              <span>Wedding Concierge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Our Best Wedding Destinations */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold text-[#E11D48] tracking-widest">REGAL VENUES</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Top Destination Wedding Venues in Uttarakhand
          </h2>
          <div className="w-16 h-1 bg-[#E11D48] mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weddingDestinations.map((dest, idx) => (
            <div
              key={idx}
              className="relative aspect-[16/11] rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-slate-200"
              onClick={() => onOpenEnquiry(`Wedding Enquiry: ${dest.title}`)}
            >
              <img
                src={dest.image}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-extrabold px-3 py-1 rounded-full">
                {dest.capacity || 'Bespoke Capacity'}
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <h3 className="font-serif text-xl font-bold group-hover:text-[#FF6B35] transition-colors">{dest.title}</h3>
                <p className="text-xs text-slate-300">{dest.sub}</p>
                <div className="pt-2 text-xs font-bold text-[#FF8A00] flex items-center gap-1">
                  <span>Enquire Availability</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* We Take Care Of Everything */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold text-[#E11D48] tracking-widest">FULL HOSPITALITY CARE</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">We Take Care of Every Detail</h2>
            <div className="w-16 h-1 bg-[#E11D48] mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Exclusive Resort Buyouts', desc: 'Private booking of boutique resorts for complete privacy.', icon: Sparkles, color: 'text-rose-600 bg-rose-50' },
              { title: 'Gourmet Pahadi & Global Dining', desc: 'Customized multi-cuisine buffet spreads and bartending.', icon: Utensils, color: 'text-orange-600 bg-orange-50' },
              { title: 'Thematic Mandap & Decor', desc: 'Floral arches, fairy lights, lakeside setups, and floral canopies.', icon: Heart, color: 'text-rose-600 bg-rose-50' },
              { title: 'Artist & Celebrity Management', desc: 'Live bands, local folk dancers, and top wedding DJs.', icon: Music, color: 'text-purple-600 bg-purple-50' },
              { title: 'Luxury Fleet & Airport Shuttles', desc: 'Coordinated guest transfers from Delhi, Pantnagar & Dehradun.', icon: Car, color: 'text-cyan-600 bg-cyan-50' },
              { title: 'Guest Hospitality & Gifting', desc: 'Personalized welcome kits, room allocations, and concierge.', icon: Users, color: 'text-amber-600 bg-amber-50' },
              { title: 'Pre-Wedding Drone Shoots', desc: 'Scenic mountain videography & drone photography reels.', icon: Camera, color: 'text-blue-600 bg-blue-50' },
              { title: 'Dedicated Wedding Planner', desc: 'Senior event manager on-site throughout all rituals.', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-3 text-left">
                  <div className={`w-11 h-11 rounded-2xl ${item.color} flex items-center justify-center shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold">
              Let's Make Your Dream Wedding a Reality
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              From the first venue visit to the final bidaai, our team handles all logistics with heartfelt Pahadi hospitality.
            </p>
            <button
              onClick={() => onOpenEnquiry('Dream Wedding Consultation')}
              className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-lg shadow-rose-900/30 transition-all hover:scale-105 cursor-pointer"
            >
              Request Wedding Brochure & Quote
            </button>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="font-serif text-3xl font-bold text-[#FF6B35]">200+</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Weddings Executed</div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="font-serif text-3xl font-bold text-[#E11D48]">50+</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Partner Luxury Venues</div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="font-serif text-3xl font-bold text-[#06B6D4]">100%</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Delighted Families</div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="font-serif text-3xl font-bold text-[#7C3AED]">24/7</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">On-Site Concierge</div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
