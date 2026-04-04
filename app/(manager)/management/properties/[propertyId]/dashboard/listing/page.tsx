import { fetchListing } from '@/actions/fetchProperty'
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs'
import { ListingManagementAnalytics } from '@/features/listings/components/listing-management-analytics'
import { ListingManagementBasicInfo } from '@/features/listings/components/listing-management-basic-info'
import { redirect } from 'next/navigation'
import React from 'react'
import { serverUser } from '@/lib/serverUser'

const PropertyManagementListing = async ({
    params
  }
    :{
    params:{propertyId:string}
}) => {
  const user = await serverUser()
  if(!user) redirect('/auth/sign-in')
  const listing = await fetchListing(params.propertyId, user.id)
  if(!listing) return redirect('/management/properties')
  return (
    <div className=' w-full h-full'>
      <Tabs defaultValue="propertyanalytics" className="w-full relative">
      <TabsList className=' w-full shadow-sm font-semibold text-lg'>
    <TabsTrigger value="propertyanalytics">Overview</TabsTrigger>
    <TabsTrigger value="info">Listing Details</TabsTrigger>
  </TabsList>
  <TabsContent value='propertyanalytics'>
    <ListingManagementAnalytics />
  </TabsContent>
  <TabsContent value='info'>
     <ListingManagementBasicInfo data={{ ...listing, rentalPrice: listing.rentalPrice ?? 0, purchasePrice: listing.purchasePrice ?? 0 }} />
  </TabsContent>
      </Tabs>
    </div>
  )
}

export default PropertyManagementListing
