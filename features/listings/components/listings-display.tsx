import React from 'react'
import { ListingCardAdmin } from './listing-card-admin'
import { Amenity, Category, Image, Listing, Location, Status } from '@prisma/client'

export const ListingsDisplay = ({
  properties,
}: {
  properties: (Listing & {
    images: Image[]
    amenities: Amenity[]
    status: Status | null
    location: Location
    category: Category
  })[]
}) => {
  if (!properties || properties.length === 0) {
    return (
      <div className="relative w-full py-12">
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-500">
            No listings yet
          </p>
          <h3 className="text-2xl font-bold text-stone-900">Create your first property</h3>
          <p className="text-sm text-neutral-600">
            Add a new listing to bring your portfolio into the dashboard and keep everything in one place.
          </p>
          <a
            href="/listing/new"
            className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-sky-600"
          >
            Add property
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full py-4 md:py-6 lg:py-8">
      <div className="grid w-full gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <ListingCardAdmin key={property.id} data={property} />
        ))}
      </div>
    </div>
  )
}
