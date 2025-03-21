"use client";

import React, { useState } from "react";
import qs from "query-string";
import { Category, Location, Type } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const SearchBox = ({
  propertyTypes,
  categories,
  locations,
}: {
  propertyTypes: Type[];
  categories: Category[];
  locations: Location[];
}) => {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [locationId, setLocationId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [activeTab, setActiveTab] = useState(""); // Default to "rent"

  // Handle tab selection
  const handleTabChange = (tab: "rent" | "sale") => {
    setActiveTab(tab);
    // Find the corresponding category ID from the categories array
    const category = categories.find((cat) =>
      tab === "rent"
        ? cat.name.toLowerCase() === "rent"
        : cat.name.toLowerCase() === "buy" || cat.name.toLowerCase() === "sale"
    );

    if (category) {
      setCategoryId(category.id);
    }
  };

  const onSearch = () => {
    const updatedQuery = {
      categoryId,
      locationId,
      typeId,
      minPrice: minPrice !== ""? parseInt(minPrice) : undefined,
      maxPrice: maxPrice !== "" ?parseInt(maxPrice)  : undefined,
    };
    const pushUrl = qs.stringifyUrl(
      {
        url: "/browse",
        query: updatedQuery,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(pushUrl);
  };

  return (
    <div
      className="bg-neutral-100/90 shadow-sm w-full
     px-2 py-4 md:px-6 mx-2 md:mx-0 md:w-[700px] lg:w-[850px] relative"
    >
      <div className="relative w-full flex items-center justify-start -mt-3.5 -ml-5 mb-3">
        <button
          className={`w-1/4 py-2 px-4 font-semibold ${
            activeTab === "rent"
              ? "bg-blue-sky ring-1 ring-blue-powder"
              : "bg-blue-sky/70"
          } text-white border-none hover:cursor-pointer hover:opacity-90`}
          onClick={() => handleTabChange("rent")}
        >
          For Rent
        </button>
        <button
          className={`w-1/4 py-2 px-4 font-semibold ${
            activeTab === "sale"
              ? "bg-red-rubyRed ring-1 ring-red-boldCrimson"
              : "bg-red-rubyRed/70"
          } hover:opacity-90 text-white border-none cursor-pointer`}
          onClick={() => handleTabChange("sale")}
        >
          For Sale
        </button>
      </div>

      <div className="gap-x-1.5 flex md:flex-row flex-col items-center justify-center gap-y-1.5">
        <div className="flex flex-col gap-y-0.5 relative w-full">
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="bg-gray-100/85 border border-b-2 px-2 relative w-full py-4 shadow-sm
             focus:ring-0 focus:border-0"
          >
            <option value="">City</option>
            {locations?.map((location, idx) => (
              <option value={location.id} key={idx}>
                {location.county}, {location.city}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-y-0.5 relative w-full">
          <select
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
            className="bg-gray-100/85 border border-b-2 px-2 relative w-full py-4 shadow-sm
             focus:ring-0 focus:border-0"
          >
            <option value="">Type</option>
            {propertyTypes?.map((type, idx) => (
              <option value={type.id} key={idx}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

         <div className="flex flex-col gap-y-0.5 relative w-full">
          <input
            className="bg-gray-100/85 border border-b-2 px-2 relative w-full py-4 shadow-sm
             focus:ring-0 focus:border-0 text-neutral-900 font-semibold"
            placeholder="min price"
            value={minPrice}
            onChange={(e) => {
            const value = e.target.value;
            // Remove all non-digit characters
            const numericValue = value.replace(/[^0-9]/g, "");
            setMinPrice(numericValue);
            }}
          />
          </div>
        <div className="flex flex-col gap-y-0.5 relative w-full">
        <input
            className="bg-gray-100/85 border border-b-2 px-2 relative w-full py-4 shadow-sm
             focus:ring-0 focus:border-0 text-neutral-900 font-semibold"
            placeholder="max price"
            value={maxPrice}
            onChange={(e) => {
            const value = e.target.value;
            // Remove all non-digit characters
            const numericValue = value.replace(/[^0-9]/g, "");
            setMaxPrice(numericValue);
            }}
          />
        </div>

        <div className="flex flex-col gap-y-0.5 relative w-full">
          <button
            className=" px-2 py-3.5 shadow-sm border-b-2 bg-accent-deepNavy
              active:border-b-0 flex items-center gap-x-2 relative w-full justify-center font-semibold"
            onClick={onSearch}
          >
            <SearchIcon className="size-4 text-neutral-50" />
            <span className="font-semibold text-white">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};
