import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-stone-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: Logo + Copyright */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Apartimenti" className="h-8 w-auto" />
              <span className="text-lg font-bold tracking-tight">Apartimenti</span>
            </Link>
            <p className="text-sm text-stone-400">
              &copy; {new Date().getFullYear()} Apartimenti. All rights reserved.
            </p>
          </div>

          {/* Right: Links */}
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/browse" className="text-stone-300 hover:text-white transition-colors">
              Browse
            </Link>
            <Link href="/auth/sign-in" className="text-stone-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/auth/sign-up" className="text-stone-300 hover:text-white transition-colors">
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
