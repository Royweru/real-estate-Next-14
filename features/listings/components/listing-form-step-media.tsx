"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { createListingSchema } from "../schemas";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LocalImageUpload, UploadedImage } from "@/components/local-image-upload";
import { VideoUpload } from "@/components/video-upload";
import { ImagePlus, Video, X } from "lucide-react";
import Image from "next/image";

type FormValues = z.infer<typeof createListingSchema>;

interface SortableImageCardProps {
  img: { url: string };
  onRemove: () => void;
  isCover: boolean;
}

function SortableImageCard({ img, onRemove, isCover }: SortableImageCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: img.url,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative aspect-square cursor-grab overflow-hidden rounded-xl border border-slate-200 bg-slate-50 active:cursor-grabbing"
    >
      <Image fill src={img.url} alt="Property" className="object-cover" />
      {isCover && (
        <div className="absolute left-2 top-2 rounded-md bg-violet-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
          Cover
        </div>
      )}
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

interface StepMediaProps {
  form: UseFormReturn<FormValues>;
}

export const StepMedia = ({ form }: StepMediaProps) => {
  const images = form.watch("images") ?? [];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const currentImages = form.getValues("images") ?? [];
    const oldIndex = currentImages.findIndex((img: { url: string }) => img.url === active.id);
    const newIndex = currentImages.findIndex((img: { url: string }) => img.url === over.id);
    form.setValue("images", arrayMove(currentImages, oldIndex, newIndex));
  }

  function handleImagesUploaded(newImages: UploadedImage[]) {
    const current = form.getValues("images") ?? [];
    form.setValue("images", [...current, ...newImages.map((img) => ({ url: img.url }))]);
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
          <ImagePlus className="h-4 w-4" />
          Property Images
        </h3>
        <p className="mb-4 text-sm text-slate-400">
          Drag to reorder &middot; First image is the cover &middot; Up to 10 images
        </p>

        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormControl>
                <div className="space-y-6">
                  <LocalImageUpload
                    onImagesUploaded={handleImagesUploaded}
                    maxFiles={10}
                    existingCount={images.length}
                  />

                  {images.length > 0 && (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={images.map((img: { url: string }) => img.url)}
                        strategy={rectSortingStrategy}
                      >
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                          {images.map((img: { url: string }, idx: number) => (
                            <SortableImageCard
                              key={img.url}
                              img={img}
                              isCover={idx === 0}
                              onRemove={() => {
                                form.setValue(
                                  "images",
                                  images.filter(
                                    (current: { url: string }) => current.url !== img.url
                                  )
                                );
                              }}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
          <Video className="h-4 w-4" />
          Video Tour
        </h3>
        <p className="mb-4 text-sm text-slate-400">
          Optional but highly recommended for better engagement
        </p>
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-4">
                  <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6">
                    <VideoUpload onChange={field.onChange} disabled={false} />
                  </div>
                  {field.value && (
                    <div className="relative overflow-hidden rounded-xl border border-slate-200">
                      <video className="w-full max-h-80 rounded-xl" controls src={field.value} />
                      <button
                        type="button"
                        onClick={() => field.onChange(null)}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
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
