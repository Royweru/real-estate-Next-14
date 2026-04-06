import React from "react";
import { SectionHeader } from "./section-header";
import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "James Mwangi",
      role: "Homeowner",
      content: "Apartimenti made finding our family home incredibly easy. The search filters were spot-on and the agent we connected with was professional and responsive.",
      rating: 5,
    },
    {
      name: "Sarah Wanjiku",
      role: "Property Investor",
      content: "I've listed over 10 properties on this platform and the response has been amazing. The inquiry system works flawlessly and I get quality leads.",
      rating: 5,
    },
    {
      name: "David Ochieng",
      role: "First-time Renter",
      content: "As someone new to Nairobi, this platform helped me find a great apartment in Westlands within a week. The photos and descriptions were accurate.",
      rating: 4,
    },
  ];

  return (
    <div className="bg-slate-50 w-full">
      <div className="py-6 sm:py-8 md:py-10 lg:py-12 max-w-6xl mx-auto px-3 sm:px-4 md:px-4 lg:px-0">
        <SectionHeader
          title="What our clients say"
          sub="Real stories from people who found their perfect property"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-200 text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-600 flex-1 italic">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
