import React, { useState, useEffect } from 'react';
import { 
  Ticket, Calendar, MapPin, CheckCircle2, Clock, Download, Phone, 
  MessageCircle, CreditCard, ShieldCheck, Hotel, Utensils, Car, Sparkles, User, FileText, ChevronRight,
  LogOut, Headphones, Mail, Settings, Edit3, Award, Compass, Luggage, ArrowRight, AlertCircle, Check
} from 'lucide-react';

export default function UserDashboard({ 
  enquiries = [], 
  packages = [], 
  onOpenEnquiry, 
  onLogout,
  setActiveTab: setGlobalActiveTab 
}) {
  const [activeTab, setActiveTab] = useState('bookings');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load Logged-In User from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('samika_current_user') || localStorage.getItem('atithya_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Profile Form State initialized from authenticated user
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Valued Traveler',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || 'Uttarakhand, India'
  });

  useEffect(() => {
    if (currentUser) {
      setProfile({
        name: currentUser.name || 'Valued Traveler',
        phone: currentUser.phone || '',
        email: currentUser.email || '',
        address: currentUser.address || 'Uttarakhand, India'
      });
    }
  }, [currentUser]);

  // Filter Bookings & Enquiries strictly for THIS logged-in user
  const userBookings = (enquiries || []).filter((enq) => {
    if (!enq) return false;
    const userEmail = (currentUser?.email || '').trim().toLowerCase();
    const userPhone = (currentUser?.phone || '').trim().replace(/\D/g, '');
    const enqEmail = (enq.email || '').trim().toLowerCase();
    const enqPhone = (enq.phone || '').trim().replace(/\D/g, '');

    const emailMatches = Boolean(userEmail && enqEmail && userEmail === enqEmail);
    const phoneMatches = Boolean(userPhone && enqPhone && (userPhone === enqPhone || userPhone.endsWith(enqPhone) || enqPhone.endsWith(userPhone)));

    return emailMatches || phoneMatches;
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    const updated = {
      ...(currentUser || {}),
      name: profile.name,
      phone: profile.phone,
      email: profile.email,
      address: profile.address
    };
    setCurrentUser(updated);
    localStorage.setItem('samika_current_user', JSON.stringify(updated));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 py-8 space-y-8 min-h-screen">
      
      {/* Dashboard 2-Column Grid (25% Left Sidebar | 75% Right Main Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: 25% SIDEBAR (lg:col-span-3)                 */}
        {/* ======================================================== */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* User Profile Summary Card */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-full bg-[#0F382C] text-[#C8933E] flex items-center justify-center font-bold text-3xl mx-auto shadow-md border-2 border-[#C8933E]/40">
                {(profile.name || 'U')[0].toUpperCase()}
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" title="Active Traveler" />
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold text-[#0F382C]">{profile.name}</h2>
              <p className="text-[11px] text-stone-500 font-semibold">{profile.email || 'Registered Member'}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-[#C8933E]/15 text-[#C8933E] border border-[#C8933E]/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Award className="w-3 h-3" />
                <span>Prime Member</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 text-left text-xs space-y-2 text-stone-600">
              {profile.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#0F382C] shrink-0" />
                  <span className="truncate">{profile.phone}</span>
                </div>
              )}
              {profile.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#0F382C] shrink-0" />
                  <span className="line-clamp-1">{profile.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Left Vertical Navigation Menu */}
          <div className="bg-white rounded-3xl p-3 border border-stone-200 shadow-sm space-y-1">
            
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Ticket className={`w-4 h-4 ${activeTab === 'bookings' ? 'text-[#C8933E]' : 'text-stone-500'}`} />
                <span>My Bookings</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === 'bookings' ? 'bg-[#C8933E] text-white' : 'bg-stone-100 text-stone-600'
              }`}>
                {userBookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'billing'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className={`w-4 h-4 ${activeTab === 'billing' ? 'text-[#C8933E]' : 'text-stone-500'}`} />
                <span>Billing & Invoices</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className={`w-4 h-4 ${activeTab === 'profile' ? 'text-[#C8933E]' : 'text-stone-500'}`} />
                <span>Profile & Address</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'support'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Headphones className={`w-4 h-4 ${activeTab === 'support' ? 'text-[#C8933E]' : 'text-stone-500'}`} />
                <span>Help & Support</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all cursor-pointer pt-2 border-t border-stone-100"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>

          </div>

          {/* Quick Support Banner in Sidebar */}
          <div className="bg-gradient-to-br from-[#0F382C] to-[#164e3e] text-white rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#C8933E] font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Need Assistance?</span>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed">
              Our 24x7 travel desk is ready to assist you with tour customized bookings & hotel upgrades.
            </p>
            <a
              href="https://wa.me/919258677823"
              target="_blank"
              rel="noreferrer"
              className="bg-[#C8933E] hover:bg-[#B5812F] text-white py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: 75% MAIN CONTENT AREA (lg:col-span-9)      */}
        {/* ======================================================== */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: MY BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F382C]">My Booked Trips & Packages</h2>
                  <p className="text-xs text-stone-500">Manage your active tour vouchers, itineraries, and booking requests.</p>
                </div>
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry('New Package Booking')}
                  className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book New Tour</span>
                </button>
              </div>

              {/* DYNAMIC LIST OF BOOKINGS FOR THIS USER */}
              {userBookings.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {userBookings.map((booking, idx) => {
                    const bookingId = booking.id || booking._id || `AS-2026-${1000 + idx}`;
                    const title = booking.packageTitle || booking.title || 'Uttarakhand Custom Tour';
                    const destination = booking.destination || 'Uttarakhand, India';
                    const status = booking.status || 'Pending';
                    const paymentStatus = booking.paymentStatus || 'Payment on Confirmation';
                    const date = booking.date || booking.dates || (booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Upcoming');
                    const guests = booking.guests || booking.people || `${booking.guestsCount || 2} Guests`;
                    const amount = booking.amount || booking.total || booking.budget || 'Custom Quote';
                    const image = booking.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80';

                    return (
                      <div 
                        key={bookingId} 
                        className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 grid grid-cols-1 md:grid-cols-12"
                      >
                        {/* Image */}
                        <div className="md:col-span-4 relative min-h-[200px] bg-stone-900">
                          <img src={image} alt={title} className="w-full h-full object-cover" />
                          <span className={`absolute top-4 left-4 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow-md ${
                            status === 'Confirmed' 
                              ? 'bg-emerald-600' 
                              : status === 'Cancelled' 
                              ? 'bg-red-600' 
                              : 'bg-amber-600'
                          }`}>
                            {status}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-8 p-6 flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">REF ID: {bookingId}</span>
                                <h3 className="font-serif text-xl font-bold text-[#0F382C]">{title}</h3>
                                <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3.5 h-3.5 text-[#C8933E]" />
                                  <span>{destination}</span>
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Amount</span>
                                <div className="text-lg font-extrabold text-[#0F382C]">
                                  {typeof amount === 'number' ? `₹${amount.toLocaleString('en-IN')}` : amount}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 text-xs">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-stone-400 block">Date</span>
                                <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5 text-[11px]">
                                  <Calendar className="w-3.5 h-3.5 text-[#0F382C]" />
                                  <span>{date}</span>
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-stone-400 block">Travelers</span>
                                <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5 text-[11px]">
                                  <User className="w-3.5 h-3.5 text-[#0F382C]" />
                                  <span>{guests}</span>
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-stone-400 block">Status</span>
                                <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5 text-[11px]">
                                  <Clock className="w-3.5 h-3.5 text-[#C8933E]" />
                                  <span>{status}</span>
                                </span>
                              </div>
                            </div>

                            {booking.message && (
                              <p className="text-xs text-stone-600 italic bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                                "{booking.message}"
                              </p>
                            )}
                          </div>

                          {/* Action */}
                          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                              <ShieldCheck className="w-4 h-4" />
                              <span>{paymentStatus}</span>
                            </div>

                            <button
                              onClick={() => setSelectedInvoice({
                                bookingId,
                                title,
                                destination,
                                date,
                                guests,
                                amount,
                                paymentStatus,
                                status
                              })}
                              className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 border border-stone-300 transition-all cursor-pointer"
                            >
                              <FileText className="w-4 h-4 text-[#0F382C]" />
                              <span>View Receipt</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                /* EMPTY STATE: USER HAS NOT BOOKED ANYTHING YET */
                <div className="bg-white rounded-3xl p-10 sm:p-14 border border-stone-200 shadow-sm text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-[#FAF7F2] text-[#0F382C] border border-[#E7DECD] flex items-center justify-center mx-auto shadow-inner">
                    <Luggage className="w-10 h-10 text-[#C8933E]" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="font-serif text-2xl font-bold text-[#0F382C]">No Trips Booked Yet</h3>
                    <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                      You haven't booked any tour packages or hotel stays yet. 
                      Explore our handpicked Uttarakhand tour itineraries and start your mountain adventure!
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    {setGlobalActiveTab && (
                      <button
                        onClick={() => setGlobalActiveTab('packages')}
                        className="bg-[#0F382C] hover:bg-[#0A261E] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Compass className="w-4 h-4 text-[#C8933E]" />
                        <span>Explore Tour Packages</span>
                      </button>
                    )}

                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry('Custom Holiday Plan')}
                      className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Request Custom Itinerary</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: BILLING & INVOICES */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
                <h2 className="font-serif text-2xl font-bold text-[#0F382C]">Billing Statements & Vouchers</h2>
                <p className="text-xs text-stone-500">Download invoice receipts and tax invoices for your confirmed tour bookings.</p>
              </div>

              {userBookings.length > 0 ? (
                <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF7F2] text-stone-700 font-bold border-b border-stone-200 uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-4 px-6">Booking Ref</th>
                          <th className="py-4 px-6">Package / Tour</th>
                          <th className="py-4 px-6">Date</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6">Amount</th>
                          <th className="py-4 px-6 text-right">Invoice Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 font-medium">
                        {userBookings.map((b, idx) => {
                          const bookingId = b.id || b._id || `AS-2026-${1000 + idx}`;
                          const title = b.packageTitle || b.title || 'Uttarakhand Custom Tour';
                          const date = b.date || b.dates || (b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'Recent');
                          const paymentStatus = b.paymentStatus || 'Payment on Confirmation';
                          const amount = b.amount || b.total || b.budget || 'Custom Quote';

                          return (
                            <tr key={bookingId} className="hover:bg-stone-50 transition-colors">
                              <td className="py-4 px-6 font-bold text-stone-900">{bookingId}</td>
                              <td className="py-4 px-6 font-bold text-[#0F382C]">{title}</td>
                              <td className="py-4 px-6 text-stone-600">{date}</td>
                              <td className="py-4 px-6">
                                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] font-bold">
                                  {paymentStatus}
                                </span>
                              </td>
                              <td className="py-4 px-6 font-extrabold text-stone-900 text-sm">
                                {typeof amount === 'number' ? `₹${amount.toLocaleString('en-IN')}` : amount}
                              </td>
                              <td className="py-4 px-6 text-right">
                                <button
                                  onClick={() => setSelectedInvoice({
                                    bookingId,
                                    title,
                                    destination: b.destination || 'Uttarakhand',
                                    date,
                                    guests: b.guests || b.people || '2 Guests',
                                    amount,
                                    paymentStatus
                                  })}
                                  className="bg-[#0F382C] text-white hover:bg-[#0C2D23] px-3.5 py-2 rounded-lg font-bold text-xs inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>Receipt</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-10 border border-stone-200 shadow-sm text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#0F382C] border border-[#E7DECD] flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8 text-[#C8933E]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">No Invoices Available</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Invoices and tax receipts are automatically generated once you book a package or resort with us.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE & ADDRESS */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0F382C]">My Account Profile & Address</h2>
                <p className="text-xs text-stone-500">Update your contact information for seamless hotel check-in and booking communications.</p>
              </div>

              {saveSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs font-bold animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="user@example.com"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Address / Location</label>
                  <textarea
                    rows={3}
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    placeholder="Your city / state / address"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#0F382C] text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md hover:bg-[#0C2D23] transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-[#C8933E]" />
                  <span>Save Profile Changes</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: SUPPORT */}
          {activeTab === 'support' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0F382C]">24x7 Customer Support Desk</h2>
                <p className="text-xs text-stone-500">Contact our Himalayan tour team directly for booking queries, cab assistance, or hotel upgrades.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
                  <Phone className="w-8 h-8 text-[#0F382C]" />
                  <h3 className="font-bold text-stone-900 text-sm">Emergency Phone Line</h3>
                  <p className="text-xs text-stone-600">Available 24 hours a day, 7 days a week for active trips.</p>
                  <a href="tel:+919258677823" className="inline-block text-[#0F382C] font-extrabold text-sm hover:underline">
                    +91 9258677823
                  </a>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
                  <MessageCircle className="w-8 h-8 text-emerald-600 fill-current" />
                  <h3 className="font-bold text-stone-900 text-sm">WhatsApp Live Chat</h3>
                  <p className="text-xs text-stone-600">Instant assistance for booking vouchers & driver details.</p>
                  <a 
                    href="https://wa.me/919258677823" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block text-emerald-700 font-extrabold text-sm hover:underline"
                  >
                    Chat Now on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* BILLING INVOICE MODAL POPUP */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 animate-in fade-in zoom-in-95">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                <div>
                  <div className="font-serif text-lg font-bold text-[#0F382C]">Samika Holidays Booking Voucher</div>
                  <div className="text-[10px] text-stone-400 font-bold">GSTIN: 05AAACA1234F1Z9</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full p-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Bill Details */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Booking Ref</span>
                  <span className="font-bold text-stone-900">{selectedInvoice.bookingId}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Travel Date</span>
                  <span className="font-bold text-stone-900">{selectedInvoice.date}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Package / Stay</span>
                <div className="font-serif text-lg font-bold text-[#0F382C]">{selectedInvoice.title}</div>
                <div className="text-stone-500 text-[11px]">{selectedInvoice.destination} • {selectedInvoice.guests}</div>
              </div>

              {/* Status Info */}
              <div className="border-t border-stone-200 pt-4 space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Guest Name</span>
                  <span className="font-bold text-stone-900">{profile.name}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Booking Status</span>
                  <span className="font-bold text-emerald-700">{selectedInvoice.status || 'Active'}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Payment Status</span>
                  <span className="font-bold text-emerald-700">{selectedInvoice.paymentStatus}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#0F382C] border-t border-stone-300 pt-2">
                  <span>Total Package Value</span>
                  <span>{typeof selectedInvoice.amount === 'number' ? `₹${selectedInvoice.amount.toLocaleString('en-IN')}` : selectedInvoice.amount}</span>
                </div>
              </div>
            </div>

            {/* Print / Download Button */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handlePrintInvoice}
                className="w-full bg-[#0F382C] hover:bg-[#0C2D23] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#C8933E]" />
                <span>Print / Download Voucher</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
