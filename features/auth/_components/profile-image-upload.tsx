"use client";
import { Button } from "@/components/ui/button";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

export const ProfileImageUpload = ({
  onChange,
}: {
  onChange: (url: string) => void;
}) => {
  const onUpload = (result: any) => {
    const typedResult = result as { info: { secure_url: string } };
    onChange(typedResult.info.secure_url);
  };
  return (
    <CldUploadWidget onSuccess={onUpload} uploadPreset="profile_apartamenti">
      {({ open }) => {
        const onClick = () => {
          open();
        };
        return (
          <Button
            onClick={onClick}
            type="button"
            variant={"ghost"}
            className="  p-2 rounded-full"
          >
            <ImageIcon className="size-6 text-neutral-750" />
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};
