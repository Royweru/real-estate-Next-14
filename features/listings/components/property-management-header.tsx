'use client'
import Image from 'next/image'
import React from 'react'
import { ArrowBigLeftIcon, MoreHorizontalIcon, PenIcon, Trash2Icon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ListingType } from '../types'
import { useConfirm } from '@/hooks/use-confirm'
import { toast } from 'sonner'
import axios from 'axios'

export const PropertyManagementHeader =({
  listing
}:{
    listing:ListingType
}) => {
   
    const router = useRouter()
    const [ConfirmDialog, confirm] = useConfirm(
      "Delete listing",
      "Are you sure you want to delete this action is irreversible",
      "destructive"
    );
    const onDelete  = async()=>{
      const ok  = await confirm()
      if(!ok) return
       try {
           const res = await axios.delete(  `/api/listings/delete/${listing?.id}`)
           if(res.status ===200){
            toast.success("The listing was deleted successfully!")
            router.push('/management/properties')
           }
       } catch (error) {
         console.error(error)
         toast.error("Oopsy something went wrong while trying to delete your listing")
       }
    }
    if(!listing) return(
        <div className=' max-w-md flex flex-col gap-y-2 text-center font-semibold'>
            <h2 className=' text-5xl text-neutral-700 tracking-normal '>
               Oopsy could not find this listing
            </h2>
        </div>
    )
  return (
   <>
   <ConfirmDialog />
     <div className=' w-full relative p-4 md:p-6 border-b-2 border-neutral-800/90'>
        <div className=' flex items-center max-w-2xl justify-between mr-auto'>
             <div
              className=' p-3 items-center justify-between flex bg-neutral-200/95 
              rounded-full hover:opacity-75 hover:cursor-pointer'
              onClick={()=>router.push('/management/properties')}
              >
              <ArrowBigLeftIcon className=' size-4 text-neutral-900' />
             </div>
             <div className=' w-44 h-40 relative rounded-md'>
              <Image
                src={listing.images[0].url}
                alt='Image'
                className='bg-center bg-cover rounded-md'
                fill
                />
             </div>
             <div className=' flex flex-col gap-y-2 h-full relative'>
               <h5 className=' font-normal text-base font-mono'>
                {listing.title}
               </h5>
               <h4 className=' lg:text-3xl md:text-2xl text-xl font-bold text-neutral-800 tracking-wide'>
                 {listing.location.county}, 
                 <span className='  text-zinc-800/95'>
                  {listing.location.city}
                 </span>
               </h4>
             </div>
             <div className='flex flex-col justify-start h-full'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                    <MoreHorizontalIcon 
                        className=' font-bold
                         text-sky-600 size-6'
                         
                         />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side='bottom' sideOffset={10} className=' max-w-52 bg-slate-200/95'>
                       <DropdownMenuItem>
                            <Link href={`/listing/${listing.id}`}>
                                <div className=' w-full flex relative  justify-between gap-x-2 items-center'>
                                     <p className='font-semibold text-neutral-900'>
                                      Edit listing
                                     </p>
                                     <PenIcon className=' size-4 font-bold text-neutral-900'/>
                                </div>
                             
                            </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem>
                       <div 
                       className=' w-full flex relative 
                        justify-between gap-x-2 items-center'
                        onClick={onDelete}
                        >
                                     <p className='font-semibold text-red-600'>
                                    Delete listing
                                     </p>
                                     <Trash2Icon className=' size-4 font-bold text-rose-500'/>
                                </div>
                       </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
          
             </div>
        </div>
    </div>
   </>
  
  )
}
