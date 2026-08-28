import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const SITE_URL = 'https://samikaholiday.com';

const routeSeoMap = {
  '/destinations': {
    title: 'Popular Destinations in Uttarakhand | Samika Holidays',
    desc: 'Explore top Himalayan destinations including Jim Corbett National Park, Nainital, Rishikesh, Mussoorie, Kainchi Dham & Kedarnath.',
    canonical: `${SITE_URL}/destinations`,
    content: `
      <div class="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header class="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span class="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">EXPLORE DEVBHOOMI UTTARAKHAND</span>
          <h1 class="text-5xl font-extrabold font-serif">Handpicked Himalayan Destinations</h1>
          <p class="max-w-2xl mx-auto text-slate-300">From tiger safaris in Jim Corbett to serene lakes of Nainital and holy shrines of Kedarnath & Badrinath.</p>
        </header>

        <section class="max-w-[97%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 class="text-2xl font-bold font-serif text-[#0F172A]">Jim Corbett National Park</h2>
            <p class="text-xs text-[#E11D48] font-bold uppercase">Wildlife Safaris & Sal Forests</p>
            <p class="text-xs text-slate-600">India's oldest tiger reserve featuring luxury jungle resorts, open jeep safaris in Bijrani & Dhikala, and riverside bonfires.</p>
            <a href="https://wa.me/916284073623?text=Inquiry%20for%20Jim%20Corbett" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Book Corbett Package</a>
          </article>

          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 class="text-2xl font-bold font-serif text-[#0F172A]">Nainital & Lake District</h2>
            <p class="text-xs text-[#E11D48] font-bold uppercase">Emerald Lakes & Heritage Stays</p>
            <p class="text-xs text-slate-600">Surrounded by seven hills, famous for yacht boating on Naini Lake, Mall Road shopping, and vintage British heritage hotels.</p>
            <a href="https://wa.me/916284073623?text=Inquiry%20for%20Nainital" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Book Nainital Package</a>
          </article>

          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 class="text-2xl font-bold font-serif text-[#0F172A]">Rishikesh & Haridwar</h2>
            <p class="text-xs text-[#E11D48] font-bold uppercase">Ganga Aarti, Yoga & Rafting</p>
            <p class="text-xs text-slate-600">The spiritual capital of the world offering white water river rafting, cliff jumping, Ganga Aarti, and luxury wellness retreats.</p>
            <a href="https://wa.me/916284073623?text=Inquiry%20for%20Rishikesh" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Book Rishikesh Package</a>
          </article>

          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 class="text-2xl font-bold font-serif text-[#0F172A]">Kedarnath & Badrinath</h2>
            <p class="text-xs text-[#E11D48] font-bold uppercase">High Himalayan Chardham Pilgrimage</p>
            <p class="text-xs text-slate-600">Sacred Jyotirlinga shrine set against snow-clad Himalayan peaks, accessible via trek or VIP helicopter package.</p>
            <a href="https://wa.me/916284073623?text=Inquiry%20for%20Kedarnath" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Book Yatra Package</a>
          </article>

          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 class="text-2xl font-bold font-serif text-[#0F172A]">Mussoorie Queen of Hills</h2>
            <p class="text-xs text-[#E11D48] font-bold uppercase">Panoramic Valley Vistas & Waterfalls</p>
            <p class="text-xs text-slate-600">Colonial charm, Kempty Falls, Dhanaulti Eco Park, and romantic valley-view mountain resorts.</p>
            <a href="https://wa.me/916284073623?text=Inquiry%20for%20Mussoorie" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Book Mussoorie Package</a>
          </article>

          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 class="text-2xl font-bold font-serif text-[#0F172A]">Kainchi Dham & Bhowali</h2>
            <p class="text-xs text-[#E11D48] font-bold uppercase">Neem Karoli Baba Sacred Ashram</p>
            <p class="text-xs text-slate-600">World-famous spiritual ashram visited by global seekers, nestled in peaceful pine valleys near Bhimtal.</p>
            <a href="https://wa.me/916284073623?text=Inquiry%20for%20Kainchi%20Dham" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Book Ashram Tour</a>
          </article>
        </section>
      </div>
    `
  },
  '/hotels': {
    title: 'Luxury Hotels & Resorts in Uttarakhand | Samika Holidays',
    desc: 'Book physically audited luxury resorts, lakeside cottages, and mountain hotels in Nainital, Corbett, Mussoorie & Rishikesh.',
    canonical: `${SITE_URL}/hotels`,
    content: `
      <div class="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header class="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span class="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">100% PHYSICALLY AUDITED STAYS</span>
          <h1 class="text-5xl font-extrabold font-serif">Handpicked Luxury Resorts & Cottages</h1>
          <p class="max-w-2xl mx-auto text-slate-300">Verified for cleanliness, food quality, mountain views, and genuine mountain hospitality.</p>
        </header>

        <section class="max-w-[97%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 class="text-2xl font-bold font-serif text-[#0F172A]">Corbett Riverside Luxury Resort</h2>
            <p class="text-xs text-[#E11D48] font-bold">Jim Corbett National Park • 5.0 ★ (Luxury)</p>
            <p class="text-xs text-slate-600">Private riverside cottages, swimming pool, open lawn dining, and direct access to Corbett safari gates.</p>
            <p class="text-lg font-extrabold text-[#0F172A]">₹6,500 / Night</p>
            <a href="https://wa.me/916284073623?text=Book%20Corbett%20Riverside%20Resort" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Reserve Resort Stay</a>
          </article>

          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 class="text-2xl font-bold font-serif text-[#0F172A]">Nainital Heritage Lake Resort</h2>
            <p class="text-xs text-[#E11D48] font-bold">Nainital Mall Road • 4.9 ★ (Lake View)</p>
            <p class="text-xs text-slate-600">Colonial-style wooden suites overlooking Naini Lake, rooftop restaurant, and walking distance to boat stand.</p>
            <p class="text-lg font-extrabold text-[#0F172A]">₹5,200 / Night</p>
            <a href="https://wa.me/916284073623?text=Book%20Nainital%20Heritage%20Resort" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Reserve Resort Stay</a>
          </article>

          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <h2 class="text-2xl font-bold font-serif text-[#0F172A]">Rishikesh Ganga View Spa Retreat</h2>
            <p class="text-xs text-[#E11D48] font-bold">Rishikesh • 4.9 ★ (Wellness & Rafting)</p>
            <p class="text-xs text-slate-600">Riverside infinity pool, Ayurvedic spa, private yoga deck overlooking holy Ganga river.</p>
            <p class="text-lg font-extrabold text-[#0F172A]">₹5,800 / Night</p>
            <a href="https://wa.me/916284073623?text=Book%20Rishikesh%20Spa%20Resort" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold">Reserve Resort Stay</a>
          </article>
        </section>
      </div>
    `
  },
  '/packages': {
    title: 'Tour Packages in Uttarakhand | Samika Holidays',
    desc: 'Explore curated family tour packages, wildlife safaris, spiritual yatras, and honeymoon trips in Uttarakhand.',
    canonical: `${SITE_URL}/packages`,
    content: `
      <div class="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header class="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span class="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">BESPOKE HIMALAYAN ITINERARIES</span>
          <h1 class="text-5xl font-extrabold font-serif">Curated Uttarakhand Tour Packages</h1>
          <p class="max-w-2xl mx-auto text-slate-300">Customized for families, couples, corporate groups, and spiritual pilgrims.</p>
        </header>

        <section class="max-w-[97%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <span class="bg-[#0F172A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">3 Days / 2 Nights</span>
            <h2 class="text-2xl font-bold font-serif text-[#0F172A]">Jim Corbett Wildlife Safari Experience</h2>
            <p class="text-xs text-[#E11D48] font-bold">Corbett National Park • Family & Adventure</p>
            <p class="text-xs text-slate-600">Includes 4-Star Riverside Resort Stay, Open Jeep Jungle Safari, All Meals, and Evening Bonfire Night.</p>
            <p class="text-xl font-extrabold text-[#E11D48]">₹8,999 / Person</p>
            <a href="https://wa.me/916284073623?text=Book%20Corbett%20Tour%20Package" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-6 py-3 rounded-xl text-xs font-bold">Book Package Now</a>
          </article>

          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <span class="bg-[#0F172A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">4 Days / 3 Nights</span>
            <h2 class="text-2xl font-bold font-serif text-[#0F172A]">Nainital & Bhimtal Lake Holiday</h2>
            <p class="text-xs text-[#E11D48] font-bold">Nainital, Bhimtal, Sattal • Honeymoon & Family</p>
            <p class="text-xs text-slate-600">Includes Lake View Hotel, Yacht Boating, Cable Car Ride, Local Sightseeing, and Private Car Transports.</p>
            <p class="text-xl font-extrabold text-[#E11D48]">₹11,499 / Person</p>
            <a href="https://wa.me/916284073623?text=Book%20Nainital%20Tour%20Package" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-6 py-3 rounded-xl text-xs font-bold">Book Package Now</a>
          </article>

          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-3">
            <span class="bg-[#0F172A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">5 Days / 4 Nights</span>
            <h2 class="text-2xl font-bold font-serif text-[#0F172A]">Kedarnath Divine Helicopter Yatra</h2>
            <p class="text-xs text-[#E11D48] font-bold">Guptkashi & Kedarnath • Spiritual Pilgrimage</p>
            <p class="text-xs text-slate-600">Includes Helicopter Priority Tickets, Guptkashi Resort, VIP Darshan Assistance, Meals, and Experienced Guide.</p>
            <p class="text-xl font-extrabold text-[#E11D48]">₹21,999 / Person</p>
            <a href="https://wa.me/916284073623?text=Book%20Kedarnath%20Yatra%20Package" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white px-6 py-3 rounded-xl text-xs font-bold">Book Package Now</a>
          </article>
        </section>
      </div>
    `
  },
  '/weddings': {
    title: 'Destination Weddings in Uttarakhand | Samika Holidays',
    desc: 'Plan breathtaking mountain & lakeside destination weddings in Uttarakhand with end-to-end luxury management.',
    canonical: `${SITE_URL}/weddings`,
    content: `
      <div class="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header class="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span class="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">ROYAL HIMALAYAN WEDDINGS</span>
          <h1 class="text-5xl font-extrabold font-serif">Breathtaking Mountain & Lake Weddings</h1>
          <p class="max-w-2xl mx-auto text-slate-300">Turn your wedding into an unforgettable Himalayan fairy tale.</p>
        </header>
        <section class="max-w-[97%] mx-auto bg-white p-10 rounded-3xl shadow-xl text-center space-y-6">
          <h2 class="text-3xl font-bold font-serif">Riverside Mandaps & Lakeside Reception Lawns</h2>
          <p class="text-slate-600 max-w-xl mx-auto">From 5-star Corbett jungle resorts to Nainital lakefront estates and Mussoorie hilltop vistas.</p>
          <a href="https://wa.me/916284073623?text=Inquiry%20for%20Destination%20Wedding" class="inline-block bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white font-bold px-8 py-4 rounded-2xl">Plan Wedding With Us</a>
        </section>
      </div>
    `
  },
  '/corporate': {
    title: 'Corporate Tours & Retreats in Uttarakhand | Samika Holidays',
    desc: 'State-of-the-art MICE conference halls, team bonding safaris, and luxury resort buyouts in Uttarakhand Himalayas.',
    canonical: `${SITE_URL}/corporate`,
    content: `
      <div class="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header class="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span class="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">EXECUTIVE MICE & OFFSITES</span>
          <h1 class="text-5xl font-extrabold font-serif">Corporate Tours & Retreats in Uttarakhand</h1>
          <p class="max-w-2xl mx-auto text-slate-300">State-of-the-art MICE conference halls, team bonding safaris, and luxury resort buyouts.</p>
        </header>
        <section class="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border space-y-6">
          <h2 class="text-3xl font-bold font-serif text-center">Request Corporate RFP Proposal</h2>
          <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Contact Person" class="p-3 bg-slate-50 border rounded-xl" />
            <input type="text" placeholder="Company Name" class="p-3 bg-slate-50 border rounded-xl" />
            <input type="tel" placeholder="Phone (+91...)" class="p-3 bg-slate-50 border rounded-xl" />
            <input type="email" placeholder="Official Email" class="p-3 bg-slate-50 border rounded-xl" />
            <button type="submit" class="md:col-span-2 bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white font-bold p-4 rounded-xl">Request Proposal</button>
          </form>
        </section>
      </div>
    `
  },
  '/blogs': {
    title: 'Travel Blogs & Guides | Samika Holidays',
    desc: 'Read insider travel guides, itinerary tips, best places to visit, and local stories from Devbhoomi Uttarakhand.',
    canonical: `${SITE_URL}/blogs`,
    content: `
      <div class="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header class="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span class="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">HIMALAYAN TRAVEL JOURNAL</span>
          <h1 class="text-5xl font-extrabold font-serif">Uttarakhand Travel Blogs & Guides</h1>
        </header>
        <section class="max-w-[97%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-2">
            <h2 class="text-xl font-bold font-serif">Ultimate 3-Day Jim Corbett Safari Itinerary</h2>
            <p class="text-xs text-slate-500">Best zones, safari timing, resort stay tips, and wildlife rules.</p>
          </article>
          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-2">
            <h2 class="text-xl font-bold font-serif">Top 10 Hidden Places in Nainital Lake District</h2>
            <p class="text-xs text-slate-500">Beyond Mall Road: Pangot, Mukteshwar, Bhimtal & Sattal lakes.</p>
          </article>
          <article class="bg-white rounded-3xl p-6 shadow-md border space-y-2">
            <h2 class="text-xl font-bold font-serif">Kedarnath Yatra 2026: Complete Registration Guide</h2>
            <p class="text-xs text-slate-500">Helicopter booking tips, trek medical fitness, and stay options.</p>
          </article>
        </section>
      </div>
    `
  },
  '/about': {
    title: 'About Us & Our Heritage | Samika Holidays',
    desc: 'Learn about Samika Holidays, our local mountain roots, verified resort networks, and commitment to Pahadi hospitality.',
    canonical: `${SITE_URL}/about`,
    content: `
      <div class="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header class="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span class="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">THE STORY OF SAMIKA HOLIDAYS</span>
          <h1 class="text-5xl font-extrabold font-serif">Crafting Journeys Across Devbhoomi</h1>
          <p class="max-w-2xl mx-auto text-slate-300">Born in the mountains, dedicated to 100% verified luxury stays & on-ground concierge care.</p>
        </header>
        <section class="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl text-center space-y-4 border">
          <h2 class="text-2xl font-bold font-serif">10,000+ Happy Travelers • 500+ Audited Resorts</h2>
          <p class="text-slate-600 text-sm">Samika Holidays is your trusted local mountain concierge in Uttarakhand.</p>
        </section>
      </div>
    `
  },
  '/contact': {
    title: 'Contact Us & Help Desk | Samika Holidays',
    desc: 'Get in touch with Samika Holidays travel desk via phone +91 6284 073 623 or email info@samikaholiday.com.',
    canonical: `${SITE_URL}/contact`,
    content: `
      <div class="space-y-16 bg-[#F8FAFC] text-slate-900 pb-20">
        <header class="bg-[#0F172A] text-white p-12 text-center space-y-4">
          <span class="bg-[#E11D48]/20 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase">24X7 TRAVEL HELPDESK</span>
          <h1 class="text-5xl font-extrabold font-serif">Connect With Our Mountain Concierge</h1>
        </header>
        <section class="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border space-y-4 text-center">
          <p class="text-lg font-bold text-[#0F172A]">Phone / WhatsApp: +91 6284 073 623</p>
          <p class="text-lg font-bold text-[#0F172A]">Email: info@samikaholiday.com</p>
          <p class="text-slate-600">Uttarakhand Headquarters with local desks in Nainital, Corbett & Haridwar.</p>
        </section>
      </div>
    `
  }
};

function devHtmlPrerenderPlugin() {
  return {
    name: 'dev-html-prerender-plugin',
    transformIndexHtml(html, ctx) {
      const urlPath = (ctx.originalUrl || ctx.url || '/').split('?')[0].toLowerCase();
      const matchedData = routeSeoMap[urlPath];

      if (!matchedData) return html;

      let resHtml = html;
      resHtml = resHtml.replace(/<title>.*?<\/title>/, `<title>${matchedData.title}</title>`);
      resHtml = resHtml.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${matchedData.desc}" />`);
      resHtml = resHtml.replace(/<link id="canonical-url" rel="canonical" href=".*?" \/>/, `<link id="canonical-url" rel="canonical" href="${matchedData.canonical}" />`);
      resHtml = resHtml.replace(/<meta id="og-title" property="og:title" content=".*?" \/>/, `<meta id="og-title" property="og:title" content="${matchedData.title}" />`);
      resHtml = resHtml.replace(/<meta id="og-description" property="og:description" content=".*?" \/>/, `<meta id="og-description" property="og:description" content="${matchedData.desc}" />`);
      resHtml = resHtml.replace(/<meta id="og-url" property="og:url" content=".*?" \/>/, `<meta id="og-url" property="og:url" content="${matchedData.canonical}" />`);

      resHtml = resHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${matchedData.content}</div>`
      );

      return resHtml;
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devHtmlPrerenderPlugin()],
})
