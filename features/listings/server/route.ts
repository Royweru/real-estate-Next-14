/* eslint-disable @typescript-eslint/no-unused-vars */
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createListingSchema } from "../schemas";
import { serverUser } from "@/lib/serverUser";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

const app = new Hono()
.post(
  "/create",
  zValidator("json", createListingSchema),
  async (c) => {
    const user = await serverUser();
    if (!user) {
      return c.json({ errror: "Unauthorized" }, 401);
    }
    const {
      title,
      description,
      videoUrl,
      priceType,
      purchasePrice,
      rentalPrice,
      locationId,
      statusId,
      typeId,
      categoryId,
      images,
      bedrooms,
      amenities,
      bathrooms,
      area,
    } = c.req.valid("json");
    if (
      !title ||
      !description ||
      !locationId ||
      !statusId ||
      !typeId ||
      !categoryId ||
      !bedrooms ||
      !amenities ||
      !bathrooms ||
      !area
    ) {
      return c.json(
        {
          error: "All fields are required,one of the fields is missing",
        },
        400
      );
    }
    if (!images || images.length === 0) {
      return c.json("Image is required", 400);
    }
    try {
      const listing = await db.listing.create({
        data: {
          userId: user.id,
          title,
          typeId,
          categoryId,
          statusId,
          locationId,
          description,
          videoUrl,
          bedrooms,
          bathrooms,
          area,
          purchasePrice,
          rentalPrice,
          priceType,
          images: {
            createMany: {
              data: [...images.map((image: { url: string }) => image)],
            },
          },
          amenities: {
            connect: amenities.map((amenityId) => ({ id: amenityId })),
          },
        },
      });
      return c.json(listing, 201);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal server error" }, 500);
    }
  }
)
.patch(
  "/edit/:listingId",
  async (c) => {
    const user = await serverUser();
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const listingId= c.req.param("listingId");
    if (!listingId) {
      return c.json({ error: "Listing id is required !" }, 400);
    }
    
    const body = await c.req.json()
    console.log(body)
    try {
      const res = await db.listing.update({
        where: {
          id: listingId,
        },
        data: {
          ...body,
        },
      });
      return c.json(res, 201);
    } catch (error) {
      console.error(error);
      return c.json({ error: "Internal server error" }, 500);
    }
  }
)
.delete('/delete/:listingId',
  async(c)=>{
    const user = await serverUser();
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const listingId = c.req.param("listingId")
    if(!listingId) return new NextResponse("Listing Id is required!")
    try {
       const res = await db.listing.delete({
        where:{
          id:listingId
        }
       })
       return NextResponse.json(res,{status:200})
    } catch (error) {
      console.error(error)
      return new NextResponse("Internal server error",{status:500})
    }
  }
)
.get('/search', async (c) => {
  // Retrieve query parameters
  const title = c.req.query('title'); // Case insensitive match on title
  const categoryId = c.req.query('categoryId');
  const typeId = c.req.query('typeId');
  const locationId = c.req.query('locationId');
  const minPrice = c.req.query('minPrice');
  const maxPrice = c.req.query('maxPrice');
  const minBedrooms = c.req.query('minBedrooms');
  const maxBedrooms = c.req.query('maxBedrooms');
  const minBathrooms = c.req.query('minBathrooms');
  const maxBathrooms = c.req.query('maxBathrooms');

  // Build the dynamic "where" clause for Prisma
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

    return c.json({ total: listings.length, listings }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Internal server error" }, 500);
  }
})
;

export default app;
