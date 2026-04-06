"use client";

import React from "react";
import Link from "next/link";
import { Listing, Image, Amenity, Category, Status, Type, Location, User } from "@prisma/client";
import { LayoutDashboard, Clock, CheckCircle2, XCircle, ArrowRight, Eye } from "lucide-react";

type PendingListing = Listing & {
    images: Image[];
    amenities: Amenity[];
    category: Category;
    status: Status | null;
    type: Type;
    location: Location;
    user: User;
};

interface AdminDashboardClientProps {
    pendingCount: number;
    activeCount: number;
    rejectedCount: number;
    totalCount: number;
    recentPending: PendingListing[];
}

const statCards = [
    {
        label: "Pending Review",
        icon: Clock,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
    },
    {
        label: "Active Listings",
        icon: CheckCircle2,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
    },
    {
        label: "Rejected",
        icon: XCircle,
        color: "text-rose-600",
        bg: "bg-rose-50",
        border: "border-rose-200",
    },
    {
        label: "Total Listings",
        icon: LayoutDashboard,
        color: "text-slate-700",
        bg: "bg-slate-50",
        border: "border-slate-200",
    },
];

export const AdminDashboardClient = ({
    pendingCount,
    activeCount,
    rejectedCount,
    totalCount,
    recentPending,
}: AdminDashboardClientProps) => {
    const counts = [pendingCount, activeCount, rejectedCount, totalCount];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-stone-900">Admin Dashboard</h1>
                <p className="text-sm text-stone-500 mt-1">Overview of all property listings and pending reviews.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.label}
                            className={`flex items-center gap-3 rounded-2xl border ${card.border} ${card.bg} px-4 py-4 shadow-sm`}
                        >
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.color}`}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider text-stone-500">{card.label}</p>
                                <p className={`text-xl font-bold ${card.color}`}>{counts[i]}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Pending */}
            <div className="rounded-2xl border border-stone-200 bg-white shadow-sm">
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                    <h2 className="text-base font-semibold text-stone-800">Pending Review</h2>
                    <Link
                        href="/admin/approvals"
                        className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700"
                    >
                        View all
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {recentPending.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-stone-400">
                        <CheckCircle2 className="h-10 w-10 mb-3" />
                        <p className="font-medium">All caught up!</p>
                        <p className="text-sm">No pending listings to review.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-stone-100">
                        {recentPending.map((listing) => (
                            <div key={listing.id} className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 transition-colors">
                                <div className="h-14 w-14 shrink-0 rounded-xl overflow-hidden bg-stone-100 relative">
                                    {listing.images[0]?.url && (
                                        <img
                                            src={listing.images[0].url}
                                            alt={listing.title}
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-stone-800 truncate">{listing.title}</p>
                                    <p className="text-xs text-stone-500">
                                        {listing.location.county}, {listing.location.city} · {listing.type.name}
                                    </p>
                                    <p className="text-xs text-stone-400">
                                        by {listing.user.name || listing.user.email}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-sm font-bold text-stone-700">
                                        KES {(listing.purchasePrice || listing.rentalPrice || 0).toLocaleString()}
                                    </span>
                                    <Link
                                        href={`/admin/approvals`}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-400 hover:text-violet-600 hover:border-violet-300 transition-colors"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
