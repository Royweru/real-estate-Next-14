import { fetchCategories } from "@/actions/fetchCategories";
import { fetchLocationsWithListings } from "@/actions/fetchLocations";
import { FetchTypes } from "@/actions/fetchTypes";
import { GetListingsBuy } from "@/actions/getListingsBuy";
import { GetListingsRent } from "@/actions/getListingRent";
import { Cities } from "@/components/cities";
import { FeaturedProperties } from "@/components/featured-properties-buy";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { serverUser } from "@/lib/serverUser";


export default async function Home() {
 const [
  user,
  propertyTypes,
  categories,
  locationsWithListings,
  buyProperties,
  rentProperties
 ]= await Promise.all([
    serverUser(),
    FetchTypes(),
    fetchCategories(),
    fetchLocationsWithListings(),
    GetListingsBuy(),
    GetListingsRent()
 ])

  return (
   <>
    <Navbar user={user} />
    <Hero 
     propertyTypes = {propertyTypes}
     categories = {categories}
     locations = {locationsWithListings}
    />
    <Cities locations={locationsWithListings}/>
    <FeaturedProperties 
      listings={buyProperties}
    />
    <FeaturedProperties 
      listings={rentProperties}
    />
   </>
  );
}
