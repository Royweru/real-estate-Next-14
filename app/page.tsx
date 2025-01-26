import { fetchCategories } from "@/actions/fetchCategories";
import { fetchLocationsWithListings } from "@/actions/fetchLocations";
import { FetchTypes } from "@/actions/fetchTypes";
import { Cities } from "@/components/cities";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { serverUser } from "@/lib/serverUser";


export default async function Home() {
  const user = await serverUser()
  const propertyTypes = await FetchTypes()
  const categories = await fetchCategories()
  const locationsWithListings = await fetchLocationsWithListings()

  return (
   <>
    <Navbar user={user} />
    <Hero 
     propertyTypes = {propertyTypes}
     categories = {categories}
     locations = {locationsWithListings}
    />
    <Cities locations={locationsWithListings}/>
   </>
  );
}
