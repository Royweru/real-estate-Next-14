"use client";

import React, { useState } from "react";
import { Listing, Image, Amenity, Category, Status, Type, Location, User } from "@prisma/client";
import { CheckCircle2, XCircle, Clock, Eye, User as UserIcon, MapPin, BedDouble, Bath, Ruler, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

type PendingListing = Listing & {
    images: Image[];
    amenities: Amenity[];
    category: Category;
    status: Status | null;
    type: Type;
    location: Location;
    user: User;
};

interface AdminApprovalsClientProps {
    listings: PendingListing[];
}

export const AdminApprovalsClient = ({ listings: initialListings }: AdminApprovalsClientProps) => {
    const [listings, setListings] = useState(initialListings);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [selectedListing, setSelectedListing] = useState<PendingListing | null>(null);

    const handleAction = async (listingId: string, action: "approve" | "reject") => {
        setProcessingId(listingId);
        try {
            const res = await axios.patch(`/api/listings/${action}/${listingId}`);
            if (res.status === 200) {
                toast.success(
                    action === "approve"
                        ? "Listing approved! Email notification sent to owner."
                        : "Listing rejected. Owner has been notified."
                );
                setListings((prev) => prev.filter((l) => l.id !== listingId));
                setSelectedListing(null);
            }
        } catch (error: unknown) {
            const msg = error && typeof error === 'object' && 'response' in error
                ? (error as { response?: { data?: { error?: string } } }).response?.data?.error
                : null;
            toast.error(msg || `Failed to ${action} listing.`);
        } finally {
            setProcessingId(null);
        }
    };

    if (listings.length === 0) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900">Pending Approvals</h1>
                    <p className="text-sm text-stone-500 mt-1">Review and approve new property listings.</p>
                </div>
                <div className="flex flex-col items-center justify-center py-24 text-stone-400 rounded-2xl border border-dashed border-stone-300 bg-white">
                    <CheckCircle2 className="h-12 w-12 mb-4 text-emerald-400" />
                    <p className="text-lg font-semibold text-stone-600">All caught up!</p>
                    <p className="text-sm">No pending listings to review.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900">Pending Approvals</h1>
                    <p className="text-sm text-stone-500 mt-1">{listings.length} listing{listings.length !== 1 ? "s" : ""} awaiting review</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing) => (
                    <div
                        key={listing.id}
                        className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                        {/* Image */}
                        <div className="relative h-48 w-full overflow-hidden">
                            {listing.images[0]?.url ? (
                                <img
                                    src={listing.images[0].url}
                                    alt={listing.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-gradient-to-br from-stone-200 to-stone-100" />
                            )}
                            <span className="absolute left-3 top-3 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Pending
                            </span>
                            {listing.images.length > 1 && (
                                <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-1 text-xs font-medium text-white flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {listing.images.length}
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col gap-3 p-4">
                            <div>
                                <p className="text-base font-semibold text-stone-900 line-clamp-1">{listing.title}</p>
                                <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                                    <MapPin className="h-3 w-3" />
                                    {listing.location.county}, {listing.location.city}
                                </p>
                            </div>

                            {/* Owner info */}
                            <div className="flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-2">
                                <UserIcon className="h-4 w-4 text-stone-400" />
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-stone-700 truncate">{listing.user.name || "Unknown"}</p>
                                    <p className="text-[10px] text-stone-400 truncate">{listing.user.email}</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex items-center gap-3 text-xs text-stone-500">
                                <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{listing.bedrooms}</span>
                                <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{listing.bathrooms}</span>
                                <span className="flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{listing.area}m²</span>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
                                <p className="text-lg font-bold text-stone-900">
                                    KES {(listing.purchasePrice || listing.rentalPrice || 0).toLocaleString()}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setSelectedListing(listing)}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-400 hover:text-violet-600 hover:border-violet-300 transition-colors"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleAction(listing.id, "approve")}
                                        disabled={processingId === listing.id}
                                        className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                                    >
                                        {processingId === listing.id ? (
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                        )}
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(listing.id, "reject")}
                                        disabled={processingId === listing.id}
                                        className="flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50 transition-colors"
                                    >
                                        <XCircle className="h-3.5 w-3.5" />
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Preview Modal */}
            {selectedListing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedListing(null)}>
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="relative h-64 w-full">
                            {selectedListing.images[0]?.url ? (
                                <img src={selectedListing.images[0].url} alt={selectedListing.title} className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full bg-stone-200" />
                            )}
                            <button
                                onClick={() => setSelectedListing(null)}
                                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-xl font-bold text-stone-900">{selectedListing.title}</h3>
                                <p className="text-sm text-stone-500">{selectedListing.location.county}, {selectedListing.location.city}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-stone-500">Type:</span> <span className="font-medium">{selectedListing.type.name}</span></div>
                                <div><span className="text-stone-500">Category:</span> <span className="font-medium">{selectedListing.category.name}</span></div>
                                <div><span className="text-stone-500">Bedrooms:</span> <span className="font-medium">{selectedListing.bedrooms}</span></div>
                                <div><span className="text-stone-500">Bathrooms:</span> <span className="font-medium">{selectedListing.bathrooms}</span></div>
                                <div><span className="text-stone-500">Area:</span> <span className="font-medium">{selectedListing.area} m²</span></div>
                                <div><span className="text-stone-500">Price:</span> <span className="font-medium">KES {(selectedListing.purchasePrice || selectedListing.rentalPrice || 0).toLocaleString()}</span></div>
                            </div>
                            {selectedListing.description && (
                                <div>
                                    <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Description</p>
                                    <p className="mt-1 text-sm text-stone-700 leading-relaxed">{selectedListing.description}</p>
                                </div>
                            )}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                                <button
                                    onClick={() => { handleAction(selectedListing.id, "reject"); }}
                                    disabled={processingId === selectedListing.id}
                                    className="flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                                >
                                    <XCircle className="h-4 w-4" />
                                    Reject
                                </button>
                                <button
                                    onClick={() => { handleAction(selectedListing.id, "approve"); }}
                                    disabled={processingId === selectedListing.id}
                                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                    Approve & Notify
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
