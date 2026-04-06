import { serverUser } from "@/lib/serverUser";
import { redirect } from "next/navigation";
import { Sidebar } from "./_components/sidebar";

const AdminLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const user = await serverUser();
    if (!user) return redirect("/auth/sign-in");
    if (user.role !== "ADMIN") return redirect("/management/properties");

    return (
        <div className="w-full min-h-screen flex bg-stone-50">
            <div className="hidden lg:block w-64 shrink-0 border-r border-stone-200 bg-white">
                <Sidebar user={user} />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
