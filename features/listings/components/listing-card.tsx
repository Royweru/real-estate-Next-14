"use client"
import { Badge } from '@/components/ui/badge'
import { Amenity, Category, Image as ImageType , Listing, Location, Status } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'


export const ListingCard = ({
    data
}:{
    data:Listing&{
        images:ImageType[],
        amenities:Amenity[],
        status:Status,
        location:Location,
        category:Category
    }
}) => {
    const router = useRouter()
  return (
    <div
     className="bg-white hover:cursor-pointer hover:opacity-85
     shadow-md rounded-lg p-0 col-span-1"
     onClick={()=>router.push(`/management/properties/${data.id}/dashboard/listing`)}
     >
        <div className=' relative w-full h-60  '>
              <Image
                 src={data.images[0].url}
                 alt='Placeholder image'
                 fill
                 className=' bg-cover bg-center rounded-t-lg'
                />
                
                    <Badge
                     variant={"destructive"}
                     className=' top-1 right-1 absolute'
                    >
                        {data.status.name ==="Active" ?"On sale":data.status.name ==="Closed"?"Sold":"Pending sale"}
                    </Badge>
                
        </div>
        <div className=' p-4 flex flex-col gap-y-2 relative'>
        <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
      <p className="text-gray-600 text-sm">
        {data.description?.slice(0,50)} ......
        </p>
      <span className="text-lg font-semibold text-green-600">
        ${ data.rentalPrice ? data.rentalPrice.toLocaleString('en') : data.purchasePrice?.toLocaleString('en') }
      </span>
        </div>
      
    </div>
  )
}
