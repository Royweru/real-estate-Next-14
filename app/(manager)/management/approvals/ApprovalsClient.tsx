"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApprovalListingCard } from "@/features/listings/components/approval-listing-card";
import { Loader2 } from "lucide-react";

export const ApprovalsClient = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingListings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/listings/pending");
      setListings(data.listings || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingListings();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-stone-500" />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-stone-500">
        <h2 className="text-xl font-semibold mb-2">No pending approvals</h2>
        <p>All property listings have been reviewed.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing: any) => (
        <ApprovalListingCard
          key={listing.id}
          data={listing}
          onActionComplete={fetchPendingListings}
        />
      ))}
    </div>
  );
};
