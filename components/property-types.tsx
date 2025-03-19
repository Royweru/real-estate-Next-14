"use client";
import React from "react";
import { SectionHeader } from "./section-header";
import { PropertyTypeCard } from "./property-type-card";

export const PropertyTypes = () => {
  return (
    <div className=" py-6 md:py-8 lg:py-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-4 lg:px-0  space-y-2">
      <SectionHeader
        title="Featured properties"
        sub="This is a list of featured properties"
      />
      <div className=" w-full relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 lg:gap-2.5">
        {PropertyTypesData.map((propertyType, index) => (
          <PropertyTypeCard key={index} propertyType={propertyType} />
        ))}
      </div>
    </div>
  );
};

const PropertyTypesData = [
  {
    title: "Houses",
    image: "/house5.jpeg",
    count: 1000,
    iconSrc:'/house-type.png'
  },
  {
    title: "Apartments",
    image: "/house2.jpg",
    count: 1000,
     iconSrc:'/apartments.png'
  },
  {
    title: "Lands",
    image: "/land.jpg",
    count: 1000,
     iconSrc:'/lands.png'
  },
  {
    title: "Commercialbuildings",
    image: "/house6.jpeg",
    count: 1000,
     iconSrc:'/commercial-building.png'
  },
];
