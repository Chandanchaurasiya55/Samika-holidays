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
    subject: 'General Inquiry',
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
      setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
    }, 3500);
  };

  return (
    <div className="space-y-16 pb-16 bg-stone-50">
      
      {/* Hero Header */}
      <section className="relative bg-[#0F382C] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Headphones className="w-4 h-4" />
            <span>24x7 Customer Support Desk</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold">
            Get in Touch With Us
          </h1>
          <p className="text-stone-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Planning a trip, customized tour package, luxury resort stay, or destination wedding in Uttarakhand? Our travel experts are available 24x7 to assist you.
          </p>
        </div>
      </section>

      {/* Main Contact Content */}
      <section className="w-[90%] mx-auto  px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column: Office Contacts & Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <span className="text-xs uppercase font-bold text-[#C8933E] tracking-widest block">
                OFFICIAL CONTACT DESK
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0F382C] mt-1">
                We're Here to Help
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Connect with our local offices in Haldwani and Haridwar for immediate booking confirmations, pricing, and custom itineraries.
              </p>
            </div>

            {/* Haldwani Office Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                <div className="w-11 h-11 rounded-2xl bg-[#0F382C] text-[#C8933E] flex items-center justify-center shrink-0 shadow-sm">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                    Haldwani Head Office
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Nainital Gateway • Main Booking Desk</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-stone-500 font-bold uppercase text-[10px] tracking-wider">
                  <Phone className="w-3.5 h-3.5 text-[#C8933E]" />
                  <span>Call Lines:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a 
                    href="tel:+916395643686" 
                    className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 hover:text-[#0F382C] border border-stone-200 font-bold text-stone-800 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>6395643686</span>
                  </a>
                  <a 
                    href="tel:+919258677823" 
                    className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 hover:text-[#0F382C] border border-stone-200 font-bold text-stone-800 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>9258677823</span>
                  </a>
                  <a 
                    href="tel:+917668284863" 
                    className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 hover:text-[#0F382C] border border-stone-200 font-bold text-stone-800 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>7668284863</span>
                  </a>
                  <a 
                    href="tel:+916395865593" 
                    className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 hover:text-[#0F382C] border border-stone-200 font-bold text-stone-800 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>6395865593</span>
                  </a>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                  <span className="text-xs text-stone-600 font-medium">Haldwani, Nainital Dist., Uttarakhand</span>
                </div>
                <a
                  href="https://wa.me/919258677823"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Haridwar Office Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                <div className="w-11 h-11 rounded-2xl bg-[#FAF7F2] text-[#C8933E] border border-amber-200 flex items-center justify-center shrink-0 shadow-sm">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                    Haridwar Regional Office
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Chardham & Garhwal Operations</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-stone-400 font-bold uppercase text-[10px] block">Direct Line:</span>
                  <a 
                    href="tel:+917819913686" 
                    className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 hover:text-[#0F382C] border border-stone-200 font-extrabold text-stone-900 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C8933E]" />
                    <span>+91 7819913686</span>
                  </a>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 font-bold uppercase text-[10px] block">Location:</span>
                  <div className="flex items-center gap-1.5 text-stone-700 font-semibold py-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Haridwar, Uttarakhand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Online Support & Email Details */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-stone-200/80 space-y-3">
              <h4 className="font-serif text-base font-bold text-[#0F382C] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8933E]" />
                <span>Online & Reservations Desk</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200">
                  <span className="text-stone-500 font-medium">Official Reservations:</span>
                  <a href="mailto:reservations@atithyastay.com" className="font-extrabold text-[#0F382C] hover:underline">
                    reservations@atithyastay.com
                  </a>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200">
                  <span className="text-stone-500 font-medium">General Inquiries:</span>
                  <a href="mailto:info@atithyastay.com" className="font-extrabold text-[#0F382C] hover:underline">
                    info@atithyastay.com
                  </a>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200">
                  <span className="text-stone-500 font-medium">Official Website:</span>
                  <a href="https://www.atithyastay.com" target="_blank" rel="noreferrer" className="font-extrabold text-[#C8933E] hover:underline flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    <span>www.atithyastay.com</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Send Us a Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#C8933E] text-xs font-bold uppercase tracking-wider mb-1">
                <Send className="w-4 h-4" />
                <span>DIRECT INQUIRY</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#0F382C]">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 mb-6">
                Fill in your details below and our destination manager will connect with you within 15 minutes.
              </p>

              {formSubmitted ? (
                <div className="py-16 text-center space-y-4 bg-emerald-50/60 rounded-3xl border border-emerald-200 p-8 animate-in fade-in">
                  <div className="w-16 h-16 bg-[#0F382C] text-[#C8933E] rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#0F382C]">
                    Thank You! Message Sent Successfully
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                    We have received your travel inquiry. Our dedicated Uttarakhand travel expert will call you shortly on your provided number.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 font-semibold focus:ring-2 focus:ring-[#0F382C] focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Phone Number (WhatsApp Preferred) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 font-semibold focus:ring-2 focus:ring-[#0F382C] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 font-semibold focus:ring-2 focus:ring-[#0F382C] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Service / Destination Type</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 font-semibold focus:ring-2 focus:ring-[#0F382C] focus:bg-white focus:outline-none cursor-pointer"
                    >
                      <option value="Tour Package Booking">Tour Package Booking (Nainital, Corbett, Mussoorie, Auli)</option>
                      <option value="Hotel & Resort Booking">Hotel & Resort Booking</option>
                      <option value="Chardham Yatra Pilgrimage">Chardham Yatra Pilgrimage</option>
                      <option value="Destination Wedding in Uttarakhand">Destination Wedding in Uttarakhand</option>
                      <option value="Corporate Offsite & Retreat">Corporate Offsite & Retreat</option>
                      <option value="General Inquiry">General Inquiry / Custom Itinerary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Your Travel Requirements / Message *</label>
                    <textarea
                      rows="7"
                      required
                      placeholder="Please share travel dates, number of guests, destination preferences, or budget requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full min-h-[180px] px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 font-semibold focus:ring-2 focus:ring-[#0F382C] focus:bg-white focus:outline-none leading-relaxed transition-all resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all mt-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#C8933E]" />
                    <span>Send Travel Inquiry Now</span>
                  </button>
                </form>
              )}
            </div>

            {/* Security Guarantee */}
            <div className="pt-6 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-medium mt-6">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Privacy Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C8933E]" />
                <span>Guaranteed Callback in 15 mins</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
