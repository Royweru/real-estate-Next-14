/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchCategories } from "@/actions/fetchCategories";
import { fetchLocationsWithListings } from "@/actions/fetchLocations";
import { FetchTypes } from "@/actions/fetchTypes";
import { GetListingsBuy } from "@/actions/getListingsBuy";
import { GetListingsRent } from "@/actions/getListingRent";
import { Cities } from "@/components/cities";
import { FeaturedProperties } from "@/components/featured-properties-buy";
import { Hero } from "@/components/hero";

import { serverUser } from "@/lib/serverUser";

import { fetchStatus } from "@/actions/fetchStatus";
import { BlogsSection } from "@/components/blogs";

export default async function Home() {
 const [
  user,
  propertyTypes,
  propertyStatus,
  categories,
  locationsWithListings,
  buyProperties,
  rentProperties
 ]= await Promise.all([

    serverUser(),
    FetchTypes(),
    fetchStatus(),
    fetchCategories(),
    fetchLocationsWithListings(),
    GetListingsBuy(),
    GetListingsRent()
 ])


  return (
   <>
  
    <Hero 
    user = {user}
     propertyTypes = {propertyTypes}
     categories = {categories}
     locations = {locationsWithListings}
    />
    {/* <SearchFilters 
      locations={locationsWithListings}
      categories={categories}
      propertyTypes={propertyTypes}
      status={propertyStatus}
   
    /> */}
    <Cities locations={locationsWithListings}/>
    <FeaturedProperties 
      listings={buyProperties}
      title="Top properties on sale right now"
      subTitle="Find some of the best properties on sale right now"
    />
    <FeaturedProperties 
      listings={rentProperties}
      title="Top properties to rent"
      subTitle="Here are some of the best properties to rent "
    />
    <BlogsSection />
   </>
  );
}
