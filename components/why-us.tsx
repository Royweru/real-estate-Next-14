import React from "react";
import { SectionHeader } from "./section-header";
import Image from "next/image";

export const WhyUs = () => {
  const reasons = [
    {
      label: "Trusted by thousands",
      description:
        "This are some of the featured properties in the city right now",
      iconSrc: "/smilling-icon.png",
    },
    {
      label: "Wide range of properties",
      description:
        "This are some of the featured properties in the city right now",
      iconSrc: "/house-icon.png",
    },
    {
      label: "Financing made easy",
      description:
        "This are some of the featured properties in the city right now",
      iconSrc: "/finance-calculator.png",
    },
    {
      label: "See neighbours",
      description:
        "This are some of the featured properties in the city right now",
      iconSrc: "/neighbour-hood.png",
    },
  ];
  return (
    <div className="bg-accent-honeyDew w-full">
      <div className=" py-6 sm:py-8 md:py-10 lg:py-12 max-w-6xl mx-auto px-3 sm:px-4 md:px-4 lg:px-0 ">
        <SectionHeader
          title="Why you should choose us"
          sub="Reasons why we are the best realtors"
        />
        <div className=" w-full grid  max-w-6xl grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-3">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className=" col-span-1 flex flex-col items-center justify-center
             lg:gap-y-3 md:gap-y-2 gap-y-1.5 bg-white shadow-sm  p-4"
            >
              <div className=" relative lg:size-36 shrink-0 md:size-32 sm:size-28 size-24 ">
                <Image
                  fill
                  className=" bg-cover bg-center"
                  src={reason.iconSrc}
                  alt=""
                />
              </div>
              <div className=" font-semibold w-full">
                <h4 className=" md:text-[25px] text-xl leading-tight">
                  {reason.label}
                </h4>
              </div>
              <p
                className=" font-montserrat md:text-base text-sm leading-relaxed
             "
              >
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
