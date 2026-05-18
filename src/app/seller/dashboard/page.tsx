"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { PromotedListingsBanner } from "@/components/promoted-listings-banner";

export default function SellerDashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/seller/login");
    } else if (user.role !== "seller") {
      router.push("/seller/login");
    }
  }, [user, router]);

  if (!user || user.role !== "seller") return null;

  return (
    <div>
      <PromotedListingsBanner />

      <div className="max-w-2xl mx-auto px-4 py-16">
        <nav className="text-[11px] text-warm-gray mb-8 tracking-wide">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-charcoal">Seller Dashboard</span>
        </nav>

        <h1 className="text-2xl font-light text-charcoal mb-2">
          Hello, {user.firstName}
        </h1>
        <p className="text-[13px] text-warm-gray mb-10">
          Welcome to your seller dashboard.
        </p>

        <section className="mb-10">
          <h2 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal mb-4 pb-2 border-b border-black/10">
            Your Listings
          </h2>
          <p className="text-[13px] text-warm-gray">No active listings yet.</p>
        </section>

        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="btn-cta-outline text-[12px] w-full"
        >
          SIGN OUT
        </button>
      </div>
    </div>
  );
}
