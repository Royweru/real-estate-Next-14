import React from "react";
import { SectionHeader } from "./section-header";
import { ShieldCheck, Home, CreditCard, Users } from "lucide-react";

export const WhyUs = () => {
  const reasons = [
    {
      label: "Trusted by thousands",
      description:
        "Over 2,000 happy clients have found their dream homes through our platform. We prioritize transparency and reliability in every transaction.",
      icon: ShieldCheck,
    },
    {
      label: "Wide range of properties",
      description:
        "From cozy bedsitters to luxury villas, browse thousands of listings across Kenya. We cover residential, commercial, and land properties.",
      icon: Home,
    },
    {
      label: "Financing made easy",
      description:
        "Get connected with trusted mortgage lenders and financial partners. We help you navigate mortgages, payment plans, and investment options.",
      icon: CreditCard,
    },
    {
      label: "Community focused",
      description:
        "Discover neighborhoods before you move. Access insights on amenities, schools, transport, and what makes each area unique to live in.",
      icon: Users,
    },
  ];

  return (
    <div className="bg-accent-honeyDew w-full">
      <div className="py-6 sm:py-8 md:py-10 lg:py-12 max-w-6xl mx-auto px-3 sm:px-4 md:px-4 lg:px-0">
        <SectionHeader
          title="Why choose Apartimenti"
          sub="Reasons why thousands trust us with their property journey"
        />
        <div className="w-full grid max-w-6xl grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="col-span-1 flex flex-col items-center justify-center gap-y-3 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h4 className="md:text-xl text-lg font-semibold leading-tight text-slate-900">
                    {reason.label}
                  </h4>
                  <p className="mt-2 font-normal text-sm leading-relaxed text-slate-500">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
