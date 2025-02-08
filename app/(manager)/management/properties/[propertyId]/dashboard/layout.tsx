import { fetchListing } from "@/actions/fetchProperty";
import { PropertyManagementHeader } from "@/features/listings/components/property-management-header";

const PropertyManagementDashboard = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { propertyId: string };
}) => {
  const listing = await fetchListing(params.propertyId);
  return (
    <div className=" relative w-full min-h-screen p-0">
      <PropertyManagementHeader listing={listing} />
      <div className=" w-full relative h-full p-5 md:p-8 lg:p-12">
        {children}
      </div>
    </div>
  );
};

export default PropertyManagementDashboard;
