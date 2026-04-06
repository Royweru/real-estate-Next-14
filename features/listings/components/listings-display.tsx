"use client"

import React, { useMemo } from 'react'
import { ListingCardAdmin } from './listing-card-admin'
import { Amenity, Category, Image, Listing, Location, Status } from '@prisma/client'
import { useFiltersPropertiesAdmin } from '../hooks/use-filters-admin'
import { LayoutGrid, Plus } from 'lucide-react'
import Link from 'next/link'

type SortOption = "newest" | "oldest" | "price-high" | "price-low" | "title-az" | "title-za"

type PropertyData = (Listing & {
  images: Image[]
  amenities: Amenity[]
  status: Status | null
  location: Location
  category: Category
})

export const ListingsDisplay = ({
  properties,
}: {
  properties: PropertyData[]
}) => {
  const [filters] = useFiltersPropertiesAdmin()
  const sort = (filters.sort as SortOption) || "newest"

  const sorted = useMemo(() => {
    const sorted = [...properties]
    switch (sort) {
      case "newest":
        return sorted.sort((a, b) => b.id.localeCompare(a.id))
      case "oldest":
        return sorted.sort((a, b) => a.id.localeCompare(b.id))
      case "price-high":
        return sorted.sort((a, b) => {
          const priceA = a.purchasePrice || a.rentalPrice || 0
          const priceB = b.purchasePrice || b.rentalPrice || 0
          return priceB - priceA
        })
      case "price-low":
        return sorted.sort((a, b) => {
          const priceA = a.purchasePrice || a.rentalPrice || 0
          const priceB = b.purchasePrice || b.rentalPrice || 0
          return priceA - priceB
        })
      case "title-az":
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case "title-za":
        return sorted.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return sorted
    }
  }, [properties, sort])

  if (!properties || properties.length === 0) {
    const hasFilters = filters.categoryId || filters.typeId || filters.statusId || filters.locationId || filters.title
    return (
      <div className="relative w-full py-12">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <LayoutGrid className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900">
              {hasFilters ? "No matching properties" : "No listings yet"}
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              {hasFilters
                ? "Try adjusting your filters or search terms to find what you're looking for."
                : "Add your first property listing to get started managing your portfolio."}
            </p>
          </div>
          {!hasFilters && (
            <Link
              href="/listing/new"
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              <Plus className="h-4 w-4" />
              Add property
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full py-4 md:py-6 lg:py-8">
      <div className="flex items-center justify-between px-4 pb-3">
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-700">{sorted.length}</span> {sorted.length === 1 ? "property" : "properties"}
        </p>
      </div>
      <div className="grid w-full gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((property) => (
          <ListingCardAdmin key={property.id} data={property} />
        ))}
      </div>
    </div>
  )
}
