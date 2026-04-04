import { CreateListingForm } from "@/features/listings/components/create-listing-form"
import { EditListingForm } from "../../../../features/listings/components/edit-listing-form"
import { fetchLocations } from "@/actions/fetchLocations"
import { fetchStatus } from "@/actions/fetchStatus"
import { FetchTypes } from "@/actions/fetchTypes"
import { fetchCategories } from "@/actions/fetchCategories"
import { fetchAmenities } from "@/actions/fetchAmenities"
import { serverUser } from "@/lib/serverUser"
import { redirect } from "next/navigation"
import { fetchListing } from "@/actions/fetchProperty"

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

  let listing = null
  if (params.listingId !== 'new') {
    listing = await fetchListing(params.listingId, activeUser.id)
    if (!listing) return redirect('/management/properties')
  }

  // if(!activeUser.emailVerified)return redirect('/management/profile/edit')

  return (
    <>
      {params.listingId === 'new' ? (
        <CreateListingForm
          locations={locations}
          status={listingStatus}
          types={listingTypes}
          categories={categories}
          amenities={amenities}
        />
      ) : (
        <EditListingForm
          data={listing}
          amenities={amenities}
          locations={locations}
          status={listingStatus}
          types={listingTypes}
          categories={categories}
        />
      )}
    </>
  )
}
export default CreateListingAgent
