"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { createListingSchema } from "../schemas";
import { Category, Type, Status, Amenity } from "@prisma/client";
import { LocationWithListingsProps } from "../types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ListingType } from "../types";
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";

import { StepBasicInfo } from "./listing-form-step-basic";
import { StepDetails } from "./listing-form-step-details";
import { StepMedia } from "./listing-form-step-media";
import { FormStepper } from "./listing-form-stepper";
import { FormReview } from "./listing-form-review";

interface ListingFormProps {
  mode: "create" | "edit";
  locations: LocationWithListingsProps[];
  types: Type[];
  categories: Category[];
  amenities: Amenity[];
  status?: Status[];
  initialData?: ListingType | null;
}

export const ListingForm = ({
  mode,
  locations,
  types,
  categories,
  amenities,
  status,
  initialData,
}: ListingFormProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof createListingSchema>>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      priceType:
        initialData?.priceType === "purchase" || initialData?.priceType === "rental"
          ? initialData.priceType
          : "rental",
      purchasePrice: initialData?.purchasePrice,
      rentalPrice: initialData?.rentalPrice,
      locationId: initialData?.locationId ?? "",
      statusId: initialData?.statusId ?? undefined,
      typeId: initialData?.typeId ?? "",
      categoryId: initialData?.categoryId ?? "",
      images: initialData?.images?.map((img) => ({ url: img.url })) ?? [],
      videoUrl: initialData?.videoUrl ?? undefined,
      bedrooms: initialData?.bedrooms ?? 0,
      bathrooms: initialData?.bathrooms ?? 0,
      area: initialData?.area ?? 0,
      amenities: initialData?.amenities?.map((a) => a.id) ?? [],
    },
  });

  const images = form.watch("images") ?? [];

  async function validateStep(step: number) {
    if (step === 1) {
      return form.trigger(["title", "typeId", "priceType", "purchasePrice", "rentalPrice", "locationId", "area"]);
    }
    if (step === 2) {
      const fields = ["categoryId", "bedrooms", "bathrooms", "description", "amenities"];
      if (mode === "edit") fields.unshift("statusId");
      return form.trigger(fields as Parameters<typeof form.trigger>[0]);
    }
    return true;
  }

  async function onNext() {
    const ok = await validateStep(currentPage);
    if (ok) {
      if (currentPage === 3) {
        setShowReview(true);
      } else {
        setCurrentPage((p) => Math.min(3, p + 1));
      }
    }
  }

  function onPrev() {
    if (showReview) {
      setShowReview(false);
    } else {
      setCurrentPage((p) => Math.max(1, p - 1));
    }
  }

  async function onSubmit(values: z.infer<typeof createListingSchema>) {
    setIsSubmitting(true);
    try {
      if (mode === "create") {
        const res = await axios.post("/api/listings/create", values);
        if (res.status === 201) {
          toast.success("Listing submitted for review", {
            description: "An admin will review it shortly.",
          });
          form.reset();
          router.push("/management/properties");
        }
      } else {
        const res = await axios.patch(`/api/listings/edit/${initialData?.id}`, values);
        if (res.status === 201) {
          toast.success("Listing updated successfully");
          router.push(`/management/properties/${initialData?.id}/dashboard/listing`);
        }
      }
    } catch (error: unknown) {
      const msg =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : mode === "create"
          ? "Failed to create listing. Please try again."
          : "Failed to update listing. Please try again.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-y-8 p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {mode === "create" ? "Create New Listing" : "Edit Listing"}
          </h2>
          <p className="text-sm text-slate-500">
            {mode === "create"
              ? "Fill in the details below to list your property"
              : "Update your property details and media"}
          </p>
        </div>
      </div>

      <FormStepper currentPage={currentPage} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full max-w-4xl space-y-6">
          {currentPage === 1 && (
            <StepBasicInfo form={form} types={types} locations={locations} />
          )}

          {currentPage === 2 && (
            <StepDetails
              form={form}
              categories={categories}
              amenities={amenities}
              status={status}
              mode={mode}
            />
          )}

          {currentPage === 3 && <StepMedia form={form} />}

          {showReview && (
            <FormReview
              form={form}
              types={types}
              locations={locations}
              categories={categories}
              images={images}
              onClose={() => setShowReview(false)}
            />
          )}

          <div className="flex items-center justify-between border-t border-slate-200 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              disabled={currentPage === 1 && !showReview}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-3">
              {currentPage === 3 && !showReview && (
                <span className="text-sm text-slate-400">
                  {images.length} image{images.length !== 1 ? "s" : ""} attached
                </span>
              )}
              <Button
                type={currentPage === 3 ? "submit" : "button"}
                disabled={isSubmitting}
                onClick={currentPage !== 3 ? onNext : undefined}
                className="min-w-[140px] gap-2 bg-violet-600 text-white hover:bg-violet-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {mode === "create" ? "Submitting..." : "Saving..."}
                  </>
                ) : currentPage === 3 ? (
                  <>
                    {mode === "create" ? "Submit Listing" : "Save Changes"}
                    <Check className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
