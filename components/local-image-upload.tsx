"use client";

import React, { useCallback, useState } from "react";
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from "react-dropzone";
import { UploadCloud, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { uploadListingImages } from "@/actions/upload-image";
import { cn } from "@/lib/utils";

export interface UploadedImage {
  url: string;
  thumbnailUrl: string;
  originalName: string;
  size: number;
}

interface UploadProgress {
  id: string;
  file: File;
  preview: string;
  status: "uploading" | "success" | "error";
  error?: string;
  url?: string;
  thumbnailUrl?: string;
}

interface LocalImageUploadProps {
  onImagesUploaded: (images: UploadedImage[]) => void;
  maxFiles?: number;
  existingCount?: number;
}

export const LocalImageUpload: React.FC<LocalImageUploadProps> = ({
  onImagesUploaded,
  maxFiles = 10,
  existingCount = 0,
}) => {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const remaining = maxFiles - existingCount;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const toUpload = acceptedFiles.slice(0, remaining);
      if (toUpload.length === 0) return;

      const newUploads: UploadProgress[] = toUpload.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        status: "uploading",
      }));

      setUploads((prev) => [...prev, ...newUploads]);
      setIsUploading(true);

      const results = await uploadListingImages(toUpload);

      const updated = newUploads.map((u, i) => {
        const result = results.results[i];
        if (result) {
          return { ...u, status: "success" as const, url: result.url, thumbnailUrl: result.thumbnailUrl };
        }
        const errorMsg = results.errors[i] || "Upload failed";
        return { ...u, status: "error" as const, error: errorMsg };
      });

      setUploads((prev) =>
        prev.map((p) => {
          const match = updated.find((u) => u.id === p.id);
          return match || p;
        })
      );

      const successful = results.results.map((r) => ({
        url: r.url,
        thumbnailUrl: r.thumbnailUrl,
        originalName: r.originalName,
        size: r.size,
      }));

      if (successful.length > 0) {
        onImagesUploaded(successful);
      }

      setIsUploading(false);

      setTimeout(() => {
        setUploads((prev) => prev.filter((u) => u.status === "error"));
      }, 3000);
    },
    [remaining, onImagesUploaded]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: remaining,
    disabled: isUploading || remaining <= 0,
    noClick: true,
    noKeyboard: true,
  });

  const rootProps = getRootProps() as DropzoneRootProps;

  React.useEffect(() => {
    setIsDragging(isDragActive);
  }, [isDragActive]);

  const handleRemoveUpload = (id: string) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  };

  if (remaining <= 0) {
    return (
      <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-8">
        <div className="flex items-center gap-2 text-emerald-600">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">Maximum images reached ({maxFiles})</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        {...rootProps}
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-all duration-300",
          isDragging
            ? "border-violet-400 bg-violet-50/60 scale-[1.01] shadow-lg shadow-violet-100"
            : "border-slate-200 bg-slate-50/50 hover:border-violet-300 hover:bg-violet-50/30"
        )}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") open();
        }}
        role="button"
        tabIndex={0}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-indigo-500/5 transition-opacity duration-300",
            isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        />

        <div className="relative z-10 flex flex-col items-center gap-3 text-center">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300",
              isDragging
                ? "bg-violet-100 text-violet-500 scale-110"
                : "bg-slate-100 text-slate-400 group-hover:bg-violet-100 group-hover:text-violet-500"
            )}
          >
            {isUploading ? (
              <Loader2 className="h-7 w-7 animate-spin" />
            ) : (
              <UploadCloud className="h-7 w-7" />
            )}
          </div>

          <div>
            <p className="text-base font-semibold text-slate-700">
              {isDragging ? "Drop images here" : "Drag & drop images here"}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              or{" "}
              <span className="font-medium text-violet-500 underline underline-offset-2">
                browse files
              </span>{" "}
              &middot; Up to {remaining} {remaining === 1 ? "image" : "images"} remaining
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {["JPG", "PNG", "WebP"].map((fmt) => (
              <span
                key={fmt}
                className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-slate-500"
              >
                {fmt}
              </span>
            ))}
            <span className="text-[11px] text-slate-400">Max 10MB each</span>
          </div>
        </div>

        <input {...(getInputProps() as DropzoneInputProps)} />
      </div>

      {uploads.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
            >
              <img
                src={upload.preview}
                alt={upload.file.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />

              {upload.status === "uploading" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                  <span className="text-[11px] font-medium text-white/80">Optimizing...</span>
                </div>
              )}

              {upload.status === "success" && (
                <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
              )}

              {upload.status === "error" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-red-500/20">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                  <span className="text-[10px] text-red-300">{upload.error}</span>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveUpload(upload.id);
                }}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
