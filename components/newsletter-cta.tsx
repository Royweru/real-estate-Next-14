"use client";
import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubmitted(true);
    setEmail("");
    toast.success("You're subscribed! We'll keep you updated.");
  };

  return (
    <div className="bg-gradient-to-br from-violet-600 to-indigo-700 w-full">
      <div className="py-10 md:py-14 max-w-3xl mx-auto px-3 sm:px-4 text-center">
        <Mail className="h-10 w-10 text-violet-200 mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Stay updated with new listings
        </h2>
        <p className="text-violet-200 text-sm mb-6 max-w-lg mx-auto">
          Get notified when new properties matching your preferences are listed. No spam, ever.
        </p>
        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-emerald-300 font-medium">
            <CheckCircle2 className="h-5 w-5" />
            <span>You&apos;re subscribed! Check your inbox for a confirmation.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-xl px-4 py-3 text-sm bg-white/10 border border-white/20 text-white placeholder:text-violet-300 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent"
            />
            <button
              type="submit"
              className="rounded-xl bg-white text-violet-700 px-6 py-3 text-sm font-semibold hover:bg-violet-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
