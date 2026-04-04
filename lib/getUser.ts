"use server"

import type { Listing, User } from "@prisma/client";
import { db } from "@/lib/prismadb";

type ExtendedUser = User & {
  listings: Listing[];
  superAdmin: { id: string; userId: string; createdAt: Date } | null;
};

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
export const getUserById = async (id: string): Promise<ExtendedUser | null> => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: { listings: true },
    });
    if (!user) return null;
    const superAdmin = await db.superAdmin.findUnique({ where: { userId: id } });
    return { ...user, superAdmin };
  } catch (error) {
    console.error(error);
    return null;
  }
};
