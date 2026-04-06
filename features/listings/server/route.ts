/* eslint-disable @typescript-eslint/no-unused-vars */
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createListingSchema } from "../schemas";
import { serverUser } from "@/lib/serverUser";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ApprovalEmailTemplate } from "@/components/approval-email-template";
import { RejectionEmailTemplate } from "@/components/rejection-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
      const pendingStatus = await db.status.findFirst({
        where: { name: "Pending" }
      });
      if (!pendingStatus) {
        return c.json({ error: "Pending status missing in database" }, 500);
      }
      const listing = await db.listing.create({
        data: {
          userId: user.id,
          title,
          typeId,
          categoryId,
          statusId: pendingStatus.id,
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
    const existingListing = await db.listing.findUnique({
      where: { id: listingId },
      select: { userId: true },
    });
    if (!existingListing) {
      return c.json({ error: "Listing not found" }, 404);
    }
    if (existingListing.userId !== user.id) {
      return c.json({ error: "Forbidden" }, 403);
    }
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
  .patch(
  '/approve/:listingId',
  async (c) => {
    const user = await serverUser();
    if (!user || !user.superAdmin) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const listingId = c.req.param("listingId");
    if (!listingId) return c.json({ error: "Listing id is required !" }, 400);

    try {
      const activeStatus = await db.status.findFirst({ where: { name: "Active" } });
      if (!activeStatus) return c.json({ error: "Active status missing" }, 500);

      const listing = await db.listing.findUnique({
        where: { id: listingId },
        include: { user: true },
      });
      if (!listing) return c.json({ error: "Listing not found" }, 404);

      const res = await db.listing.update({
        where: { id: listingId },
        data: { statusId: activeStatus.id },
      });

      // Send approval email notification
      if (listing.user.email) {
        try {
          await resend.emails.send({
            from: "Apartimenti <onboarding@resend.dev>",
            to: listing.user.email,
            subject: `Your listing "${listing.title}" has been approved!`,
            react: ApprovalEmailTemplate({
              listingTitle: listing.title,
              listingUrl: `${baseUrl}/listings/${listingId}/view`,
              ownerName: listing.user.name || "there",
            }),
          });
        } catch (emailError) {
          console.error("Failed to send approval email:", emailError);
        }
      }

      return c.json(res, 200);
    } catch (error) {
      console.error(error);
      return c.json({ error: "Internal server error" }, 500);
    }
  }
)
  .patch(
  '/reject/:listingId',
  async (c) => {
    const user = await serverUser();
    if (!user || !user.superAdmin) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const listingId = c.req.param("listingId");
    if (!listingId) return c.json({ error: "Listing id is required !" }, 400);

    try {
      const rejectedStatus = await db.status.findFirst({ where: { name: "Rejected" } });
      if (!rejectedStatus) return c.json({ error: "Rejected status missing" }, 500);

      const listing = await db.listing.findUnique({
        where: { id: listingId },
        include: { user: true },
      });
      if (!listing) return c.json({ error: "Listing not found" }, 404);

      const res = await db.listing.update({
        where: { id: listingId },
        data: { statusId: rejectedStatus.id },
      });

      // Send rejection email notification
      if (listing.user.email) {
        try {
          await resend.emails.send({
            from: "Apartimenti <onboarding@resend.dev>",
            to: listing.user.email,
            subject: `Update on your listing "${listing.title}"`,
            react: RejectionEmailTemplate({
              listingTitle: listing.title,
              ownerName: listing.user.name || "there",
              reason: "Please review your listing details, ensure all information is accurate and complete, and resubmit for approval.",
            }),
          });
        } catch (emailError) {
          console.error("Failed to send rejection email:", emailError);
        }
      }

      return c.json(res, 200);
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
      const existingListing = await db.listing.findUnique({
        where: { id: listingId },
        select: { userId: true },
      });
      if (!existingListing) {
        return new NextResponse("Listing not found", { status: 404 });
      }
      if (existingListing.userId !== user.id) {
        return new NextResponse("Forbidden", { status: 403 });
      }
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

.get('/pending', async (c) => {
  const user = await serverUser();
  if (!user || user.role !== "ADMIN") return c.json({ error: "Unauthorized" }, 401);
  try {
    const listings = await db.listing.findMany({
      where: { status: { name: 'Pending' } },
      include: {
        images: true,
        amenities: true,
        category: true,
        status: true,
        type: true,
        location: true
      },
    });
    return c.json({ listings }, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Internal server error" }, 500);
  }
})
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
  const where: any = {
    status: {
      name: 'Active',
    },
  };

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
