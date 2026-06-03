"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Mail, Lock, User, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-500" size={32} />
        </div>
        <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>
        <p className="text-gray-400 mb-8">
          Please check your email to verify your account. You will be redirected to the login page shortly.
        </p>
        <Link href="/auth/login" className="btn-gold py-3 px-8 inline-block">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Join Elite EA</h1>
        <p className="text-gray-400 text-sm">Create your account to start automating your success</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg flex items-start space-x-3 animate-fade-in">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-black/40 border border-elite-border rounded-lg pl-10 pr-4 py-3 focus:border-elite-gold outline-none transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-black/40 border border-elite-border rounded-lg pl-10 pr-4 py-3 focus:border-elite-gold outline-none transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Create Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-elite-border rounded-lg pl-10 pr-4 py-3 focus:border-elite-gold outline-none transition-all placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-gold py-4 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Creating account...</span>
            </>
          ) : (
            <span>Create Account</span>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-elite-border text-center">
        <p className="text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-elite-gold font-bold hover:text-elite-gold-light transition-colors">
            Sign In instead
          </Link>
        </p>
      </div>
    </>
  );
}
