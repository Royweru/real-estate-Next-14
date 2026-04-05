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
     <div className=' w-full relative rounded-2xl border border-stone-200 bg-white/90 px-5 py-6 shadow-sm'>
        <div className=' flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
             <div className=' flex items-center gap-4'>
                  <button
                   className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-stone-400'
                   onClick={()=>router.push('/management/properties')}
                  >
                     <ArrowBigLeftIcon className=' size-4 text-neutral-900' />
                  </button>
                  <div className=' flex items-center gap-4'>
                      <div className=' relative h-28 w-36 overflow-hidden rounded-2xl bg-slate-100'>
                        {listing.images?.[0]?.url ? (
                          <Image
                            src={listing.images[0].url}
                            alt={listing.title}
                            className='object-cover'
                            fill
                          />
                        ) : (
                          <div className=' h-full w-full bg-gradient-to-br from-slate-200 to-slate-100' />
                        )}
                      </div>
                     <div className=' flex flex-col gap-1'>
                        <p className=' text-xs uppercase tracking-[0.4em] text-neutral-500'>
                          {listing.category.name}
                        </p>
                        <h4 className=' text-2xl font-semibold text-stone-900'>
                          {listing.title}
                        </h4>
                        <p className=' text-sm text-neutral-500'>
                          {listing.location.county}, {listing.location.city}
                        </p>
                        <p className=' text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400'>
                          {listing.priceType === 'purchase' ? 'For sale' : 'For rent'} • {listing.status?.name ?? "Pending"}
                        </p>
                     </div>
                  </div>
             </div>
             <div className=' flex items-center gap-3 rounded-2xl border border-stone-200 bg-white/80 px-3 py-2 shadow-sm'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                    <MoreHorizontalIcon 
                        className=' font-bold text-sky-600 size-6'
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side='bottom' sideOffset={10} className=' min-w-[14rem] rounded-2xl border border-slate-200 bg-white/95 shadow-lg'>
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
