/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchCategories } from "@/actions/fetchCategories";
import { fetchLocations } from "@/actions/fetchLocations";
import { FetchTypes } from "@/actions/fetchTypes";
import { GetListingsBuy } from "@/actions/getListingsBuy";
import { GetListingsRent } from "@/actions/getListingRent";
import { Cities } from "@/components/cities";
import { FeaturedProperties } from "@/components/featured";
import { Hero } from "@/components/hero";

import { serverUser } from "@/lib/serverUser";

import { fetchStatus } from "@/actions/fetchStatus";

import { fetchPropertiesManagement } from "@/actions/fetchProperties";
import { FetchListings } from "@/actions/fetchListings";
import { WhyUs } from "@/components/why-us";
import { FeaturedPropertiesRent } from "@/components/featured-properties-rent";
import { PropertyTypes } from "@/components/property-types";
import { BlogsCTA } from "@/components/blogs-cta";

export default async function Home() {
 const [
  user,
  propertyTypes,
  propertyStatus,
  categories,
  locations,
  buyProperties,
  rentProperties,
  properties
 ]= await Promise.all([

    serverUser(),
    FetchTypes(),
    fetchStatus(),
    fetchCategories(),
    fetchLocations(),
    GetListingsBuy(),
    GetListingsRent(),
    FetchListings()
 ])
 const locationsWithListings = locations.filter((location)=>location.properties.length >0)

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
     <FeaturedPropertiesRent
      title="Top properties to rent"
     listings={rentProperties}/>
     <PropertyTypes propertyTypes={propertyTypes as any} />
    <BlogsCTA />
   </>
  );
}
