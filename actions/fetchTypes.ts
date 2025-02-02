import { prisma } from "@/lib/prisma";

export async function FetchTypes() {
  try {
    const types = await prisma.type.findMany();
    return types;
  } catch (error) {
    console.error("Error fetching types:", error);
    throw error;
  }
}
