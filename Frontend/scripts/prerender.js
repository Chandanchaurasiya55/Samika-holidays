import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

const SITE_URL = 'https://samikaholiday.com';

// Comprehensive Rich Static HTML Content Generator for Every Page
const routes = [
  {
    path: '', // Home
    title: 'Samika Holidays | Luxury Hotels, Resorts & Tour Packages in Uttarakhand',
    desc: 'Discover extraordinary luxury hotels, bespoke tour packages, destination weddings, and Himalayan adventures with Samika Holidays.',
    canonical: `${SITE_URL}/`,
    content: `
      <div className="space-y-16 sm:space-y-24 bg-[#F8FAFC] text-slate-900 pb-20">
        <header className="relative min-h-[600px] flex flex-col justify-between bg-[#0F172A] text-white p-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">Land of Gods • Devbhoomi Uttarakhand</span>
            <p className="font-script text-4xl text-[#E11D48] font-bold">Discover The Beauty of</p>
            <h1 className="font-serif text-6xl font-black text-[#0F172A]">Uttarakhand with Samika Holidays</h1>
            <p className="text-slate-200 text-base">Hotels • Resorts • Tour Packages • Destination Weddings • Corporate Tours</p>
            <div className="flex gap-4 pt-4">
              <a href="/packages" className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-8 py-3.5 rounded-xl font-bold">Explore Packages</a>
              <a href="https://wa.me/916284073623" className="bg-white text-slate-900 px-6 py-3.5 rounded-xl font-bold">WhatsApp Us</a>
            </div>
          </div>
        </header>

        <section className="max-w-[97%] mx-auto p-6 bg-white rounded-3xl shadow-xl">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400">DESTINATION</label>
              <input type="text" placeholder="Where are you going? (e.g. Nainital, Corbett)" className="w-full p-3 bg-slate-50 rounded-xl font-semibold" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400">CHECK-IN</label>
              <input type="date" className="w-full p-3 bg-slate-50 rounded-xl font-semibold" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400">CHECK-OUT</label>
              <input type="date" className="w-full p-3 bg-slate-50 rounded-xl font-semibold" />
            </div>
            <button type="submit" className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white font-bold p-4 rounded-xl">Search Now</button>
          </form>
        </section>

        <section className="max-w-[97%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center bg-white p-8 rounded-3xl shadow-sm">
          <div><h3 className="text-4xl font-extrabold text-[#E11D48]">500+</h3><p className="text-xs text-slate-500">Verified Luxury Resorts</p></div>
          <div><h3 className="text-4xl font-extrabold text-[#FF6B35]">4.9 ★</h3><p className="text-xs text-slate-500">Average Traveler Rating</p></div>
          <div><h3 className="text-4xl font-extrabold text-[#06B6D4]">10,000+</h3><p className="text-xs text-slate-500">Happy Guests Hosted</p></div>
          <div><h3 className="text-4xl font-extrabold text-[#F59E0B]">24x7</h3><p className="text-xs text-slate-500">Dedicated On-Trip Care</p></div>
        </section>

        <section className="max-w-[97%] mx-auto space-y-8">
          <h2 className="text-4xl font-bold font-serif">Top Trending Destinations in Uttarakhand</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <article className="p-6 bg-slate-900 text-white rounded-3xl"><h3>Jim Corbett National Park</h3><p>Wildlife Safaris & Sal Forest Lodges</p></article>
            <article className="p-6 bg-slate-900 text-white rounded-3xl"><h3>Nainital Lake City</h3><p>Emerald Naini Lake & Pine Forest Trails</p></article>
            <article className="p-6 bg-slate-900 text-white rounded-3xl"><h3>Rishikesh Yoga Capital</h3><p>White Water Rafting & Ganga Aarti</p></article>
            <article className="p-6 bg-slate-900 text-white rounded-3xl"><h3>Kedarnath Shrine</h3><p>High-Altitude Sacred Pilgrimage</p></article>
          </div>
        </section>
      </div>
    `
  },
  {
    path: 'destinations',
    title: 'Popular Destinations in Uttarakhand | Samika Holidays',
    desc: 'Explore top Himalayan destinations including Jim Corbett National Park, Nainital, Rishikesh, Mussoorie, Kainchi Dham & Kedarnath.',
    canonical: `${SITE_URL}/destinations`,
    content: `
      <div className="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header className="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span className="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">EXPLORE DEVBHOOMI UTTARAKHAND</span>
          <h1 className="text-5xl font-extrabold font-serif">Handpicked Himalayan Destinations</h1>
          <p className="max-w-2xl mx-auto text-slate-300">From tiger safaris in Jim Corbett to serene lakes of Nainital and holy shrines of Kedarnath & Badrinath.</p>
        </header>

        <section className="max-w-[97%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Jim Corbett National Park</h2>
            <p className="text-xs text-[#E11D48] font-bold uppercase">Wildlife Safaris & Sal Forests</p>
            <p className="text-xs text-slate-600">India's oldest tiger reserve featuring luxury jungle resorts, open jeep safaris in Bijrani & Dhikala, and riverside bonfires.</p>
            <a href="https://wa.me/916284073623?text=Inquiry%20for%20Jim%20Corbett" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Book Corbett Package</a>
          </article>

          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Nainital & Lake District</h2>
            <p className="text-xs text-[#E11D48] font-bold uppercase">Emerald Lakes & Heritage Stays</p>
            <p className="text-xs text-slate-600">Surrounded by seven hills, famous for yacht boating on Naini Lake, Mall Road shopping, and vintage British heritage hotels.</p>
            <a href="https://wa.me/916284073623?text=Inquiry%20for%20Nainital" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Book Nainital Package</a>
          </article>

          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Rishikesh & Haridwar</h2>
            <p className="text-xs text-[#E11D48] font-bold uppercase">Ganga Aarti, Yoga & Rafting</p>
            <p className="text-xs text-slate-600">The spiritual capital of the world offering white water river rafting, cliff jumping, Ganga Aarti, and luxury wellness retreats.</p>
            <a href="https://wa.me/916284073623?text=Inquiry%20for%20Rishikesh" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Book Rishikesh Package</a>
          </article>

          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Kedarnath & Badrinath</h2>
            <p className="text-xs text-[#E11D48] font-bold uppercase">High Himalayan Chardham Pilgrimage</p>
            <p className="text-xs text-slate-600">Sacred Jyotirlinga shrine set against snow-clad Himalayan peaks, accessible via trek or VIP helicopter package.</p>
            <a href="https://wa.me/916284073623?text=Inquiry%20for%20Kedarnath" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Book Yatra Package</a>
          </article>

          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Mussoorie Queen of Hills</h2>
            <p className="text-xs text-[#E11D48] font-bold uppercase">Panoramic Valley Vistas & Waterfalls</p>
            <p className="text-xs text-slate-600">Colonial charm, Kempty Falls, Dhanaulti Eco Park, and romantic valley-view mountain resorts.</p>
            <a href="https://wa.me/916284073623?text=Inquiry%20for%20Mussoorie" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Book Mussoorie Package</a>
          </article>

          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Kainchi Dham & Bhowali</h2>
            <p className="text-xs text-[#E11D48] font-bold uppercase">Neem Karoli Baba Sacred Ashram</p>
            <p className="text-xs text-slate-600">World-famous spiritual ashram visited by global seekers, nestled in peaceful pine valleys near Bhimtal.</p>
            <a href="https://wa.me/916284073623?text=Inquiry%20for%20Kainchi%20Dham" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Book Ashram Tour</a>
          </article>
        </section>
      </div>
    `
  },
  {
    path: 'hotels',
    title: 'Luxury Hotels & Resorts in Uttarakhand | Samika Holidays',
    desc: 'Book physically audited luxury resorts, lakeside cottages, and mountain hotels in Nainital, Corbett, Mussoorie & Rishikesh.',
    canonical: `${SITE_URL}/hotels`,
    content: `
      <div className="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header className="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span className="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">100% PHYSICALLY AUDITED STAYS</span>
          <h1 className="text-5xl font-extrabold font-serif">Handpicked Luxury Resorts & Cottages</h1>
          <p className="max-w-2xl mx-auto text-slate-300">Verified for cleanliness, food quality, mountain views, and genuine mountain hospitality.</p>
        </header>

        <section className="max-w-[97%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Corbett Riverside Luxury Resort</h2>
            <p className="text-xs text-[#E11D48] font-bold">Jim Corbett National Park • 5.0 ★ (Luxury)</p>
            <p className="text-xs text-slate-600">Private riverside cottages, swimming pool, open lawn dining, and direct access to Corbett safari gates.</p>
            <p className="text-lg font-extrabold text-[#0F172A]">₹6,500 <span className="text-xs text-slate-400 font-normal">/ Night</span></p>
            <a href="https://wa.me/916284073623?text=Book%20Corbett%20Riverside%20Resort" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Reserve Resort Stay</a>
          </article>

          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Nainital Heritage Lake Resort</h2>
            <p className="text-xs text-[#E11D48] font-bold">Nainital Mall Road • 4.9 ★ (Lake View)</p>
            <p className="text-xs text-slate-600">Colonial-style wooden suites overlooking Naini Lake, rooftop restaurant, and walking distance to boat stand.</p>
            <p className="text-lg font-extrabold text-[#0F172A]">₹5,200 <span className="text-xs text-slate-400 font-normal">/ Night</span></p>
            <a href="https://wa.me/916284073623?text=Book%20Nainital%20Heritage%20Resort" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Reserve Resort Stay</a>
          </article>

          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Rishikesh Ganga View Spa Retreat</h2>
            <p className="text-xs text-[#E11D48] font-bold">Rishikesh • 4.9 ★ (Wellness & Rafting)</p>
            <p className="text-xs text-slate-600">Riverside infinity pool, Ayurvedic spa, private yoga deck overlooking holy Ganga river.</p>
            <p className="text-lg font-extrabold text-[#0F172A]">₹5,800 <span className="text-xs text-slate-400 font-normal">/ Night</span></p>
            <a href="https://wa.me/916284073623?text=Book%20Rishikesh%20Spa%20Resort" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Reserve Resort Stay</a>
          </article>
        </section>
      </div>
    `
  },
  {
    path: 'packages',
    title: 'Tour Packages in Uttarakhand | Samika Holidays',
    desc: 'Explore curated family tour packages, wildlife safaris, spiritual yatras, and honeymoon trips in Uttarakhand.',
    canonical: `${SITE_URL}/packages`,
    content: `
      <div className="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header className="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span className="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">BESPOKE HIMALAYAN ITINERARIES</span>
          <h1 className="text-5xl font-extrabold font-serif">Curated Uttarakhand Tour Packages</h1>
          <p className="max-w-2xl mx-auto text-slate-300">Customized for families, couples, corporate groups, and spiritual pilgrims.</p>
        </header>

        <section className="max-w-[97%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <span className="bg-[#0F172A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">3 Days / 2 Nights</span>
            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Jim Corbett Wildlife Safari Experience</h2>
            <p className="text-xs text-[#E11D48] font-bold">Corbett National Park • Family & Adventure</p>
            <p className="text-xs text-slate-600">Includes 4-Star Riverside Resort Stay, Open Jeep Jungle Safari, All Meals, and Evening Bonfire Night.</p>
            <p className="text-xl font-extrabold text-[#E11D48]">₹8,999 <span className="text-xs text-slate-400 font-normal">/ Person</span></p>
            <a href="https://wa.me/916284073623?text=Book%20Corbett%20Tour%20Package" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-6 py-3 rounded-xl text-xs font-bold">Book Package Now</a>
          </article>

          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <span className="bg-[#0F172A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">4 Days / 3 Nights</span>
            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Nainital & Bhimtal Lake Holiday</h2>
            <p className="text-xs text-[#E11D48] font-bold">Nainital, Bhimtal, Sattal • Honeymoon & Family</p>
            <p className="text-xs text-slate-600">Includes Lake View Hotel, Yacht Boating, Cable Car Ride, Local Sightseeing, and Private Car Transports.</p>
            <p className="text-xl font-extrabold text-[#E11D48]">₹11,499 <span className="text-xs text-slate-400 font-normal">/ Person</span></p>
            <a href="https://wa.me/916284073623?text=Book%20Nainital%20Tour%20Package" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-6 py-3 rounded-xl text-xs font-bold">Book Package Now</a>
          </article>

          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <span className="bg-[#0F172A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">5 Days / 4 Nights</span>
            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Kedarnath Divine Helicopter Yatra</h2>
            <p className="text-xs text-[#E11D48] font-bold">Guptkashi & Kedarnath • Spiritual Pilgrimage</p>
            <p className="text-xs text-slate-600">Includes Helicopter Priority Tickets, Guptkashi Resort, VIP Darshan Assistance, Meals, and Experienced Guide.</p>
            <p className="text-xl font-extrabold text-[#E11D48]">₹21,999 <span className="text-xs text-slate-400 font-normal">/ Person</span></p>
            <a href="https://wa.me/916284073623?text=Book%20Kedarnath%20Yatra%20Package" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-6 py-3 rounded-xl text-xs font-bold">Book Package Now</a>
          </article>
        </section>
      </div>
    `
  },
  {
    path: 'weddings',
    title: 'Destination Weddings in Uttarakhand | Samika Holidays',
    desc: 'Plan breathtaking mountain & lakeside destination weddings in Uttarakhand with end-to-end luxury management.',
    canonical: `${SITE_URL}/weddings`,
    content: `
      <div className="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header className="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span className="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">ROYAL HIMALAYAN WEDDINGS</span>
          <h1 className="text-5xl font-extrabold font-serif">Breathtaking Mountain & Lake Weddings</h1>
          <p className="max-w-2xl mx-auto text-slate-300">Turn your wedding into an unforgettable Himalayan fairy tale.</p>
        </header>
        <section className="max-w-[97%] mx-auto bg-white p-10 rounded-3xl shadow-xl text-center space-y-6">
          <h2 className="text-3xl font-bold font-serif">Riverside Mandaps & Lakeside Reception Lawns</h2>
          <p className="text-slate-600 max-w-xl mx-auto">From 5-star Corbett jungle resorts to Nainital lakefront estates and Mussoorie hilltop vistas.</p>
          <a href="https://wa.me/916284073623?text=Inquiry%20for%20Destination%20Wedding" className="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white font-bold px-8 py-4 rounded-2xl">Plan Wedding With Us</a>
        </section>
      </div>
    `
  },
  {
    path: 'corporate',
    title: 'Corporate Tours & Retreats in Uttarakhand | Samika Holidays',
    desc: 'State-of-the-art MICE conference halls, team bonding safaris, and luxury resort buyouts in Uttarakhand Himalayas.',
    canonical: `${SITE_URL}/corporate`,
    content: `
      <div className="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header className="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span className="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">EXECUTIVE MICE & OFFSITES</span>
          <h1 className="text-5xl font-extrabold font-serif">Corporate Tours & Retreats in Uttarakhand</h1>
          <p className="max-w-2xl mx-auto text-slate-300">State-of-the-art MICE conference halls, team bonding safaris, and luxury resort buyouts.</p>
        </header>
        <section className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border space-y-6">
          <h2 className="text-3xl font-bold font-serif text-center">Request Corporate RFP Proposal</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Contact Person" className="p-3 bg-slate-50 border rounded-xl" />
            <input type="text" placeholder="Company Name" className="p-3 bg-slate-50 border rounded-xl" />
            <input type="tel" placeholder="Phone (+91...)" className="p-3 bg-slate-50 border rounded-xl" />
            <input type="email" placeholder="Official Email" className="p-3 bg-slate-50 border rounded-xl" />
            <button type="submit" className="md:col-span-2 bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white font-bold p-4 rounded-xl">Request Proposal</button>
          </form>
        </section>
      </div>
    `
  },
  {
    path: 'blogs',
    title: 'Travel Blogs & Guides | Samika Holidays',
    desc: 'Read insider travel guides, itinerary tips, best places to visit, and local stories from Devbhoomi Uttarakhand.',
    canonical: `${SITE_URL}/blogs`,
    content: `
      <div className="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header className="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span className="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">HIMALAYAN TRAVEL JOURNAL</span>
          <h1 className="text-5xl font-extrabold font-serif">Uttarakhand Travel Blogs & Guides</h1>
        </header>
        <section className="max-w-[97%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-2">
            <h2 className="text-xl font-bold font-serif">Ultimate 3-Day Jim Corbett Safari Itinerary</h2>
            <p className="text-xs text-slate-500">Best zones, safari timing, resort stay tips, and wildlife rules.</p>
          </article>
          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-2">
            <h2 className="text-xl font-bold font-serif">Top 10 Hidden Places in Nainital Lake District</h2>
            <p className="text-xs text-slate-500">Beyond Mall Road: Pangot, Mukteshwar, Bhimtal & Sattal lakes.</p>
          </article>
          <article className="bg-white rounded-3xl p-6 shadow-md border space-y-2">
            <h2 className="text-xl font-bold font-serif">Kedarnath Yatra 2026: Complete Registration Guide</h2>
            <p className="text-xs text-slate-500">Helicopter booking tips, trek medical fitness, and stay options.</p>
          </article>
        </section>
      </div>
    `
  },
  {
    path: 'about',
    title: 'About Us & Our Heritage | Samika Holidays',
    desc: 'Learn about Samika Holidays, our local mountain roots, verified resort networks, and commitment to Pahadi hospitality.',
    canonical: `${SITE_URL}/about`,
    content: `
      <div className="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header className="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span className="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">THE STORY OF SAMIKA HOLIDAYS</span>
          <h1 className="text-5xl font-extrabold font-serif">Crafting Journeys Across Devbhoomi</h1>
          <p className="max-w-2xl mx-auto text-slate-300">Born in the mountains, dedicated to 100% verified luxury stays & on-ground concierge care.</p>
        </header>
      </div>
    `
  },
  {
    path: 'contact',
    title: 'Contact Us & Help Desk | Samika Holidays',
    desc: 'Get in touch with Samika Holidays travel desk via phone +91 6284 073 623 or email info@samikaholiday.com.',
    canonical: `${SITE_URL}/contact`,
    content: `
      <div className="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header className="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span className="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">24X7 TRAVEL HELPDESK</span>
          <h1 className="text-5xl font-extrabold font-serif">Connect With Our Mountain Concierge</h1>
        </header>
        <section className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border space-y-4 text-center">
          <p className="text-lg font-bold text-[#0F172A]">Phone / WhatsApp: +91 6284 073 623</p>
          <p className="text-lg font-bold text-[#0F172A]">Email: info@samikaholiday.com</p>
          <p className="text-slate-600">Uttarakhand Headquarters with local desks in Nainital, Corbett & Haridwar.</p>
        </section>
      </div>
    `
  }
];

function prerender() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error('dist/index.html not found! Run vite build first.');
    return;
  }

  const templateHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  routes.forEach((route) => {
    const isHome = route.path === '';
    const routeDir = isHome ? DIST_DIR : path.join(DIST_DIR, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    let html = templateHtml;

    // 1. Replace Title Tag
    html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

    // 2. Replace Description Tag
    html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.desc}" />`);

    // 3. Replace Canonical Link Tag (Guaranteed https://samikaholiday.com/...)
    html = html.replace(/<link id="canonical-url" rel="canonical" href=".*?" \/>/, `<link id="canonical-url" rel="canonical" href="${route.canonical}" />`);

    // 4. Replace OpenGraph Tags
    html = html.replace(/<meta id="og-title" property="og:title" content=".*?" \/>/, `<meta id="og-title" property="og:title" content="${route.title}" />`);
    html = html.replace(/<meta id="og-description" property="og:description" content=".*?" \/>/, `<meta id="og-description" property="og:description" content="${route.desc}" />`);
    html = html.replace(/<meta id="og-url" property="og:url" content=".*?" \/>/, `<meta id="og-url" property="og:url" content="${route.canonical}" />`);

    // 5. Inject Full Rich Pre-rendered Static HTML Content inside <div id="root">
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${route.content}</div>`
    );

    const targetFile = isHome ? INDEX_HTML_PATH : path.join(routeDir, 'index.html');
    fs.writeFileSync(targetFile, html, 'utf-8');
    console.log(`✓ Pre-rendered full static page HTML: ${isHome ? 'index.html' : route.path + '/index.html'} -> ${route.canonical}`);
  });

  // Ensure robots.txt & sitemap.xml are present in dist/
  const publicRobots = path.resolve(__dirname, '../public/robots.txt');
  const publicSitemap = path.resolve(__dirname, '../public/sitemap.xml');
  const distRobots = path.join(DIST_DIR, 'robots.txt');
  const distSitemap = path.join(DIST_DIR, 'sitemap.xml');

  if (fs.existsSync(publicRobots)) fs.copyFileSync(publicRobots, distRobots);
  if (fs.existsSync(publicSitemap)) fs.copyFileSync(publicSitemap, distSitemap);

  console.log('✓ Generated dist/robots.txt & dist/sitemap.xml');
  console.log('✅ ALL PAGES (Home, Destinations, Hotels, Packages, Weddings, Corporate, Blogs, About, Contact) pre-rendered with complete page HTML content & production canonical URLs!');
}

prerender();
