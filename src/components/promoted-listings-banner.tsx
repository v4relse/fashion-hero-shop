"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";

const BANNER_KEY = (email: string) => `promoted_listings_cta_${email}`;

export function PromotedListingsBanner() {
  const { user } = useAuth();
  const [clicked, setClicked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!user) return;
    const stored = localStorage.getItem(BANNER_KEY(user.email));
    setClicked(stored === "clicked");
    setMounted(true);
  }, [user]);

  if (!mounted || !user || user.role !== "seller") return null;

  function handleCTA() {
    if (!user) return;
    localStorage.setItem(BANNER_KEY(user.email), "clicked");
    setClicked(true);
  }

  if (clicked) {
    return (
      <div className="w-full bg-charcoal text-white px-4 py-4 sm:py-5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[13px] sm:text-[14px] font-light">
            Thank you — we&apos;ll be in touch within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f5f2ec] border-b border-black/10 px-4 py-5 sm:py-6">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-charcoal mb-1">
            New: Pay-when-you-sell Promoted Listings
          </p>
          <p className="text-[13px] text-warm-gray leading-relaxed">
            Boost your products&apos; visibility — pay only when you make a sale. No upfront cost.
          </p>
        </div>
        <button
          onClick={handleCTA}
          className="btn-cta text-[11px] whitespace-nowrap shrink-0"
        >
          GET STARTED
        </button>
      </div>
    </div>
  );
}
