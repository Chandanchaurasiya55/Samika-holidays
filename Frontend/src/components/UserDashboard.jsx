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
      const saved = localStorage.getItem('samika_current_user');
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

  // Handle Profile Update & sync to localStorage
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...currentUser,
      name: profile.name,
      phone: profile.phone,
      email: profile.email,
      address: profile.address
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('samika_current_user', JSON.stringify(updatedUser));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen bg-[#F8FAFC]">
      
      {/* ======================================================== */}
      {/* TOP GREETING BANNER & USER METRICS                       */}
      {/* ======================================================== */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-[#FF6B35] border border-rose-500/40 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Samika Holidays Guest Portal</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold">
            Namaste, {profile.name}!
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Welcome to your personalized Himalayan travel hub. Track your confirmed bookings, download tour vouchers & manage receipts.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center">
            <div className="text-xl font-bold text-[#FF6B35]">{userBookings.length}</div>
            <div className="text-[11px] text-slate-300 font-medium">My Bookings</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center">
            <div className="text-xl font-bold text-emerald-400">
              {userBookings.filter(b => (b.status || '').toLowerCase() === 'confirmed').length}
            </div>
            <div className="text-[11px] text-slate-300 font-medium">Confirmed</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center col-span-2 sm:col-span-1">
            <div className="text-xl font-bold text-white">24/7</div>
            <div className="text-[11px] text-slate-300 font-medium">Concierge Help</div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DASHBOARD 2-COLUMN LAYOUT: 25% SIDEBAR + 75% MAIN CONTENT */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDEBAR NAVIGATION (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2">
            
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Ticket className="w-4 h-4" />
                <span>My Bookings</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'billing'
                  ? 'bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4" />
                <span>Billing & Invoices</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>Profile & Details</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'support'
                  ? 'bg-gradient-to-r from-[#E11D48] to-[#FF6B35] text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Headphones className="w-4 h-4" />
                <span>Help & Support</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all cursor-pointer pt-2 border-t border-slate-100"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>

          </div>

          {/* Quick Support Box */}
          <div className="bg-[#0F172A] text-white rounded-3xl p-5 shadow-sm space-y-3 border border-slate-800">
            <div className="flex items-center gap-2 text-[#FF6B35] font-bold text-xs">
              <Sparkles className="w-4 h-4 text-[#E11D48]" />
              <span>Need Assistance?</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our 24x7 local travel desk is ready to assist you with tour customization and hotel upgrades.
            </p>
            <a
              href="https://wa.me/919258677823"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* MAIN CONTENT AREA (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: MY BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F172A]">My Booked Trips & Packages</h2>
                  <p className="text-xs text-slate-500">Manage your active tour vouchers, itineraries, and booking requests.</p>
                </div>
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry('New Package Booking')}
                  className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book New Tour</span>
                </button>
              </div>

              {/* LIST OF BOOKINGS */}
              {userBookings.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {userBookings.map((booking, idx) => {
                    const bookingId = booking.id || booking._id || `SMK-2026-${1000 + idx}`;
                    const title = booking.packageTitle || booking.title || 'Uttarakhand Custom Tour';
                    const destination = booking.destination || 'Uttarakhand, India';
                    const status = booking.status || 'Pending';
                    const paymentStatus = booking.paymentStatus || 'Confirmed';
                    const date = booking.date || booking.dates || (booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Upcoming');
                    const guests = booking.guests || booking.people || `${booking.guestsCount || 2} Guests`;
                    const amount = booking.amount || booking.total || booking.budget || 'Custom Quote';
                    const image = booking.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80';

                    return (
                      <div 
                        key={bookingId} 
                        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 grid grid-cols-1 md:grid-cols-12"
                      >
                        <div className="md:col-span-4 relative min-h-[200px] bg-slate-900">
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

                        <div className="md:col-span-8 p-6 flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">REF ID: {bookingId}</span>
                                <h3 className="font-serif text-xl font-bold text-[#0F172A]">{title}</h3>
                                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                                  <span>{destination}</span>
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Amount</span>
                                <div className="text-lg font-extrabold text-[#0F172A]">
                                  {typeof amount === 'number' ? `₹${amount.toLocaleString('en-IN')}` : amount}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Date</span>
                                <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5 text-[11px]">
                                  <Calendar className="w-3.5 h-3.5 text-[#0F172A]" />
                                  <span>{date}</span>
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Travelers</span>
                                <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5 text-[11px]">
                                  <User className="w-3.5 h-3.5 text-[#0F172A]" />
                                  <span>{guests}</span>
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
                                <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5 text-[11px]">
                                  <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
                                  <span>{status}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
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
                              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 border border-slate-300 transition-all cursor-pointer"
                            >
                              <FileText className="w-4 h-4 text-[#0F172A]" />
                              <span>View Voucher</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 shadow-sm text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-slate-100 text-[#0F172A] border border-slate-200 flex items-center justify-center mx-auto shadow-inner">
                    <Luggage className="w-10 h-10 text-[#FF6B35]" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="font-serif text-2xl font-bold text-[#0F172A]">No Trips Booked Yet</h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      You haven't booked any tour packages or hotel stays yet. Explore our handpicked Uttarakhand tour itineraries and start your mountain adventure!
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    {setGlobalActiveTab && (
                      <button
                        onClick={() => setGlobalActiveTab('packages')}
                        className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Compass className="w-4 h-4 text-[#FF6B35]" />
                        <span>Explore Tour Packages</span>
                      </button>
                    )}

                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry('Custom Holiday Plan')}
                      className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
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
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <h2 className="font-serif text-2xl font-bold text-[#0F172A]">Billing Statements & Vouchers</h2>
                <p className="text-xs text-slate-500">Download invoice receipts and tax invoices for your confirmed tour bookings.</p>
              </div>

              {userBookings.length > 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-4 px-6">Booking Ref</th>
                          <th className="py-4 px-6">Package / Tour</th>
                          <th className="py-4 px-6">Date</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6">Amount</th>
                          <th className="py-4 px-6 text-right">Invoice Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {userBookings.map((b, idx) => {
                          const bookingId = b.id || b._id || `SMK-2026-${1000 + idx}`;
                          const title = b.packageTitle || b.title || 'Uttarakhand Custom Tour';
                          const date = b.date || b.dates || (b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'Recent');
                          const paymentStatus = b.paymentStatus || 'Confirmed';
                          const amount = b.amount || b.total || b.budget || 'Custom Quote';

                          return (
                            <tr key={bookingId} className="hover:bg-slate-50 transition-colors">
                              <td className="py-4 px-6 font-bold text-slate-900">{bookingId}</td>
                              <td className="py-4 px-6 font-bold text-[#0F172A]">{title}</td>
                              <td className="py-4 px-6 text-slate-600">{date}</td>
                              <td className="py-4 px-6">
                                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] font-bold">
                                  {paymentStatus}
                                </span>
                              </td>
                              <td className="py-4 px-6 font-extrabold text-slate-900 text-sm">
                                {typeof amount === 'number' ? `₹${amount.toLocaleString('en-IN')}` : amount}
                              </td>
                              <td className="py-4 px-6 text-right">
                                <button
                                  onClick={() => setSelectedInvoice({
                                    bookingId,
                                    title,
                                    destination: b.destination || 'Uttarakhand',
                                    date,
                                    guests: b.guests || `${b.guestsCount || 2} Guests`,
                                    amount,
                                    paymentStatus,
                                    status: b.status || 'Confirmed'
                                  })}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5 text-[#E11D48]" />
                                  <span>Voucher</span>
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
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                  <CreditCard className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-slate-800">No Billing History Found</h3>
                  <p className="text-xs text-slate-500">Your receipts and tax invoices will appear here after booking a tour.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F172A]">Traveler Profile Settings</h2>
                  <p className="text-xs text-slate-500">Update your contact details for future booking vouchers and emergency support.</p>
                </div>

                {saveSuccess && (
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Profile details successfully updated!</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone Number (WhatsApp)</label>
                      <input
                        type="tel"
                        required
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-[#E11D48]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-[#E11D48]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Billing City / Address</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: SUPPORT DESK */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F172A]">24/7 Traveler Helpdesk</h2>
                  <p className="text-xs text-slate-500">Need emergency road assistance, itinerary modification, or resort check-in help?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                    <Phone className="w-6 h-6 text-[#E11D48]" />
                    <h3 className="font-serif font-bold text-base text-[#0F172A]">Direct Phone Support</h3>
                    <p className="text-xs text-slate-600">Speak directly with our local tour managers.</p>
                    <a href="tel:+919258677823" className="block text-sm font-extrabold text-[#E11D48]">
                      +91 92586 77823 / +91 78199 13686
                    </a>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <MessageCircle className="w-6 h-6 text-emerald-600" />
                    <h3 className="font-serif font-bold text-base text-emerald-950">WhatsApp Concierge</h3>
                    <p className="text-xs text-slate-600">Fast on-road assistance & live location sharing.</p>
                    <a 
                      href="https://wa.me/919258677823" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      Open WhatsApp Chat
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL: INVOICE / VOUCHER VIEW */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Samika Holidays Booking Voucher</span>
                <h3 className="font-serif text-xl font-bold text-[#0F172A]">{selectedInvoice.bookingId}</h3>
              </div>
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Package:</span>
                <strong className="text-slate-900 text-right">{selectedInvoice.title}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Guest Name:</span>
                <strong className="text-slate-900">{profile.name}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Travel Date:</span>
                <strong className="text-slate-900">{selectedInvoice.date}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Travelers:</span>
                <strong className="text-slate-900">{selectedInvoice.guests}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Amount Paid:</span>
                <strong className="text-[#E11D48] text-sm">
                  {typeof selectedInvoice.amount === 'number' ? `₹${selectedInvoice.amount.toLocaleString('en-IN')}` : selectedInvoice.amount}
                </strong>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-[#0F172A] hover:bg-[#1E293B] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Print Voucher</span>
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
