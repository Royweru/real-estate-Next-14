import { fetchCategories } from "@/actions/fetchCategories";
import { fetchLocations } from "@/actions/fetchLocations";
import { FetchTypes } from "@/actions/fetchTypes";
import { GetListingsRent } from "@/actions/getListingRent";
import { Cities } from "@/components/cities";
import { FeaturedProperties } from "@/components/featured";
import { Hero } from "@/components/hero";
import { serverUser } from "@/lib/serverUser";
import { FetchListings } from "@/actions/fetchListings";
import { WhyUs } from "@/components/why-us";
import { FeaturedPropertiesRent } from "@/components/featured-properties-rent";
import { PropertyTypes } from "@/components/property-types";
import { BlogsCTA } from "@/components/blogs-cta";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";

export default async function Home() {
  const [
    user,
    propertyTypes,
    categories,
    locations,
    rentProperties,
    properties
  ] = await Promise.all([
    serverUser(),
    FetchTypes(),
    fetchCategories(),
    fetchLocations(),
    GetListingsRent(),
    FetchListings()
  ])

  const locationsWithListings = locations.filter((location) => location.properties.length > 0)

  return (
    <>
      <Hero
        user={user}
        propertyTypes={propertyTypes}
        categories={categories}
        locations={locationsWithListings}
      />
      <FeaturedProperties listings={properties} />
      <HowItWorks />
      <WhyUs />
      <Cities locations={locationsWithListings} />
      <FeaturedPropertiesRent
        title="Top properties to rent"
        listings={rentProperties}
      />
      <Testimonials />
      <PropertyTypes propertyTypes={propertyTypes} />
      <BlogsCTA />
    </>
  );
}
