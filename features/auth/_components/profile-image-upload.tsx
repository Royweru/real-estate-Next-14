/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { ImageIcon,Trash2Icon  } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary'
import React from 'react'

export const ProfileImageUpload = ({onChange,onRemove}:{
    onChange:(url:string) => void,
    onRemove:() => void
}
) => {
    const onUpload = (result: any) => {
        const typedResult = result as { info: { secure_url: string } };
        onChange(typedResult.info.secure_url);
      }
  return (
     <CldUploadWidget
      onSuccess={onUpload}
      uploadPreset="profile_apartamenti"
     >
      {({open})=>{
        const onClick = () =>{
            open()
        }
        return(
            <div className='flex items-center justify-center gap-x-2 relative'>
               <Button
              variant={"outline"}
              className='relative flex items-center justify-center gap-x-4'
              onClick={onClick}
              size={'sm'}
             >
                <ImageIcon className='h-4 w-4' />
                <span className='text-sm font-medium text-muted-foreground'>
                    Upload Image
                </span>
             </Button>
               <Button
              variant={"destructive"}
              className=' relative max-w-14 flex items-center justify-center gap-x-4'
              onClick={onRemove}
              size={'sm'}
             >
                <Trash2Icon className='h-4 w-4' />
             </Button>
            </div>
            
        )
      }}
     </CldUploadWidget>
  )
}
