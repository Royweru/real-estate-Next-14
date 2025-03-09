"use client";
import { ListingType } from "../types";
import Image from "next/image";

import React from "react";
import { ListingIconDetails } from "./listing-icon-details";

export const ListingCardClient = ({
   listing,
  isFeatured
 }: { 
  listing: ListingType 
 isFeatured?:boolean
}) => {
  if (!listing) return;
  console.log(listing.priceType)
  return (
    <div
      key={listing?.id}
      onClick={() => (window.location.href = `/listings/${listing?.id}/view`)}
      className="col-span-1 relative hover:cursor-pointer bg-white 
      shadow-sm transition-transform transform hover:scale-105"
    >
      <div className="flex w-full p-0 flex-col md:gap-y-4 gap-y-2 ">
        <div className="p-0 w-full relative h-56">
          <Image
            fill
            className="bg-cover bg-center"
            alt={listing?.title || "Property Image"}
            src={listing?.images[0]?.url || "/images/placeholder.png"}
          />
          {listing.category.name === "Buy" && (
            <div className={`py-1.5 px-4 shadow-sm flex items-center justify-center 
            absolute top-1 right-2 bg-rose-600 text-sm text-white`}>
               For sale
            </div>
          )}
          {listing.category.name === "Rent" && (
         <div className={`py-1.5 px-4 shadow-sm flex items-center justify-center 
            absolute top-1 right-2 bg-sky-600 text-sm text-white`}>
         For Rent
      </div>
          )}
          { isFeatured&& (
            <div className={`py-1.5 px-4 shadow-sm flex items-center justify-center 
            absolute top-1 left-2 bg-blue-vista text-sm text-white`}>
              <span className=" capitalize">
              Featured
              </span>
              
            </div>
          )}
      
        </div>
        <div className="px-1.5 flex flex-col gap-y-2">
          <h5 className="text-base font-semibold text-neutral-900 tracking-wide font-mono">
            {listing?.title}
          </h5>
          <span className="text-sm text-black">
            {listing?.location?.county} ,{listing?.location?.city}
          </span>
          {listing?.bedrooms && (
            <p className="text-sm font-semibold text-gray-600">
              {listing.bedrooms} bedroom(s)
            </p>
          )}
          <ListingIconDetails
           bedrooms={listing.bedrooms}
           bathrooms={listing.bathrooms}
           coverage={listing.area}
          />
               <hr className=" bg-black"/>
          <div className=" w-full flex items-center justify-between my-4">
            <span className="text-sm font-normal text-text-darkblue">
              Kes{" "}
              {listing?.rentalPrice
                ? listing.rentalPrice.toLocaleString("en")
                : listing?.purchasePrice
                ? listing.purchasePrice.toLocaleString("en")
                : "N/A"}
            </span>
            {listing.priceType === "rental" && listing.rentalPrice && (
              <p className=" font-mono tracking-tight">
                Per month
              </p>
            )}
       
          </div>
        </div>
      </div>
    </div>
  );
};
