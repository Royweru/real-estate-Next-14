/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { db } from "@/lib/prismadb";
export async function fetchPropertiesManagement({
  title,
  categoryId,
  typeId,
  locationId,
  minBathrooms,
  maxBathrooms,
  minBedrooms,
  maxBedrooms,
  minPrice,
  maxPrice
}: {
  title?: string;
  categoryId?: string;
  typeId?: string;
  statusId?:string;
  locationId?: string;
  minPrice?: string;
  maxPrice?: string;
  minBedrooms?: string;
  maxBedrooms?: string;
  minBathrooms?: string;
  maxBathrooms?: string;
}) {
 const where: any = {};

  if (title) {
    where.title = { contains: title, mode: 'insensitive' };
  }
  if (categoryId) {
    where.categoryId = categoryId;
  }
  if (typeId) {
    where.typeId = typeId;
  }
  if (locationId) {
    where.locationId = locationId;
  }
  if (minBedrooms || maxBedrooms) {
    where.bedrooms = {};
    if (minBedrooms) {
      where.bedrooms.gte = Number(minBedrooms);
    }
    if (maxBedrooms) {
      where.bedrooms.lte = Number(maxBedrooms);
    }
  }
  if (minBathrooms || maxBathrooms) {
    where.bathrooms = {};
    if (minBathrooms) {
      where.bathrooms.gte = Number(minBathrooms);
    }
    if (maxBathrooms) {
      where.bathrooms.lte = Number(maxBathrooms);
    }
  }

  // Apply price range filtering on both rentalPrice and purchasePrice
  if (minPrice || maxPrice) {
    const priceConditions: any[] = [];
    const rentalPriceCondition: any = {};
    const purchasePriceCondition: any = {};

    if (minPrice) {
      rentalPriceCondition.gte = Number(minPrice);
      purchasePriceCondition.gte = Number(minPrice);
    }
    if (maxPrice) {
      rentalPriceCondition.lte = Number(maxPrice);
      purchasePriceCondition.lte = Number(maxPrice);
    }
    priceConditions.push({ rentalPrice: rentalPriceCondition });
    priceConditions.push({ purchasePrice: purchasePriceCondition });

    // This OR will ensure the listing matches at least one of the price filters
    where.OR = priceConditions;
  }

  try {
    // Fetch listings from the DB including related data
    const listings = await db.listing.findMany({
      where,
      include: {
        images: true,
        amenities: true,
        category:true,
        status:true,
        type:true,
        location:true
      },
    });

    return listings
  } catch (error) {
    console.error(error);
     return[]
  }

}
