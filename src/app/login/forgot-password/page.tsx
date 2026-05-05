"use client";

import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage("Check your email for the password reset link.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white">
      <Navbar />
      <main className="pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E6BFF]/20 blur-[50px] rounded-full" />
          
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl font-heading font-bold mb-2">Reset Password</h1>
            <p className="text-white/50 text-sm">Enter your email to receive a reset link</p>
          </div>

          <form className="space-y-4 relative z-10" onSubmit={handleReset}>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest ml-1 font-semibold">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#1E6BFF] transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-[#1E6BFF] transition-all"
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-xs mt-2 text-center">{error}</p>}
            {message && <p className="text-green-400 text-xs mt-2 text-center">{message}</p>}

            <button disabled={loading} type="submit" className="w-full py-4 mt-6 glass bg-white/5 font-bold hover:bg-white/10 border-white/20 rounded-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50">
              {loading ? "Sending..." : "Send Reset Link"}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>

            <Link href="/login" className="flex items-center justify-center gap-2 mt-6 text-sm text-white/40 hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
