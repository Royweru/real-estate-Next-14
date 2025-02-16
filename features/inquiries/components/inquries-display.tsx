"use client";

import { Inquiry } from "@prisma/client";
import React from "react";
import { InquiryCard } from "./inquiry-card";

export const InquiriesDisplay = ({ inquiries }: { inquiries: Inquiry[] }) => {
  if (!inquiries ||inquiries.length ===0)
    return (
      <div className=" w-full mt-6 lg:mt-12 relative justify-center- items-center">
        <div>
          <h4 className=" font-mono text-emerald-600 font-semibold text-xl">
            Looks like you don&apos;t have inquiries
          </h4>
        </div>
      </div>
    );
  return(
    <div className=" flex flex-col min-h-screen w-full gap-y-3">
     {inquiries.map((inquiry)=>(
        <InquiryCard
         key={inquiry.id}
         data={inquiry}
        />
     ))}
    </div>
  )
};
