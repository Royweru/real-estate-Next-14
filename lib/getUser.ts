"use server"

import { db } from "@/lib/prismadb";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
          where: {
            email
          },
        });
        return user;
      } catch (error) {
        console.error(error)
        return null;
      }
};
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
      include:{
        listings:true
      }
    });
    return user;
  } catch (error) {
    console.error(error)
    return null;
  }
};
