
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

const CreateListingAgent = async ({params}:{params:{listingId:string}}) => {
   const activeUser= await serverUser()
    const locations = await fetchLocations()
    const listingStatus = await fetchStatus()
    const listingTypes = await FetchTypes()
    const categories = await fetchCategories()
    const amenities = await fetchAmenities()

    const listing = await fetchListing(params.listingId)

    if(!activeUser) return redirect('/auth/sign-in')

    // if(!activeUser.emailVerified)return redirect('/management/profile/edit')

  return (
    <>
      {params.listingId === 'new' ? 
      <CreateListingForm
       locations={locations}
        status={listingStatus}
         types={listingTypes} 
         categories={categories} 
         amenities={amenities} /> : 
      <EditListingForm
      data={listing}
      amenities={amenities}
      locations={locations}
      status={listingStatus}
       types={listingTypes} 
       categories={categories} 
      />}
    </>
  )
}
export default CreateListingAgent