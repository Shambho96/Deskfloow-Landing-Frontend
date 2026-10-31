"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Redirecting to property workspace authentication portal...");
    }, 800);
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="label" htmlFor="hotel-domain">Hotel Identifier or Domain</label>
        <input
          id="hotel-domain"
          className="field"
          type="text"
          placeholder="grandpalace.deskfloow.com"
          required
        />
      </div>
      <div>
        <label className="label" htmlFor="login-email">Staff Email Address</label>
        <input
          id="login-email"
          className="field"
          type="email"
          placeholder="manager@hotel.com"
          required
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="label mb-0" htmlFor="login-password">Password</label>
          <a href="#forgot" className="text-[12px] font-medium text-brand-600 hover:underline">
            Forgot password?
          </a>
        </div>
        <input
          id="login-password"
          className="field"
          type="password"
          placeholder="••••••••••••"
          required
        />
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full mt-2 shadow-brand-glow">
        {loading ? "Verifying..." : "Sign In to Property"} <ArrowRight className="size-4 ml-1" />
      </Button>

      <div className="mt-6 pt-5 border-t border-line text-center">
        <p className="text-[13px] text-muted-foreground">
          Not a DeskFloow customer yet?{" "}
          <Link href="/book-demo" className="font-semibold text-brand-600 hover:underline">
            Book a guided demo
          </Link>
        </p>
      </div>
    </form>
  );
}
