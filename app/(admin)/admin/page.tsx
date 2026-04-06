import { serverUser } from "@/lib/serverUser";
import { redirect } from "next/navigation";
import { db } from "@/lib/prismadb";
import { AdminDashboardClient } from "./AdminDashboardClient";

export const revalidate = 0;

const AdminDashboardPage = async () => {
    const user = await serverUser();
    if (!user) return redirect("/auth/sign-in");
    if (user.role !== "ADMIN") return redirect("/management/properties");

    const [pendingCount, activeCount, rejectedCount, totalCount, recentPending] = await Promise.all([
        db.listing.count({ where: { status: { name: "Pending" } } }),
        db.listing.count({ where: { status: { name: "Active" } } }),
        db.listing.count({ where: { status: { name: "Rejected" } } }),
        db.listing.count(),
        db.listing.findMany({
            where: { status: { name: "Pending" } },
            take: 5,
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
        }),
    ]);

    return (
        <AdminDashboardClient
            pendingCount={pendingCount}
            activeCount={activeCount}
            rejectedCount={rejectedCount}
            totalCount={totalCount}
            recentPending={recentPending}
        />
    );
};

export default AdminDashboardPage;
