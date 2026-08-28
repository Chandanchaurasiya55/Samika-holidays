import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, User, KeyRound, Sparkles, CheckCircle2, UserPlus, Mail, ShieldAlert, Loader2, Info } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function AdminLoginPage({ onAdminLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [hasExistingAdmin, setHasExistingAdmin] = useState(false);
  const [credentials, setCredentials] = useState({ 
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/admin-status`);
        if (res.ok) {
          const data = await res.json();
          const exists = Boolean(data.hasAdmin);
          setHasExistingAdmin(exists);
          if (!exists) {
            setIsRegister(true);
            localStorage.removeItem('atithya_admins');
          } else {
            setIsRegister(false);
          }
        }
      } catch (err) {
        // If offline or connecting, allow registration
        setHasExistingAdmin(false);
        setIsRegister(true);
      }
    };
    checkAdminStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isRegister) {
      if (hasExistingAdmin) {
        setError('Only 1 Super Admin account is allowed. Please sign in with your admin credentials.');
        setLoading(false);
        return;
      }
      // Registration Logic
      if (credentials.password !== credentials.confirmPassword) {
        setError('Passwords do not match. Please re-enter.');
        setLoading(false);
        return;
      }
      if (credentials.password.length < 4) {
        setError('Password must be at least 4 characters long.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: credentials.fullName || 'Administrator',
            email: credentials.email.toLowerCase(),
            password: credentials.password,
            role: 'admin'
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          localStorage.setItem('atithya_current_user', JSON.stringify(data.user));
          setHasExistingAdmin(true);
          setSuccess(true);
          setTimeout(() => {
            onAdminLoginSuccess(data.user);
          }, 800);
          return;
        } else {
          setError(data.message || 'Registration failed: Only 1 Admin allowed.');
          setLoading(false);
          return;
        }
      } catch (err) {
        setError('Server connection error. Please ensure backend is running.');
        setLoading(false);
        return;
      }

    } else {
      // Login Logic - Strictly using Admin Email
      const inputEmail = credentials.email.trim().toLowerCase();

      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: inputEmail,
            email: inputEmail,
            password: credentials.password
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          localStorage.setItem('atithya_current_user', JSON.stringify(data.user));
          setSuccess(true);
          setTimeout(() => {
            onAdminLoginSuccess(data.user);
          }, 800);
          return;
        } else {
          setError(data.message || 'Invalid Admin Email or Password.');
          setLoading(false);
          return;
        }
      } catch (err) {
        setError('Server offline. Please check backend connection.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#FAF7F2]">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-stone-200 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#0F382C] text-[#C8933E] flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Restricted Access</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#0F382C]">
            {isRegister ? 'Register Admin Account' : 'Admin Portal Login'}
          </h1>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            {isRegister 
              ? 'Create a new administrator account with full control access.' 
              : 'Please enter your administrator email and password to access the dashboard.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="font-bold text-lg text-[#0F382C]">
              {isRegister ? 'Admin Account Created!' : 'Access Granted!'}
            </h3>
            <p className="text-xs text-stone-500">Opening Administrator Control Panel...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Register Fields */}
            {isRegister && (
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Super Admin"
                    value={credentials.fullName}
                    onChange={(e) => setCredentials({ ...credentials, fullName: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-bold text-stone-700 mb-1">Admin Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="admin@atithya.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Password *</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block font-bold text-stone-700 mb-1">Confirm Password *</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={credentials.confirmPassword}
                    onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none focus:border-[#0F382C]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F382C] hover:bg-[#0C2D23] disabled:opacity-70 text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#C8933E]" />
              ) : isRegister ? (
                <UserPlus className="w-4 h-4 text-[#C8933E]" />
              ) : (
                <Lock className="w-4 h-4 text-[#C8933E]" />
              )}
              <span>{loading ? 'Authenticating...' : isRegister ? 'Register Admin Account' : 'Unlock Admin Panel'}</span>
            </button>
          </form>
        )}

        {/* Switch between Login and Register at bottom */}
        <div className="text-center pt-3 border-t border-stone-100">
          {isRegister ? (
            <p className="text-xs text-stone-500 font-medium">
              Already have an admin account?{' '}
              <button
                type="button"
                onClick={() => { setIsRegister(false); setError(''); }}
                className="text-[#0F382C] font-extrabold hover:underline"
              >
                Sign In to Admin Portal
              </button>
            </p>
          ) : !hasExistingAdmin ? (
            <p className="text-xs text-stone-500 font-medium">
              Don't have an admin account?{' '}
              <button
                type="button"
                onClick={() => { setIsRegister(true); setError(''); }}
                className="text-[#0F382C] font-extrabold hover:underline"
              >
                Register Admin Account
              </button>
            </p>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-[11px] text-stone-500 font-semibold bg-stone-100 px-3 py-1.5 rounded-full">
              <Info className="w-3.5 h-3.5 text-stone-400" />
              <span>Super Admin access is locked to 1 designated account.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

