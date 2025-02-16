/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import qs from 'query-string'
import { Category, Location, Status, Type } from "@prisma/client";
import { Label } from "./ui/label";
import { useFiltersPropertiesAdmin } from "@/features/listings/hooks/use-filters-admin";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export const revalidate = 0;
export const SearchFilters = ({
  locations,
  status,
  categories,
  propertyTypes,
}: {
  locations: Location[];
  status: Status[];
  categories: Category[];
  propertyTypes: Type[];
}) => {
  const router = useRouter();
  const searchParams  = useSearchParams()
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const [minBedrooms, setMinBedrooms] = useState<number | "">("");
  const [maxBedrooms, setMaxBedrooms] = useState<number | "">("");

  const [minBathrooms, setMinBathrooms] = useState<number | "">("");
  const [maxBathrooms, setMaxBathrooms] = useState<number | "">("");

  const [locationId, setLocationId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [typeId, setTypeId] = useState<string>("");



  const handleSearch = () => {
   
    let query:any = {}
    const currentSearchParams = qs.parse(searchParams.toString())

    query = {
      ...currentSearchParams,
      minPrice: minPrice !== "" ? minPrice : undefined,
      maxPrice: maxPrice !== "" ? maxPrice : undefined,
      minBedrooms: minBedrooms !== "" ? minBedrooms: undefined,
      maxBedrooms: maxBedrooms!== "" ? maxBedrooms : undefined,
      minBathrooms: minBathrooms !== "" ? minBathrooms: undefined,
      maxBathrooms: maxBathrooms !== "" ? maxBathrooms : undefined,
      locationId,
     categoryId,
      typeId,
    }
  
  if(searchParams.get('typeId') ===typeId){
    delete query.typeId
  }
  
  if(searchParams.get('locationId') ===locationId){
    delete query.locationId
  }
  
  if(searchParams.get('categoryId') ===categoryId){
    delete query.categoryId
  }

//     const filters: any = {
//       minPrice: minPrice !== "" ? minPrice : undefined,
//       maxPrice: maxPrice !== "" ? maxPrice : undefined,
//       minBedrooms: minBedrooms !== "" ? minBedrooms: undefined,
//       maxBedrooms: maxBedrooms!== "" ? maxBedrooms : undefined,
//       minBathrooms: minBathrooms !== "" ? minBathrooms: undefined,
//       maxBathrooms: maxBathrooms !== "" ? maxBathrooms : undefined,
//       locationId,
//      categoryId,
//       typeId,
      
//     };

//     // Remove undefined properties from filters and ensure values are strings
//     const currentParams = new URLSearchParams(window.location.search);

// // Merge existing params with new filters, replacing previous values
// Object.entries(filters)
//   .filter(([_, v]) => v !== undefined) // Remove undefined values
//   .forEach(([k, v]) => currentParams.set(k, String(v))); // Replace existing value or add new

// // Construct the updated query string
// const newQuery = currentParams.toString();

// if (newQuery) {
//   window.location.href = `/browse?${newQuery}`;
// } else {
//   console.error("No valid filters provided for search.");
// }

  const url = qs.stringifyUrl({
    url:window.location.href,
    query:query
  },{
    skipEmptyString:true,
    skipNull:true
  })
  router.push(url)
  };

  return (
    <div
     className=" relative w-full"
    >
          <div className=" flex justify-end">
        <Button
          variant="outline"
          className="mb-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
       <div  className={`md:gap-4 gap-2 transition-all ${
          isOpen ? "grid" : "hidden"
        } `}>

<div 
className="grid grid-cols-1 md:grid-cols-2 gap-4"

>
  <div className="flex flex-col gap-y-0.5">
    <Label className="mb-1 text-sm">Location</Label>
    <select
      value={locationId}
      onChange={(e) => setLocationId(e.target.value)}
      className="bg-gray-100/85 border border-neutral-300 px-2 py-3 rounded-md"
    >
      <option value="">All Locations</option>
      {locations.map((location, idx) => (
        <option key={idx} value={location.id}>
          {location.county}, {location.city}
        </option>
      ))}
    </select>
  </div>

  <div className="flex flex-col gap-y-0.5">
    <Label className="mb-1 text-sm">Category</Label>
    <select
      value={categoryId}
      onChange={(e) => setCategoryId(e.target.value)}
      className="bg-gray-100/85 border border-neutral-300 px-2 py-3 rounded-md"
    >
      <option value="">All Categories</option>
      {categories.map((category, idx) => (
        <option key={idx} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  </div>

  <div className="flex flex-col gap-y-0.5">
    <Label className="mb-1 text-sm">Property Type</Label>
    <select
      value={typeId}
      onChange={(e) => setTypeId(e.target.value)}
      className="bg-gray-100/85 border border-neutral-300 px-2 py-3 rounded-md"
    >
      <option value="">All Types</option>
      {propertyTypes.map((type, idx) => (
        <option key={idx} value={type.id}>
          {type.name}
        </option>
      ))}
    </select>
  </div>

  <div className="flex flex-col gap-y-0.5">
    <Label className="mb-1 text-sm">Min Bedrooms</Label>
    <select
      value={minBedrooms}
      onChange={(e) =>
        setMinBedrooms(e.target.value ? Number(e.target.value) : "")
      }
      className="bg-gray-100/85 border border-neutral-300 px-2 py-3 rounded-md"
    >
      <option value="">Any</option>
      {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </div>

  <div className="flex flex-col gap-y-0.5">
    <Label className="mb-1 text-sm">Max Bedrooms</Label>
    <select
      value={maxBedrooms}
      onChange={(e) =>
        setMaxBedrooms(e.target.value ? Number(e.target.value) : "")
      }
      className="bg-gray-100/85 border border-neutral-300 px-2 py-3 rounded-md"
    >
      <option value="">Any</option>
      {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </div> 

  <div className="flex flex-col gap-y-0.5">
    <Label className="mb-1 text-sm">Min Bathrooms</Label>
    <select
      value={minBathrooms}
      onChange={(e) =>
        setMinBathrooms(e.target.value ? Number(e.target.value) : "")
      }
      className="bg-gray-100/85 border border-neutral-300 px-2 py-3 rounded-md"
    >
      <option value="">Any</option>
      {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </div>

  <div className="flex flex-col gap-y-0.5">
    <Label className="mb-1 text-sm">Max Bathrooms</Label>
    <select
      value={maxBathrooms}
      onChange={(e) =>
        setMaxBathrooms(e.target.value ? Number(e.target.value) : "")
      }
      className="bg-gray-100/85 border border-neutral-300 px-2 py-3 rounded-md"
    >
      <option value="">Any</option>
      {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </div>
</div>


<hr className=" h-px bg-neutral-800 text-neutral-800" />

<Label className=" text-sm">Max price</Label>

<Input
  className=" py-4 font-mono"
  placeholder="25000000"
  value={maxPrice}
  onChange={(e) =>
    setMaxPrice(e.target.value ? Number(e.target.value) : "")
  }
/>

<Label className=" text-sm">Min price</Label>

<Input
  className=" py-4 font-mono"
  placeholder="0"
  value={minPrice}
  onChange={(e) =>
    setMinPrice(e.target.value ? Number(e.target.value) : "")
  }
/>

<Button className="w-full" variant={"outline"} onClick={handleSearch}>
  Search
</Button>
</div>
    </div>
 
  );
};
