import { auth } from "@/auth"
import { getUserById } from "./getUser"

export const serverUser = async() => {
    const session = await auth()
    if(!session?.user.id) return null

    const user = await getUserById(session?.user?.id)

     if(!user) return null
     return user
}