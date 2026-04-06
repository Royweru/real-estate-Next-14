import Link from "next/link";
import { LayoutDashboard, ListChecks, Users } from "lucide-react";
import { User } from "@prisma/client";

const adminNavItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Pending Approvals", href: "/admin/approvals", icon: ListChecks },
    { label: "All Listings", href: "/admin/listings", icon: Users },
];

export const Sidebar = ({ user }: { user: User }) => {
    return (
        <div className="relative w-full h-full flex flex-col">
            <Link href="/admin" className="pb-7 pt-8 pl-4 flex items-center gap-x-3">
                <img src="/logo.png" alt="logo" height={100} width={75} />
                <span className="text-stone-800/95 text-md font-bold">
                    Admin Panel
                </span>
            </Link>
            <div className="flex flex-col w-full gap-y-2 flex-1 px-3">
                {adminNavItems.map((item) => (
                    <AdminSidebarItem
                        key={item.href}
                        label={item.label}
                        icon={item.icon}
                        href={item.href}
                    />
                ))}
            </div>
            <div className="p-4 w-full border-t border-stone-200">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-stone-800">{user.name}</span>
                        <span className="text-xs text-stone-500">{user.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminSidebarItem = ({
    label,
    icon: Icon,
    href
}: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
}) => {
    return (
        <Link
            href={href}
            className="flex items-center gap-x-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
        >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{label}</span>
        </Link>
    );
};
