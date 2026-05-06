import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Plane, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { signIn, signUp, resetPassword } from '../services/authService';
import { supabase } from '../lib/supabase';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Password reset mode
    if (isResetMode) {
      try {
        await resetPassword(formData.email);
        setResetSent(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
      if (isLogin) {
        const { data } = await signIn({ email: formData.email, password: formData.password });
        // Fetch the user's role directly so we can redirect before AuthContext catches up
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
        navigate(profile?.role === 'admin' ? '/admin' : '/');
      } else {
        await signUp({ name: formData.name, email: formData.email, password: formData.password });
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (toLogin) => {
    setIsLogin(toLogin);
    setIsResetMode(false);
    setError(null);
    setResetSent(false);
    setFormData({ name: '', email: '', password: '' });
  };

  const enterResetMode = (e) => {
    e.preventDefault();
    setIsResetMode(true);
    setError(null);
    setResetSent(false);
  };

  const getTitle = () => {
    if (isResetMode) return 'Reset Password';
    return isLogin ? 'Welcome Back!' : 'Start Your Journey';
  };

  const getSubtitle = () => {
    if (isResetMode) return "Enter your email and we'll send you a reset link";
    return isLogin
      ? 'Sign in to access your study abroad dashboard'
      : 'Create an account to begin your global education journey';
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center bg-slate-50 relative overflow-hidden">
      <Helmet>
        <title>{isLogin ? 'Login' : 'Register'} | NSV Overseas</title>
        <meta name="description" content="Access your NSV Overseas account to track your study abroad journey." />
      </Helmet>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-ns-sky)] rounded-full mix-blend-multiply filter blur-[120px] opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-ns-gold)] rounded-full mix-blend-multiply filter blur-[120px] opacity-10"></div>

      <div className="max-w-md w-full mx-auto relative z-10 px-4 sm:px-6">
        <motion.div 
          className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-[var(--color-ns-navy)] p-8 text-center relative overflow-hidden">
            <Plane className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-5 transform -rotate-45" />
            
            <Link to="/" className="inline-flex items-center justify-center space-x-3 mb-6">
              <img src={logo} alt="NSV Overseas Logo" className="h-14 w-auto object-contain" />
              <span className="font-bold text-2xl text-white tracking-tight">NSV Overseas</span>
            </Link>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={isResetMode ? 'reset' : isLogin ? 'login' : 'register'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">{getTitle()}</h2>
                <p className="text-slate-300 text-sm">{getSubtitle()}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Form container */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {/* ── Password Reset Success ── */}
              {resetSent ? (
                <motion.div
                  key="reset-sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">Check your inbox!</h3>
                  <p className="text-slate-500 text-sm mb-6">
                    We sent a password reset link to <strong>{formData.email}</strong>.
                  </p>
                  <button
                    onClick={() => switchMode(true)}
                    className="text-[var(--color-ns-royal)] font-semibold hover:underline text-sm"
                  >
                    Back to Sign In
                  </button>
                </motion.div>
              ) : (
                /* ── Auth Form ── */
                <motion.form
                  key={isResetMode ? 'reset-form' : isLogin ? 'login-form' : 'signup-form'}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Error banner */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl flex items-center space-x-3 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Name field — register only */}
                  <AnimatePresence>
                    {!isLogin && !isResetMode && (
                      <motion.div
                        key="name-field"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-slate-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent transition-all"
                            placeholder="John Doe"
                            required={!isLogin}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent transition-all"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password — hidden in reset mode */}
                  <AnimatePresence>
                    {!isResetMode && (
                      <motion.div
                        key="password-field"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-sm font-medium text-slate-700">Password</label>
                          {isLogin && (
                            <a
                              href="#"
                              onClick={enterResetMode}
                              className="text-xs font-semibold text-[var(--color-ns-sky)] hover:text-[var(--color-ns-royal)] transition-colors"
                            >
                              Forgot password?
                            </a>
                          )}
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400" />
                          </div>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-ns-sky)] focus:border-transparent transition-all"
                            placeholder="••••••••"
                            required={!isResetMode}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center space-x-2 bg-[var(--color-ns-gold)] text-white py-3 px-4 rounded-xl font-bold shadow-lg shadow-[#d4af37]/20 hover:bg-[#b5952f] disabled:opacity-60 disabled:cursor-not-allowed transition-all mt-6"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /><span>Please wait...</span></>
                    ) : (
                      <>
                        <span>
                          {isResetMode ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Create Account'}
                        </span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Footer links */}
            {!resetSent && (
              <div className="mt-8 text-center text-sm text-slate-600 space-y-2">
                {isResetMode ? (
                  <button
                    onClick={() => switchMode(true)}
                    className="font-bold text-[var(--color-ns-royal)] hover:text-[var(--color-ns-sky)] transition-colors focus:outline-none"
                  >
                    ← Back to Sign In
                  </button>
                ) : (
                  <p>
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button
                      onClick={() => switchMode(!isLogin)}
                      className="ml-1.5 font-bold text-[var(--color-ns-royal)] hover:text-[var(--color-ns-sky)] transition-colors focus:outline-none"
                    >
                      {isLogin ? 'Register now' : 'Sign in instead'}
                    </button>
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
