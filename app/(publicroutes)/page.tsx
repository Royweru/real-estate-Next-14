/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchCategories } from "@/actions/fetchCategories";
import { fetchLocationsWithListings } from "@/actions/fetchLocations";
import { FetchTypes } from "@/actions/fetchTypes";
import { GetListingsBuy } from "@/actions/getListingsBuy";
import { GetListingsRent } from "@/actions/getListingRent";
import { Cities } from "@/components/cities";
import { FeaturedProperties } from "@/components/featured";
import { Hero } from "@/components/hero";

import { serverUser } from "@/lib/serverUser";

import { fetchStatus } from "@/actions/fetchStatus";
import { BlogsSection } from "@/components/blogs";
import { fetchPropertiesManagement } from "@/actions/fetchProperties";
import { FetchListings } from "@/actions/fetchListings";
import { WhyUs } from "@/components/why-us";

export default async function Home() {
 const [
  user,
  propertyTypes,
  propertyStatus,
  categories,
  locationsWithListings,
  buyProperties,
  rentProperties,
  properties
 ]= await Promise.all([

    serverUser(),
    FetchTypes(),
    fetchStatus(),
    fetchCategories(),
    fetchLocationsWithListings(),
    GetListingsBuy(),
    GetListingsRent(),
    FetchListings()
 ])


  return (
   <>
  
    <Hero 
    user = {user}
     propertyTypes = {propertyTypes}
     categories = {categories}
     locations = {locationsWithListings}
    />
    <FeaturedProperties 
     listings  = {properties}
    />
    <WhyUs  />
    {/* <SearchFilters 
      locations={locationsWithListings}
      categories={categories}
      propertyTypes={propertyTypes}
      status={propertyStatus}
   
    /> */}
    <Cities locations={locationsWithListings}/>
     
    <BlogsSection />
   </>
  );
}
