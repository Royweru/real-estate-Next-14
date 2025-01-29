import React from 'react'
import CreateListingAgent from './create-listing-agent'

const ListingIdPage = ({params}: {params: {listingId: string}}) => {
  return (
    <div className='w-full h-full flex flex-col gap-y-4'>
        <CreateListingAgent params={params} />
    </div>
  )
}

export default ListingIdPage