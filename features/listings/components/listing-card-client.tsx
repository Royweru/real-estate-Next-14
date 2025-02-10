"use client";
import { ListingType } from "../types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import React from "react";

export const ListingCardClient = ({ listing }: { listing: ListingType }) => {
  if (!listing) return;
  return (
    <div
      key={listing?.id}
      onClick={() => (window.location.href = `/listings/${listing?.id}/view`)}
      className="col-span-1 relative hover:cursor-pointer bg-white shadow-sm transition-transform transform hover:scale-105"
    >
      <div className="flex w-full p-0 flex-col gap-y-2">
        <div className="p-0 w-full relative h-52">
          <Image
            fill
            className="bg-cover bg-center"
            alt={listing?.title || "Property Image"}
            src={listing?.images[0]?.url || "/images/placeholder.png"}
          />
          {listing.category.name === "Buy" && (
            <Badge
              variant={
                listing?.status.name === "Active"
                  ? "default"
                  : listing?.status.name === "Pending"
                  ? "default"
                  : "destructive"
              }
              className="top-1 right-1 absolute"
            >
              {listing?.status.name === "Active"
                ? "On sale"
                : listing?.status.name === "Closed"
                ? "Sold"
                : "Pending sale"}
            </Badge>
          )}
          {listing.category.name === "Rent" && (
            <Badge
              variant={
                listing?.status.name === "Active"
                  ? "destructive"
                  : listing?.status.name === "Pending"
                  ? "default"
                  : "secondary"
              }
              className="top-1 right-1 absolute"
            >
              {listing?.status.name === "Active"
                ? "Available"
                : listing?.status.name === "Closed"
                ? "Not available"
                : "Booked"}
            </Badge>
          )}
        </div>
        <div className="px-3.5 flex flex-col gap-y-2">
          <h5 className="text-base font-semibold text-neutral-900 tracking-wide font-mono">
            {listing?.title}
          </h5>
          {listing?.bedrooms && (
            <p className="text-sm font-semibold text-gray-600">
              {listing.bedrooms} bedroom(s)
            </p>
          )}
          <div className=" relative w-full">
            <p className=" text-sm text-neutral-900/85">{listing.type.name}</p>
          </div>
          <span className="text-sm text-gray-500">
            {listing?.location?.county} ,{listing?.location?.city}
          </span>
          <div className=" w-full flex items-center justify-between">
            <span className="text-sm font-semibold text-amber-500">
              Kes{" "}
              {listing?.rentalPrice
                ? listing.rentalPrice.toLocaleString("en")
                : listing?.purchasePrice
                ? listing.purchasePrice.toLocaleString("en")
                : "N/A"}
            </span>
            {listing.rentalPrice && (
              <p className=" font-mono text-neutral-500/95 text-xs">
                Per month
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
