
import { CreateListingForm } from "@/features/listings/components/create-listing-form"
import { EditListingForm } from "../../../../features/listings/components/edit-listing-form"
import { getLocations } from "@/actions/fetchLocations"
import { fetchStatus } from "@/actions/fetchStatus"
import { FetchTypes } from "@/actions/fetchTypes"
import { fetchCategories } from "@/actions/fetchCategories"

const CreateListingAgent = async ({params}:{params:{listingId:string}}) => {
    const locations = await getLocations()
    const listingStatus = await fetchStatus()
    const listingTypes = await FetchTypes()
    const categories = await fetchCategories()
  return (
    <>
      {params.listingId === 'new' ? <CreateListingForm locations={locations} status={listingStatus} types={listingTypes} categories={categories} /> : 
      <EditListingForm listingId={params.listingId} />}
    </>
  )
}
export default CreateListingAgent