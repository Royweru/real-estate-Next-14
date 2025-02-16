import React from 'react'
import { ListingType } from '../types'
import Image from 'next/image'

export const MediaIndividualListingView = (
    {
        data
    }:{
        data:ListingType |null
    }
) => {
    if (!data) return null;
    return (
      <div className="relative w-full grid lg:grid-cols-8 md:grid-cols-6 grid-cols-3 gap-x-2.5 gap-y-2 min-h-[500px]">
        {data.videoUrl && (
          <div className="col-span-3 md:col-span-6 lg:col-span-8 row-span-3 relative">
            <video src={data.videoUrl} controls className="w-full h-full rounded-lg" />
          </div>
        )}
        {data.images?.map((img, i) => {
          const containerClasses =
            i === 3
              ? "lg:col-span-8 md:col-span-6 col-span-3 row-span-3 h-[300px] relative overflow-hidden rounded-lg"
              : "lg:col-span-4 md:col-span-3 col-span-3 row-span-2 h-[200px] relative overflow-hidden rounded-lg";
          return (
            <div key={img.url} className={containerClasses}>
              <Image src={img.url} alt="Listing image" fill className="object-cover" />
            </div>
          );
        })}
      </div>
    );
  
}
