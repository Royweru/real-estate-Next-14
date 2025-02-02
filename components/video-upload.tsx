/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { CldUploadWidget } from 'next-cloudinary';
import React, { useEffect ,useState} from 'react'
import { Button } from './ui/button';

interface VideoUploadProps{
    onChange: (url: string) => void,
    disabled:boolean
}
export const VideoUpload = ({onChange,disabled}:VideoUploadProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
      }, []);

      if(!isMounted){
        return null;
      }
    
    const onUpload = (result: any) => {
        const typedResult = result as { info: { secure_url: string } };
        onChange(typedResult.info.secure_url);
      } 
  return (
    <CldUploadWidget
                          onSuccess={onUpload}
                          uploadPreset="rentals"
                          options={{
                            maxFiles: 1,
                            multiple: false,
                            maxFileSize: 100 * 1024 * 1024,
                            resourceType: "video",
                            sources: ["local"],
                            clientAllowedFormats: ["mp4", "mov"],
                          }}
                        >
                          {({ open }) => (
                            <div className="space-y-4">
                              <p className="text-gray-500">Upload a video tour of the property</p>
                              <p className="text-sm text-gray-400">Supported formats: MP4, MOV (max 100MB)</p>
                              <Button 
                                type="button"
                                variant="secondary"
                                onClick={() => open()}
                                disabled= {disabled}
                                className="mt-2"
                              >
                                Upload Video
                              </Button>
                            </div>
                          )}
                        </CldUploadWidget>
  )
}
