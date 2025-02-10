import { db } from "@/lib/prismadb";
import { serverUser } from "@/lib/serverUser";

interface fetchPropertiesManagementProps {
  categoryId?: string | null;
  locationId?: string | null;
  statusId?: string | null;
  typeId?: string | null;
}
export const fetchPropertiesManagement = async ({
  categoryId,
  locationId,
  statusId,
  typeId,
}: fetchPropertiesManagementProps) => {
  const user = await serverUser();
  if (!user) return [];
  const searchParams: Partial<{
    categoryId: string;
    locationId: string;
    statusId: string;
    typeId: string;
  }> = {};

  if (categoryId) searchParams.categoryId = categoryId;
  if (locationId) searchParams.locationId = locationId;
  if (statusId) searchParams.statusId = statusId;
  if (typeId) searchParams.typeId = typeId;

  try {
    const listings = await db.listing.findMany({
      where: {
        userId: user.id,
        ...searchParams,
      },
      include: {
        images: true,
        amenities: true,
        status: true,
        category: true,
        type: true,
        inquiries: true,
        location: true,
      },
    });
    return listings;
  } catch (error) {
    console.error(error);
    return [];
  }
};
