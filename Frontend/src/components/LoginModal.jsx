import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, MapPin, LogIn, UserPlus, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function LoginModal({ isOpen, onClose, onLoginSuccess, onAdminLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState('user'); // 'admin' | 'user'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const inputIdentifier = (form.email || form.phone || '').trim().toLowerCase();
    const isExplicitAdmin = inputIdentifier === 'admin' || inputIdentifier.includes('admin');

    if (isRegister) {
      // Register Flow
      try {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            email: form.email,
            password: form.password,
            address: form.address,
            role: isExplicitAdmin ? 'admin' : 'user'
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          const user = data.user;
          const isAdmin = user.role === 'admin';
          setLoggedInRole(isAdmin ? 'admin' : 'user');
          setLoggedIn(true);
          setLoading(false);

          localStorage.setItem('atithya_current_user', JSON.stringify(user));

          setTimeout(() => {
            setLoggedIn(false);
            if (isAdmin && onAdminLoginSuccess) {
              onAdminLoginSuccess(user);
            } else {
              onLoginSuccess(user);
            }
            onClose();
          }, 1200);
          return;
        } else {
          setError(data.message || 'Registration failed.');
          setLoading(false);
          return;
        }
      } catch (err) {
        setError('Server error. Please ensure backend is running.');
        setLoading(false);
        return;
      }

    } else {
      // Login Flow
      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: inputIdentifier,
            email: inputIdentifier,
            password: form.password
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          const user = data.user;
          const isAdmin = user.role === 'admin';
          setLoggedInRole(isAdmin ? 'admin' : 'user');
          setLoggedIn(true);
          setLoading(false);

          localStorage.setItem('atithya_current_user', JSON.stringify(user));

          setTimeout(() => {
            setLoggedIn(false);
            if (isAdmin && onAdminLoginSuccess) {
              onAdminLoginSuccess(user);
            } else {
              onLoginSuccess(user);
            }
            onClose();
          }, 1200);
          return;
        } else {
          setError(data.message || 'Invalid email or password.');
          setLoading(false);
          return;
        }
      } catch (err) {
        setError('Server connection error. Please ensure backend is running.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0F382C] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Atithya Stay Portal</span>
          </div>

          <h3 className="font-serif text-2xl font-bold">
            {isRegister ? 'Register Account' : 'Account Login'}
          </h3>
          <p className="text-stone-300 text-xs mt-1">
            {isRegister 
              ? 'Fill in your details to create a new Atithya Stay account.' 
              : 'Sign in to access your dashboard, bookings & management.'}
          </p>
        </div>

        {/* Content */}
        {loggedIn ? (
          <div className="p-10 text-center space-y-4">
            <div className={`w-16 h-16 rounded-full ${loggedInRole === 'admin' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'} flex items-center justify-center mx-auto shadow-inner`}>
              {loggedInRole === 'admin' ? <ShieldCheck className="w-10 h-10" /> : <CheckCircle2 className="w-10 h-10" />}
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#0F382C]">
              {loggedInRole === 'admin' 
                ? (isRegister ? 'Admin Account Created!' : 'Admin Access Granted!') 
                : (isRegister ? 'Account Created Successfully!' : 'Welcome Back!')}
            </h4>
            <p className="text-stone-600 text-xs font-semibold">
              {loggedInRole === 'admin' 
                ? 'Redirecting directly to Administrator Control Panel...' 
                : 'Opening your Traveler Dashboard...'}
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              
              {/* Register Fields */}
              {isRegister && (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>
              )}

              {isRegister ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Email Address or Phone *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="name@example.com or +91 9876543210"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-bold text-stone-700 mb-1">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                  />
                </div>
              </div>

              {isRegister && (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Address / City (Optional)</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. 12 Park Street, Delhi / Nainital"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F382C] hover:bg-[#0C2D23] disabled:opacity-70 text-white py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-3"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#C8933E]" />
                ) : isRegister ? (
                  <UserPlus className="w-4 h-4 text-[#C8933E]" />
                ) : (
                  <LogIn className="w-4 h-4 text-[#C8933E]" />
                )}
                <span>{loading ? 'Authenticating...' : isRegister ? 'Register Account' : 'Login'}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Switch Between Login and Register */}
            <div className="text-center pt-2 border-t border-stone-100">
              {isRegister ? (
                <p className="text-xs text-stone-500 font-medium">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setIsRegister(false); setError(''); }}
                    className="text-[#0F382C] font-extrabold hover:underline"
                  >
                    Sign In Now
                  </button>
                </p>
              ) : (
                <p className="text-xs text-stone-500 font-medium">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setIsRegister(true); setError(''); }}
                    className="text-[#0F382C] font-extrabold hover:underline"
                  >
                    Register Now
                  </button>
                </p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

