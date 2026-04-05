"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { ListingType } from "../types";

export const ApprovalListingCard = ({
  data,
  onActionComplete
}: {
  data: ListingType;
  onActionComplete: () => void;
}) => {
  const price = data.purchasePrice
    ? data.purchasePrice.toLocaleString("en")
    : data.rentalPrice
    ? data.rentalPrice.toLocaleString("en")
    : "N/A";
  const priceLabel = data.priceType === "purchase" ? "Sale" : "Rent";

  const onApprove = async () => {
    try {
      await axios.patch(`/api/listings/approve/${data.id}`);
      toast.success("Listing approved.");
      onActionComplete();
    } catch (error) {
      toast.error("Failed to approve listing.");
      console.error(error);
    }
  };

  const onReject = async () => {
    try {
      await axios.patch(`/api/listings/reject/${data.id}`);
      toast.success("Listing rejected.");
      onActionComplete();
    } catch (error) {
      toast.error("Failed to reject listing.");
      console.error(error);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-stone-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5 focus-within:shadow-lg">
      <div className="relative h-52 w-full">
        {data.images[0]?.url ? (
          <Image
            src={data.images[0].url}
            alt={data.title}
            fill
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100" />
        )}
        <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-600">
          Pending
        </span>
        <span className="absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-900">
          {priceLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="text-lg font-semibold leading-tight">{data.title}</p>
          <p className="text-sm text-neutral-500">
            {data.location.county}, {data.location.city}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-stone-900">Kes {price}</p>
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {data.bedrooms} bd · {data.bathrooms} ba · {data.area} m²
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-neutral-600 mb-4">
          {data.description ?? "No description available."}
        </p>
        <div className="flex items-center gap-3 mt-auto">
          <Button onClick={onApprove} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Approve</Button>
          <Button onClick={onReject} variant="destructive" className="w-full">Reject</Button>
        </div>
      </div>
    </div>
  );
};
