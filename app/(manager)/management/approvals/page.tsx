import { serverUser } from "@/lib/serverUser";
import { redirect } from "next/navigation";
import { ApprovalsClient } from "./ApprovalsClient";

export const revalidate = 0;

const ApprovalsPage = async () => {
    const user = await serverUser();

    if (!user) {
        return redirect("/auth/sign-in");
    }

    if (user.role !== "ADMIN") {
        return redirect("/management/properties");
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-stone-800">Pending Approvals</h1>
                <p className="text-stone-500">Review and approve new property listings before they go public.</p>
            </div>
            <ApprovalsClient />
        </div>
    );
};

export default ApprovalsPage;
