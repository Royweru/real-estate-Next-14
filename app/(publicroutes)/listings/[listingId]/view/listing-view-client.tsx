"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { IndividualListingExtraInfo } from '@/features/listings/components/individual-listing-extra-info'
import { MediaIndividualListingView } from '@/features/listings/components/media-individual-listing-view'
import { ListingType } from '@/features/listings/types'
import React from 'react'

const ListingViewClient = ({
    data
}:{
    data:ListingType
}) => {
  return (
    <div className=' relative lg:p-20 md:p-16 p-8 min-h-screen space-y-2'>
          <Card className=' bg-bg-secondary shadow-md rounded-md p-4'>
            <CardHeader>
                <CardTitle className=' text-lg text-text-blackgrey'>
                    {data?.title} 
                </CardTitle>
                <CardDescription className=' text-base font-mono'>
                  {data?.location.city},
                  <span className='ml-2'>
                  {data?.location.county}
                  </span>
                  
                </CardDescription>
            </CardHeader>
            <CardContent>
            <div className=' w-full relative grid grid-cols-12 gap-3 md:gap-4'>
                 <ScrollArea 
                  className=' col-span-12 sm:col-span-7 md:col-span-8 max-h-[450px]'>
                   <MediaIndividualListingView data={data}/>
                  </ScrollArea>
                  <div className=' relative sm:col-span-5 md:col-span-4'>
                  <IndividualListingExtraInfo data={data}/>
                  </div>
                  
               </div>
            </CardContent>
           
          </Card>
        </div>
  )
}

export default ListingViewClient