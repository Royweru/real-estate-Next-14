import { fetchPropertiesManagement } from '@/actions/fetchProperties'
import { ListingCardClient } from '@/features/listings/components/listing-card-client'
import { ListingType } from '@/features/listings/types'
import React from 'react'

export const revalidate = 0

const BrowsePage = async ({
  searchParams,
}: {
  searchParams: {
    title?: string;
    categoryId?: string;
    typeId?: string;
    locationId?: string;
    minPrice?: string;
    maxPrice?: string;
    minBedrooms?: string;
    maxBedrooms?: string;
    minBathrooms?: string;
    maxBathrooms?: string;
  }
}) => {
  const {
    title,
    categoryId,
    typeId,
    locationId,
    minPrice,
    maxPrice,
    minBedrooms,
    maxBedrooms,
    minBathrooms,
    maxBathrooms,
  } = searchParams

  const listings = await fetchPropertiesManagement({
    title,
    categoryId,
    typeId,
    locationId,
    minPrice,
    maxPrice,
    minBedrooms,
    maxBedrooms,
    minBathrooms,
    maxBathrooms,
  })

  return (
    <div className="relative w-full h-full">
      {!listings || listings.length === 0 ? (
        <div className="w-full min-h-screen text-text-blackgrey md:pt-10 pt-2">
          <div className="max-w-3xl font-semibold font-mono">
            <h3 className="text-2xl text-zinc-800 leading-tight">
              It looks like we couldn&apos;t find any listings that fit your criteria. Try adjusting your filters or exploring different options to discover your perfect home! 🏡✨
            </h3>
          </div>
        </div>
      ) : (
        <div className="lg:grid-cols-2 gap-4 grid">
          {listings.map((listing: ListingType) => (
            <ListingCardClient key={listing?.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BrowsePage