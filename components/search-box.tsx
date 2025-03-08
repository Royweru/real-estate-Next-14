"use client";

import React, { useState } from "react";
import qs from 'query-string'
// import { SelectHeader } from './select-header'
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
  const router = useRouter()
  const [categoryId, setCategoryId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [typeId, setTypeId] = useState("");

  const onSearch = ()=>{
    const updatedQuery = {
      categoryId,
      locationId,
      typeId
    }
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

  }
  return (
    <div
      className="  bg-neutral-100/90 shadow-sm gap-x-1.5 flex items-center justify-center
     px-2 py-4 md:px-6 w-full mx-2 md:mx-0 md:w-[700px] lg:w-[850px] relative"
    >
      <div className=" flex flex-col relative w-full">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className=" bg-gray-100/85 border border-b-2 px-2  relative w-full py-4
             focus:ring-0 focus:border-0 shadow-sm "
        >
          <option value={""} selected>
            Choose category
          </option>
          {categories?.map((category, idx) => (
            <option value={category.id} key={idx}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className=" flex flex-col gap-y-0.5 relative w-full">
        <select
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
          className=" bg-gray-100/85 border border-b-2 px-2  relative w-full py-4 shadow-sm
             focus:ring-0 focus:border-0 "
        >
          <option value={""} selected>
            Choose location
          </option>
          {locations?.map((location, idx) => (
            <option value={location.id} key={idx}>
              {location.county} , {location.city}
            </option>
          ))}
        </select>
      </div>

      <div className=" flex flex-col gap-y-0.5 relative w-full">
        <select
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          className=" bg-gray-100/85 border border-b-2 px-2  relative w-full py-4 shadow-sm
             focus:ring-0 focus:border-0 "
        >
          <option value={""} selected>
            Choose type
          </option>
          {propertyTypes?.map((type, idx) => (
            <option value={type.id} key={idx}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className=" flex flex-col gap-y-0.5 relative w-full">
        <button
          className=" bg-neutral-100/90 px-2 py-4 shadow-sm  border-b-2 
          active:border-b-0 flex items-center gap-x-2 relative w-full justify-center font-semibold"
        >
          <SearchIcon className=" size-5 text-slate-500" />
          <span className=" font-semibold text-neutral-950/75"
           onClick={onSearch}
          >Search</span>
        </button>
      </div>
    </div>
  );
};
