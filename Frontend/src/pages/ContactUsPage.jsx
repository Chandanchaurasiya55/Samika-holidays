import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2, Headphones, 
  ShieldCheck, Sparkles, Globe, Building2, Calendar, Users
} from 'lucide-react';

export default function ContactUsPage({ onAddEnquiry }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Tour Package Booking',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newEnquiry = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      destination: 'Uttarakhand (Contact Form)',
      service: formData.subject || 'Contact Form Inquiry',
      guests: '2 Guests',
      date: new Date().toISOString().split('T')[0],
      notes: formData.message || '',
      status: 'Pending',
      paidAmount: 0,
      totalAmount: 15000,
      paymentStatus: 'Unpaid'
    };

    if (onAddEnquiry) {
      await onAddEnquiry(newEnquiry);
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '', email: '', subject: 'Tour Package Booking', message: '' });
    }, 3500);
  };

  return (
    <div className="space-y-16 pb-20 bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Hero Header */}
      <section className="relative bg-[#0F172A] text-white pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[440px] flex flex-col justify-center">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/40" />

        <div className="relative max-w-4xl mx-auto text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-[#FF6B35] border border-rose-500/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>24/7 Dedicated Mountain Concierge</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Connect With Samika Holidays <br />
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF385C] to-[#E11D48] bg-clip-text text-transparent italic">
              Your Uttarakhand Specialists
            </span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Planning a family tour, jungle safari, luxury resort stay, or destination wedding? Speak directly with our native destination managers.
          </p>
        </div>
      </section>

      {/* Main Contact Content */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Office Contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <span className="text-xs uppercase font-extrabold text-[#E11D48] tracking-widest block">
                LOCAL HELPDESK
              </span>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mt-1">
                We're Here Whenever You Need Us
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                Connect with our local Uttarakhand team for immediate booking confirmations, seasonal discounts, and custom packages.
              </p>
            </div>

            {/* Main Office Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#E11D48] flex items-center justify-center shrink-0 shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight">
                    Uttarakhand Main Desk
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Nainital & Corbett Gateway Hub</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <Phone className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>Call & WhatsApp Lines:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a 
                    href="tel:+919258677823" 
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-rose-50 hover:text-[#E11D48] border border-slate-200 font-bold text-slate-800 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
                    <span>+91 92586 77823</span>
                  </a>
                  <a 
                    href="tel:+917819913686" 
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-rose-50 hover:text-[#E11D48] border border-slate-200 font-bold text-slate-800 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
                    <span>+91 78199 13686</span>
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0" />
                  <span className="text-xs text-slate-600 font-medium">Uttarakhand, India</span>
                </div>
                <a
                  href="https://wa.me/919258677823?text=Hello%20Samika%20Holidays%2C%20I%20need%20assistance."
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Online Support & Email Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <h4 className="font-serif text-base font-bold text-[#0F172A] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF6B35]" />
                <span>Online Helpdesk & Reservations</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 font-medium">Reservations:</span>
                  <a href="mailto:reservations@samikaholidays.com" className="font-bold text-[#E11D48] hover:underline">
                    reservations@samikaholidays.com
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 font-medium">General Inquiries:</span>
                  <a href="mailto:info@samikaholidays.com" className="font-bold text-[#E11D48] hover:underline">
                    info@samikaholidays.com
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 font-medium">Official Portal:</span>
                  <span className="font-bold text-[#FF6B35] flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    <span>www.samikaholidays.com</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#E11D48] text-xs font-bold uppercase tracking-wider mb-1">
                <Send className="w-4 h-4" />
                <span>INSTANT INQUIRY</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-slate-900">
                Send Us a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
                Fill in your trip details and our native destination expert will connect with you promptly.
              </p>

              {formSubmitted ? (
                <div className="py-16 text-center space-y-4 bg-rose-50 rounded-3xl border border-rose-200 p-8 animate-in fade-in">
                  <div className="w-16 h-16 bg-[#E11D48] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#0F172A]">
                    Thank You! Message Received
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    We have received your travel inquiry. Our dedicated Uttarakhand travel expert will call you shortly on your provided contact number.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold focus:border-[#E11D48] focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold focus:border-[#E11D48] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold focus:border-[#E11D48] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Service / Experience Interest</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold focus:border-[#E11D48] focus:bg-white focus:outline-none cursor-pointer"
                    >
                      <option value="Tour Package Booking">Tour Package Booking (Nainital, Corbett, Mussoorie, Auli)</option>
                      <option value="Hotel & Resort Booking">Luxury Hotel & Resort Booking</option>
                      <option value="Chardham Yatra Pilgrimage">Kedarnath & Chardham Yatra Pilgrimage</option>
                      <option value="Destination Wedding in Uttarakhand">Destination Wedding Planning</option>
                      <option value="Corporate Offsite & Retreat">Corporate Retreat / MICE</option>
                      <option value="General Inquiry">Custom Mountain Itinerary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Requirements / Dates / Message *</label>
                    <textarea
                      rows="6"
                      required
                      placeholder="Please mention travel dates, number of travelers, preferred destinations, or hotel preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full min-h-[160px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold focus:border-[#E11D48] focus:bg-white focus:outline-none leading-relaxed transition-all resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20 transition-all mt-2 cursor-pointer hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Travel Inquiry Now</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium mt-6">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Privacy Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#FF6B35]" />
                <span>Fast Callback Guarantee</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
