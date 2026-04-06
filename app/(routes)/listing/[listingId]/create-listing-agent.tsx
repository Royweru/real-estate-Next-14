import { ListingForm } from "@/features/listings/components/listing-form"
import { fetchLocations } from "@/actions/fetchLocations"
import { fetchStatus } from "@/actions/fetchStatus"
import { FetchTypes } from "@/actions/fetchTypes"
import { fetchCategories } from "@/actions/fetchCategories"
import { fetchAmenities } from "@/actions/fetchAmenities"
import { serverUser } from "@/lib/serverUser"
import { redirect } from "next/navigation"
import { fetchListing } from "@/actions/fetchProperty"
import { ListingType } from "@/features/listings/types"

const CreateListingAgent = async ({ params }: { params: { listingId: string } }) => {
  const activeUser = await serverUser()
  if (!activeUser) return redirect('/auth/sign-in')

  const [locations, listingStatus, listingTypes, categories, amenities] = await Promise.all([
    fetchLocations(),
    fetchStatus(),
    FetchTypes(),
    fetchCategories(),
    fetchAmenities(),
  ])

  let listing: ListingType | null = null
  if (params.listingId !== 'new') {
    listing = await fetchListing(params.listingId, activeUser.id)
    if (!listing) return redirect('/management/properties')
  }

  return (
    <ListingForm
      mode={params.listingId === 'new' ? 'create' : 'edit'}
      locations={locations}
      types={listingTypes}
      categories={categories}
      amenities={amenities}
      status={listingStatus}
      initialData={listing}
    />
  )
}
export default CreateListingAgent
