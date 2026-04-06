import { serverUser } from "@/lib/serverUser";
import { redirect } from "next/navigation";
import { db } from "@/lib/prismadb";
import { AdminApprovalsClient } from "./AdminApprovalsClient";

export const revalidate = 0;

const AdminApprovalsPage = async () => {
    const user = await serverUser();
    if (!user) return redirect("/auth/sign-in");
    if (user.role !== "ADMIN") return redirect("/management/properties");

    const pendingListings = await db.listing.findMany({
        where: { status: { name: "Pending" } },
        include: {
            images: true,
            amenities: true,
            category: true,
            status: true,
            type: true,
            location: true,
            user: true,
        },
        orderBy: { id: "desc" },
    });

    return <AdminApprovalsClient listings={pendingListings} />;
};

export default AdminApprovalsPage;
