import { PropertiesHeader } from "@/components/properties-header";
import { DashboardStats } from "@/components/dashboard-stats";
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
    title?: string;
  };
}) => {
  const { statusId, locationId, categoryId, typeId, title } = searchParams;
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
      title,
      userId: user.id,
    }),
  ]);

  return (
    <div className="w-full h-full flex flex-col gap-y-6 p-4 md:p-6">
      <PropertiesHeader count={properties.length} />
      <DashboardStats properties={properties} />
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
