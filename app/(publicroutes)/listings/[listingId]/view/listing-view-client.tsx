/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { IndividualListingExtraInfo } from '@/features/listings/components/individual-listing-extra-info'
import { IndividualListingHeader } from '@/features/listings/components/individual-listing-header'
import { InquireForm } from '@/features/inquiries/components/inquire-form'
import { MediaIndividualListingView } from '@/features/listings/components/media-individual-listing-view'
import { ListingType } from '@/features/listings/types'
import { CheckCircleIcon } from 'lucide-react'
import React from 'react'

const ListingViewClient = ({
    data
}:{
    data:ListingType
}) => {
  return (
    <div className=' relative lg:p-16 md:p-12 p-8 min-h-screen space-y-2'>
          <IndividualListingHeader 
            title={data?.title}
            location={data?.location}
            priceType = {data?.priceType}
            purchasePrice = {data?.purchasePrice}
            rentalPrice={data?.rentalPrice}
          />
          <Card className=' bg-bg-secondary shadow-md rounded-md p-4'>
             
            <CardContent>
            <div className=' w-full relative grid grid-cols-12 gap-3 md:gap-4'>
                 <ScrollArea 
                  className=' col-span-12 sm:col-span-7 md:col-span-8 max-h-[450px]'>
                   <MediaIndividualListingView data={data}/>
                  </ScrollArea>
                  <div className=' relative col-span-12 sm:col-span-5 md:col-span-4 flex flex-col gap-y-2  '>  
                   <div className=' w-full relative lg:px-2 px-1.5'>
                       <h4 className=' text-rose-500/95 font-semibold  lg:text-4xl md:text-2xl text-xl'>
                             Reach out now !
                       </h4>
                   </div>
                   <InquireForm listingId={data?.id} />
                  </div>
                  
               </div>
            </CardContent>
          </Card>
          <Card className=' rounded-md'>
          {/* <CardHeader>
              <CardTitle>
                 Listing description
              </CardTitle>
            </CardHeader> */}
            <CardContent>
               <div className=' max-w-5xl mx-auto p-4'>
                  <p className=' text-base leading-relaxed font-normal text-text-darkblue'>
                {data?.description}
                  </p>
               </div>
               <IndividualListingExtraInfo data={data}/>
            </CardContent>
          </Card>
          <Card className=' bg-blue-light'>
            <CardHeader>
              <CardTitle>
                 Amenities offered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className=' max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 md:gap-x-3 lg:gap-x-4 gap-y-5'>
                 {data?.amenities.map((amenity)=>(
                     <div
                      key={amenity.id}
                      className=' flex items-center justify-center col-span-1 gap-x-3'
                     >
                      <CheckCircleIcon className=' text-black'/>
                       <p className=' font-semibold text-neutral-900'>
                            {amenity.name}
                       </p>
                     </div>
                 ))}
              </div>
            </CardContent>
          </Card>
        </div>
  )
}

export default ListingViewClient