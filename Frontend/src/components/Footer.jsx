import { MapPin, Phone, Mail, Globe } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const handleNavClick = (tabId) => {
    if (setActiveTab) setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A261E] text-stone-300 pt-14 pb-8 border-t border-emerald-950">
      <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* Direct Footer Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-emerald-900/60">
          
          {/* Col 1: Brand & Bio (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => handleNavClick('home')}
            >
              <img 
                src="/logo.png" 
                alt="Atithya Stay Logo" 
                className="h-16 w-auto object-contain" 
              />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Your trusted travel partner for hotels, resorts, tour packages, destination weddings and unforgettable experiences across Uttarakhand.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {/* Facebook */}
              <a href="https://www.facebook.com/mdhotelsofficial" target='blank' className="w-8 h-8 rounded-full bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-stone-300 hover:text-[#C8933E] hover:border-[#C8933E] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.23 0-1.62.77-1.62 1.56V12h2.78l-.44 3h-2.34v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/mdhotels_official?igsi=MnVzeHhzbGF3OTVw" target='blank' className="w-8 h-8 rounded-full bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-stone-300 hover:text-[#C8933E] hover:border-[#C8933E] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/919258677823" target="_blank" rel="noreferrer" title="Chat on WhatsApp" className="w-8 h-8 rounded-full bg-emerald-900/80 border border-emerald-800 flex items-center justify-center text-emerald-400 hover:text-[#C8933E] hover:border-[#C8933E] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.6 4.19c-.2 0-.44.07-.67.33-.23.26-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.57.13-.17.26-.66.81-.81.98-.15.17-.3.19-.55.07-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.5-1.4-1.75-.15-.26-.02-.4.11-.53.11-.11.25-.29.38-.44.13-.15.17-.26.25-.43.08-.17.04-.33-.02-.46-.06-.13-.57-1.37-.78-1.88-.2-.5-.41-.43-.57-.44l-.49-.01z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-white text-sm tracking-wide uppercase mb-4 border-b border-emerald-800/50 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {[
                { name: 'Home', tab: 'home' },
                { name: 'Hotels', tab: 'hotels' },
                { name: 'Destinations', tab: 'destinations' },
                { name: 'Tour Packages', tab: 'packages' },
                { name: 'Weddings', tab: 'weddings' },
                { name: 'Corporate', tab: 'corporate' },
                { name: 'Travel Blogs', tab: 'blogs' },
                { name: 'About Us', tab: 'about' },
                { name: 'Contact Us', tab: 'contact' }
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.tab)}
                    className="text-stone-400 hover:text-[#C8933E] transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Top Destinations (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-white text-sm tracking-wide uppercase mb-4 border-b border-emerald-800/50 pb-2 inline-block">
              Destinations
            </h4>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-xs font-medium">
              {['Jim Corbett', 'Nainital', 'Bhimtal', 'Mukteshwar', 'Rishikesh', 'Mussoorie', 'Auli', 'Chardham Yatra'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="text-stone-400 hover:text-[#C8933E] transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Haldwani Office (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-semibold text-white text-sm tracking-wide uppercase mb-4 border-b border-emerald-800/50 pb-2 inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C8933E]" />
              <span>Haldwani Office</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-stone-300">
              <li>
                <a href="tel:+916395643686" className="flex items-center gap-2 hover:text-[#C8933E] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#C8933E] shrink-0" />
                  <span>6395643686</span>
                </a>
              </li>
              <li>
                <a href="tel:+919258677823" className="flex items-center gap-2 hover:text-[#C8933E] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#C8933E] shrink-0" />
                  <span>9258677823</span>
                </a>
              </li>
              <li>
                <a href="tel:+917668284863" className="flex items-center gap-2 hover:text-[#C8933E] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#C8933E] shrink-0" />
                  <span>7668284863</span>
                </a>
              </li>
              <li>
                <a href="tel:+916395865593" className="flex items-center gap-2 hover:text-[#C8933E] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#C8933E] shrink-0" />
                  <span>6395865593</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Haridwar Office & Online Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-semibold text-white text-sm tracking-wide uppercase mb-4 border-b border-emerald-800/50 pb-2 inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C8933E]" />
              <span>Haridwar Office</span>
            </h4>
            
            <ul className="space-y-3 text-xs font-medium text-stone-300">
              <li>
                <a href="tel:+917819913686" className="flex items-center gap-2 hover:text-[#C8933E] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#C8933E] shrink-0" />
                  <span>7819913686</span>
                </a>
              </li>

              <li className="pt-2 border-t border-emerald-900/60">
                <a 
                  href="mailto:reservations@atithyastay.com" 
                  className="flex items-center gap-2.5 hover:text-[#C8933E] transition-colors break-all"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-[#C8933E]/70 flex items-center justify-center text-[#C8933E] shrink-0">
                    <Mail className="w-2.5 h-2.5" />
                  </span>
                  <span>reservations@atithyastay.com</span>
                </a>
              </li>

              <li>
                <a 
                  href="https://www.atithyastay.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#C8933E] transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-[#C8933E]/70 flex items-center justify-center text-[#C8933E] shrink-0">
                    <Globe className="w-2.5 h-2.5" />
                  </span>
                  <span>www.atithyastay.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Script Tagline Banner with Leaves */}
        <div className="py-6 flex items-center justify-center gap-3 text-center border-b border-emerald-950">
          <span className="text-[#C8933E] text-base sm:text-xl">🌿</span>
          <span className="font-serif italic text-lg sm:text-2xl text-[#E8C280] font-medium tracking-wide drop-shadow-sm">
            Atithya Stay – Your Hospitality Partner
          </span>
          <span className="text-[#C8933E] text-base sm:text-xl">🌿</span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © 2026 Atithya Stay. All Rights Reserved.
          </div>

          <div className="text-center text-stone-400">
            <span>Developed by </span>
            <a 
              href="https://buimbdigital.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#C8933E] hover:text-[#E8C280] font-semibold hover:underline transition-colors"
            >
              Buimb Research and LLP
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
