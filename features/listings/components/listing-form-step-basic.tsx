"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { createListingSchema } from "../schemas";
import { Type, Category } from "@prisma/client";
import { LocationWithListingsProps } from "../types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, DollarSign, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type FormValues = z.infer<typeof createListingSchema>;

interface StepBasicInfoProps {
  form: UseFormReturn<FormValues>;
  types: Type[];
  locations: LocationWithListingsProps[];
}

export const StepBasicInfo = ({ form, types, locations }: StepBasicInfoProps) => {
  const priceType = form.watch("priceType");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
          <Home className="h-4 w-4" />
          Property Basics
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Modern 3-Bed Apartment in Westlands" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="typeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {types.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
          <DollarSign className="h-4 w-4" />
          Pricing
        </h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="priceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Type</FormLabel>
                <div className="flex gap-3">
                  {[
                    { value: "rental", label: "For Rent", sub: "Monthly rate" },
                    { value: "purchase", label: "For Sale", sub: "Purchase price" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        field.onChange(opt.value);
                        if (opt.value === "purchase") form.setValue("rentalPrice", null);
                        else form.setValue("purchasePrice", null);
                      }}
                      className={cn(
                        "flex-1 rounded-xl border-2 p-4 text-left transition-all",
                        field.value === opt.value
                          ? "border-violet-500 bg-violet-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      )}
                    >
                      <span
                        className={cn(
                          "block text-sm font-semibold",
                          field.value === opt.value ? "text-violet-700" : "text-slate-700"
                        )}
                      >
                        {opt.label}
                      </span>
                      <span className="block text-xs text-slate-400">{opt.sub}</span>
                    </button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {priceType === "purchase" ? (
            <FormField
              control={form.control}
              name="purchasePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                        KES
                      </span>
                      <Input
                        type="number"
                        className="pl-12"
                        placeholder="Enter purchase price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : null)
                        }
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="rentalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Rent</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                        KES
                      </span>
                      <Input
                        type="number"
                        className="pl-12"
                        placeholder="Enter monthly rental price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : null)
                        }
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
          <MapPin className="h-4 w-4" />
          Location & Size
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="locationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id}>
                        {loc.county}, {loc.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Area</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type="number" placeholder="e.g. 120" {...field} />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                      m²
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
