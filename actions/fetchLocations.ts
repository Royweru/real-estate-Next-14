
import { db } from "@/lib/prismadb"
export const fetchLocationsWithListings = async()=>{
    try {
        const locations = await db.location.findMany({
           include:{
            properties:true
           }
        })
        const locationsWithListings = locations.filter(location=>location.properties.length > 0)
        return locationsWithListings
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getLocations = async()=>{
     try {
         const locations = await db.location.findMany()
         return locations   
     } catch (error) {
        console.error(error)
        return []
     }
}