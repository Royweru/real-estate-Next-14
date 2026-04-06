"use client";
import React from "react";
import { SectionHeader } from "./section-header";
import { useRouter } from "next/navigation";
import { Type } from "@prisma/client";

export const PropertyTypes = ({
  propertyTypes,
}: {
  propertyTypes: (Type & { propertiesCount: number })[];
}) => {
  const router = useRouter();

  if (!propertyTypes || propertyTypes.length === 0) return null;

  const typeImages: Record<string, string> = {
    Apartments: "/house2.jpg",
    Houses: "/house5.jpeg",
    "Commercial buildings": "/house6.jpeg",
    Bedsitters: "/hero2.webp",
    Land: "/land.jpg",
    Villas: "/townhouse1.jpg",
    Townhouses: "/house1.jpg",
    Offices: "/feature1.jpg",
  };

  return (
    <div className="py-6 md:py-8 lg:py-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-4 lg:px-0">
      <SectionHeader
        title="Property types"
        sub="Discover our different types of properties"
      />
      <div className="relative mt-6">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-3 px-3">
          {propertyTypes.map((propertyType) => (
            <button
              key={propertyType.id}
              onClick={() => router.push(`/browse?typeId=${propertyType.id}`)}
              className="snap-start shrink-0 w-[220px] h-[180px] rounded-2xl relative overflow-hidden cursor-pointer group hover:scale-[1.03] transition-transform duration-200"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${typeImages[propertyType.name] || "/house2.jpg"})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-bold text-base">
                  {propertyType.name}
                </h4>
                <p className="text-white/70 text-xs mt-0.5">
                  {propertyType.propertiesCount || 0} properties
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
