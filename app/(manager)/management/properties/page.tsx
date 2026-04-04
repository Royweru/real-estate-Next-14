import { PropertiesHeader } from "@/components/properties-header";
import React from "react";
import { FetchTypes } from "@/actions/fetchTypes";
import { fetchCategories } from "@/actions/fetchCategories";
import { fetchStatus } from "@/actions/fetchStatus";
import { PropertiesManagementFilter } from "@/features/listings/components/properties-management-filter";
import { ListingsDisplay } from "@/features/listings/components/listings-display";
import { fetchLocations } from "@/actions/fetchLocations";
import { fetchPropertiesManagement } from "@/actions/fetchProperties";
import { serverUser } from "@/lib/serverUser";
import { redirect } from "next/navigation";

export const revalidate = 0

const PropertiesPage = async ({
  searchParams,
}: {
  searchParams: {
    statusId?: string;
    locationId?: string;
    categoryId?: string;
    typeId?: string;
  };
}) => {
  const { statusId, locationId, categoryId, typeId } = searchParams;
  const user = await serverUser();
  if (!user) redirect("/auth/sign-in");
  const [categories, types, status, locations, properties] = await Promise.all([
    fetchCategories(),
    FetchTypes(),
    fetchStatus(),
    fetchLocations(),
    fetchPropertiesManagement({
      statusId,
      locationId,
      categoryId,
      typeId,
      userId: user.id,
    }),
  ]);

  return (
    <div className="w-full h-full flex flex-col gap-y-4">
      <PropertiesHeader count={properties.length} />
      <PropertiesManagementFilter
        categories={categories}
        propertyTypes={types}
        status={status}
        locations={locations}
      />
      <ListingsDisplay properties={properties} />
    </div>
  );
};

export default PropertiesPage;
