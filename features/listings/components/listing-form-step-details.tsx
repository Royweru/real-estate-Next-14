"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { createListingSchema } from "../schemas";
import { Category, Status, Amenity } from "@prisma/client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, FileText, ListChecks, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAmenityIcon } from "./amenity-icons";

type FormValues = z.infer<typeof createListingSchema>;

interface StepDetailsProps {
  form: UseFormReturn<FormValues>;
  categories: Category[];
  amenities: Amenity[];
  status?: Status[];
  mode: "create" | "edit";
}

export const StepDetails = ({ form, categories, amenities, status, mode }: StepDetailsProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
          <Building2 className="h-4 w-4" />
          Property Details
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {mode === "edit" && status && (
            <FormField
              control={form.control}
              name="statusId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {status.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
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
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type="number" className="pl-10" placeholder="e.g. 3" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type="number" className="pl-10" placeholder="e.g. 2" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
          <FileText className="h-4 w-4" />
          Description
        </h3>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            const len = (field.value ?? "").length;
            return (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="Describe the property, its features, neighborhood, and what makes it special..."
                      className="min-h-[140px] pr-16"
                      {...field}
                      value={field.value ?? ""}
                    />
                    <span
                      className={cn(
                        "absolute bottom-3 right-3 text-xs tabular-nums",
                        len > 1800 ? "text-amber-500" : "text-slate-400"
                      )}
                    >
                      {len} / 2000
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
          <ListChecks className="h-4 w-4" />
          Amenities
        </h3>
        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {amenities.map((amenity) => {
                    const selected = field.value?.some((id: string) => id === amenity.id);
                    return (
                      <label
                        key={amenity.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-2.5 rounded-xl border-2 p-3 transition-all",
                          selected
                            ? "border-violet-500 bg-violet-50 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                            selected
                              ? "bg-violet-500 text-white"
                              : "bg-slate-100 text-slate-400"
                          )}
                        >
                          {getAmenityIcon(amenity.name)}
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {amenity.name}
                        </span>
                        {selected && (
                          <Check className="ml-auto h-4 w-4 shrink-0 text-violet-500" />
                        )}
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...(field.value || []), amenity.id]);
                            } else {
                              field.onChange(
                                field.value?.filter((id: string) => id !== amenity.id) || []
                              );
                            }
                          }}
                        />
                      </label>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
