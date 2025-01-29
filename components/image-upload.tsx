/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";

import { CldUploadWidget } from "next-cloudinary";


interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;


}
export const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,


}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const onUpload = (result: any) => {
    const typedResult = result as { info: { secure_url: string } };
    onChange(typedResult.info.secure_url);
  };
  return (
   


      <CldUploadWidget 
        onSuccess={onUpload} 
        uploadPreset="rentals"
        options={{
          maxFiles: 10,
          multiple: true,
          maxFileSize: 1024 * 1024 * 10, // 10MB
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              size={"lg"}
              onClick={onClick}
              className=" flex items-center justify-center gap-x-2"
            >
              <ImagePlus className=" h-4 w-4 mr-2" />
              Upload Images
            </Button>
          );
        }}
      </CldUploadWidget>
   
  );
};
