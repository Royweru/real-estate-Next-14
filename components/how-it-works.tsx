import React from "react";
import { SectionHeader } from "./section-header";
import { Search, Eye, Key } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Search & Discover",
      description: "Browse thousands of properties across Kenya. Filter by location, price, type, and more to find your perfect match.",
    },
    {
      icon: Eye,
      step: "02",
      title: "Visit & Inspect",
      description: "Schedule viewings directly through the platform. Get detailed photos, videos, and neighborhood insights before you visit.",
    },
    {
      icon: Key,
      step: "03",
      title: "Move In",
      description: "Connect with verified agents, negotiate terms, and complete your rental or purchase. We make the process seamless.",
    },
  ];

  return (
    <div className="bg-white w-full">
      <div className="py-6 sm:py-8 md:py-10 lg:py-12 max-w-6xl mx-auto px-3 sm:px-4 md:px-4 lg:px-0">
        <SectionHeader
          title="How it works"
          sub="Three simple steps to find your dream property"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mt-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-100 text-violet-600 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="h-9 w-9" />
                </div>
                <span className="absolute -top-1 -right-1 md:right-4 text-[10px] font-bold text-violet-400 bg-violet-50 px-2 py-0.5 rounded-full">
                  {step.step}
                </span>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
                  {step.description}
                </p>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 lg:-right-6 text-slate-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
