/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { db } from "@/lib/prismadb"
import { serverUser } from "@/lib/serverUser"
import { Inquiry } from "@prisma/client"

export const fetchInquiries = async ():Promise<Inquiry[]> => {
    const user = await serverUser()
    if(!user ) return []
     
      try {
         const listings = await db.listing.findMany({
            where:{
                userId:user.id
            },
            include:{
                images:true,
                amenities:true,
                location:true,
                inquiries:true,
                status:true,
                
            }
         })
         const listingsInquiries:Inquiry[]= [];

         listings.forEach((listing)=>{
            listing.inquiries.forEach((inquiry)=>{
                listingsInquiries.push(inquiry)
            })
         })

         return listingsInquiries
      } catch (error) {
       console.error(error)
         return []
      }
}