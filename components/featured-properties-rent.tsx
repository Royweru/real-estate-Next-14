import { ListingCardClient } from "@/features/listings/components/listing-card-client";
import { ListingType } from "@/features/listings/types";
import React from "react";
import { SectionHeader } from "./section-header";

export const FeaturedPropertiesRent = ({
  listings,title,subTitle
}: {
  listings: ListingType[];
  title:string,
  subTitle?:string
}) => {
  if (!listings) return;
  return (
    <div className="py-6 md:py-8 lg:py-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-4 lg:px-0  space-y-2">
      <SectionHeader
        title={title}
        sub={subTitle}
      />
      <div className=" w-full ">
        <div className="relative grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3.5 lg:gap-x-2 gap-y-2 ">
          {listings.map((listing) => (
            <ListingCardClient key={listing?.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};
