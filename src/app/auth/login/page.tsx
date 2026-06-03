"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-sm">Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg flex items-start space-x-3 animate-fade-in">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
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
                placeholder="name@example.com"
                className="w-full bg-black/40 border border-elite-border rounded-lg pl-10 pr-4 py-3 focus:border-elite-gold outline-none transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <Link href="/auth/forgot-password" size="sm" className="text-xs text-elite-gold hover:text-elite-gold-light">
                Forgot?
              </Link>
            </div>
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
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-elite-border text-center">
        <p className="text-gray-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-elite-gold font-bold hover:text-elite-gold-light transition-colors">
            Create one now
          </Link>
        </p>
      </div>
    </>
  );
}
