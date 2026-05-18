"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

export default function SellerLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    await login(email, password, "seller");
    router.push("/seller/dashboard");
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <nav className="text-[11px] text-warm-gray mb-8 tracking-wide">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-charcoal">Seller Sign In</span>
      </nav>

      <h1 className="text-2xl font-light text-charcoal mb-2 text-center">Seller Sign In</h1>
      <p className="text-[13px] text-warm-gray text-center mb-8">Access your seller dashboard</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="text-red-600 text-[13px] text-center">{error}</p>
        )}
        <div>
          <label htmlFor="email" className="block text-[11px] font-medium uppercase tracking-[0.8px] text-charcoal mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black/15 rounded px-3 py-2.5 text-[14px] text-charcoal outline-none focus:border-charcoal transition-colors"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-[11px] font-medium uppercase tracking-[0.8px] text-charcoal mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-black/15 rounded px-3 py-2.5 text-[14px] text-charcoal outline-none focus:border-charcoal transition-colors"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="btn-cta w-full text-[12px]">
          SIGN IN AS SELLER
        </button>
      </form>
    </div>
  );
}
