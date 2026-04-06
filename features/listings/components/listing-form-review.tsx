import React from "react";
import { Eye, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category, Type } from "@prisma/client";
import { LocationWithListingsProps } from "../types";
import { z } from "zod";
import { createListingSchema } from "../schemas";
import { UseFormReturn } from "react-hook-form";

type FormValues = z.infer<typeof createListingSchema>;

interface ReviewItemProps {
  label: string;
  value?: string;
}

function ReviewItem({ label, value }: ReviewItemProps) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}

interface FormReviewProps {
  form: UseFormReturn<FormValues>;
  types: Type[];
  locations: LocationWithListingsProps[];
  categories: Category[];
  images: { url: string }[];
  onClose: () => void;
}

export const FormReview = ({ form, types, locations, categories, images, onClose }: FormReviewProps) => {
  const location = locations.find((l) => l.id === form.watch("locationId"));
  const type = types.find((t) => t.id === form.watch("typeId"));
  const category = categories.find((c) => c.id === form.watch("categoryId"));
  const priceType = form.watch("priceType");
  const purchasePrice = form.watch("purchasePrice");
  const rentalPrice = form.watch("rentalPrice");
  const amenities = form.watch("amenities");
  const description = form.watch("description");

  const priceDisplay =
    priceType === "purchase"
      ? purchasePrice
        ? `KES ${Number(purchasePrice).toLocaleString()}`
        : ""
      : rentalPrice
      ? `KES ${Number(rentalPrice).toLocaleString()}/mo`
      : "";

  return (
    <div className="rounded-2xl border border-violet-200 bg-violet-50/50 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-violet-800">
        <Eye className="h-5 w-5" />
        Review Your Listing
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <ReviewItem label="Title" value={form.watch("title")} />
        <ReviewItem label="Type" value={type?.name} />
        <ReviewItem label="Location" value={location ? `${location.county}, ${location.city}` : ""} />
        <ReviewItem label="Area" value={form.watch("area") ? `${form.watch("area")} m²` : ""} />
        <ReviewItem label="Price Type" value={priceType === "purchase" ? "For Sale" : "For Rent"} />
        <ReviewItem label="Price" value={priceDisplay} />
        <ReviewItem label="Bedrooms" value={form.watch("bedrooms")?.toString()} />
        <ReviewItem label="Bathrooms" value={form.watch("bathrooms")?.toString()} />
        <ReviewItem label="Category" value={category?.name} />
        <ReviewItem label="Images" value={`${images.length} uploaded`} />
        <ReviewItem label="Video" value={form.watch("videoUrl") ? "Yes" : "No"} />
        <ReviewItem label="Amenities" value={amenities?.length ? `${amenities.length} selected` : "None"} />
      </div>
      {description && (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Description</p>
          <p className="mt-1 text-sm text-slate-700">{description}</p>
        </div>
      )}
      <div className="mt-4 flex items-center justify-end gap-2 border-t border-violet-200 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Edit details
        </Button>
      </div>
    </div>
  );
};
