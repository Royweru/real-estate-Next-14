import { ListingCardClient } from "@/features/listings/components/listing-card-client";
import { ListingType } from "@/features/listings/types";
import React from "react";
import { SectionHeader } from "./section-header";

export const FeaturedProperties = ({
  listings,
}: {
  listings: ListingType[];
}) => {
  if (!listings) return;
  return (
    <div className=" w-full px-1.5 md:px-6 lg:px-10 py-6 md:py-8 lg:py-10 space-y-2">
      <SectionHeader
        title={"Some of our top properties on sale"}
        sub={"Best properties on sale"}
      />
      <div className=" max-w-5xl mx-auto mt-3">
        <div className="relative grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3.5 lg:gap-x-2 gap-y-2 ">
          {listings.map((listing) => (
            <ListingCardClient key={listing?.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};
