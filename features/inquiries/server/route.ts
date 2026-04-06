import { db } from "@/lib/prismadb";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { InquiryEmailTemplate } from "@/components/inquiry-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const app = new Hono()
.post(
    "/create",
     zValidator("json",z.object({
        listingId:z.string(),
        name:z.string().min(1,"Name is required"),
        email:z.string().email("Valid email is required"),
        phoneNo:z.string().optional(),
        message:z.string().optional()
     })),
    async(c)=>{
        const {name,listingId,email,phoneNo,message} = c.req.valid("json")

        try {
            const listing = await db.listing.findUnique({
                where: { id: listingId },
                include: {
                    user: true,
                },
            })

            if (!listing) {
                return c.json({ error: "Listing not found" }, 404)
            }

            const res = await db.inquiry.create({
                data:{
                    listingId,
                    email,
                    phone:phoneNo,
                    name,
                    message
                }
            })

            try {
                if (listing.user.email) {
                    await resend.emails.send({
                        from: "Apartimenti <onboarding@resend.dev>",
                        to: listing.user.email,
                        subject: `New inquiry on "${listing.title}"`,
                        react: InquiryEmailTemplate({
                            listingTitle: listing.title,
                            inquiryName: name,
                            inquiryEmail: email,
                            inquiryPhone: phoneNo,
                            inquiryMessage: message,
                        }),
                    })
                }
            } catch (emailError) {
                console.error("Failed to send inquiry notification email:", emailError)
            }

            return c.json(res,{status:201})
        } catch (error) {
            console.error(error)
            return c.json({ error: "Internal server error" }, 500)
        }
    }
)

export default app
