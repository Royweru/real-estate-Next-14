import React from 'react'
import ListingViewClient from './listing-view-client'
import { fetchListing } from '@/actions/fetchProperty'
const ListingViewPage = async({
  params
}:{
  params:{listingId:string}
}) => {
  const listing = await fetchListing(params.listingId)
  if(!listing) return 
  <div className=' max-w-md font-bold text-center text-neutral-900'>
    There is no listing oopsy!!
  </div>
  return (
    <ListingViewClient 
     data ={listing}
    />
  )
}

export default ListingViewPage
