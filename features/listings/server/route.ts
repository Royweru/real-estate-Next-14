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
;

export default app;
