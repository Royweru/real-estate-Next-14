import { db } from "@/lib/prismadb";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { NextResponse } from "next/server";
import { string, z } from "zod";

const app = new Hono()
.post(
    "/create",
     zValidator("json",z.object({
        listingId:z.string(),
        name:z.string().min(1,"Name is required"),
        email:z.string().min(1,"Email is required"),
        phoneNo:z.string().optional(),
        message:z.string().optional()
     })),
    async(c)=>{
        const {name,listingId,email,phoneNo,message} = c.req.valid("json")

        try {
            const res = await db.inquiry.create({
                data:{
                    listingId,
                    email,
                    phone:phoneNo,
                    name,
                    message
                }
            })
            return NextResponse.json(res,{status:201})
        } catch (error) {
            console.error(error)
            return new NextResponse("Internal server error",{status:500})
        }
    }
)

export default app