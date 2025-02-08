import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";
import { ListingType } from "../types";
import { MediaSection } from "./media-section";
import { CheckCircleIcon } from "lucide-react";

export const ListingManagementBasicInfo = ({ data }: { data: ListingType }) => {
  if (!data) return <div className=" font-bold">No data</div>;
  return (
    <div className=" w-full h-full relative space-y-2">
      <Card>
        <CardHeader>
          <CardTitle className=" text-lg font-semibold">
            Basic infomation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" grid sm:grid-cols-2 gap-3 relative w-full">
            <div className=" bg-neutral-100/75 shadow-sm col-span-1 rounded-md p-4">
              <div className=" flex flex-col items-center justify-center gap-2 ">
                <p className=" text-base font-normal text-black">
                  Current status
                </p>
                <div className=" flex justify-center items-center gap-x-2">
                  <div
                    className={` p-1.5 rounded-full ${
                      data.status.name === "Active"
                        ? "bg-emerald-400"
                        : data.status.name === "Pending"
                        ? "bg-sky-400"
                        : "bg-rose-500"
                    }`}
                  />

                  <h4
                    className={` font-semibold text-lg ${
                      data.status.name === "Active"
                        ? "text-emerald-400"
                        : data.status.name === "Pending"
                        ? "text-sky-400"
                        : "text-rose-500"
                    }`}
                  >
                    {data.status.name}
                  </h4>
                </div>
              </div>
            </div>
            <div className=" bg-neutral-100/75 shadow-sm col-span-1 rounded-md p-4">
              <div className=" flex flex-col items-center justify-center gap-2 ">
                <p className=" text-base font-normal text-black">
                  Property Type
                </p>
                <div>
                  <h4 className={` font-semibold text-lg text-neutral-800/95`}>
                    {data.type.name}
                  </h4>
                </div>
              </div>
            </div>
            <div className=" bg-neutral-100/75 shadow-sm col-span-1 rounded-md p-4">
              <div className=" flex flex-col items-center justify-center gap-2 ">
                <p className=" text-base font-normal text-black">Category</p>
                <div>
                  <h4 className={` font-semibold text-lg text-neutral-800/95`}>
                    {data.category.name}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className=" mt-4 relative w-full">
            <div className=" grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 w-full lg:px-3.5 px-2">
              <div className=" flex flex-col items-center gap-y-0.5 shadow-sm rounded-md bg-slate-50">
                <h5 className=" text-base text-neutral-800/95 font-normal italic font-mono">
                  Bedrooms
                </h5>
                <p className=" text-xl font-semibold text-zinc-950">
                  {data.bedrooms}
                </p>
              </div>
              <div className=" flex flex-col items-center gap-y-0.5 shadow-sm rounded-md bg-slate-50">
                <h5 className=" text-base text-neutral-800/95 font-normal italic font-mono">
                  Bathrooms
                </h5>
                <p className=" text-xl font-semibold text-zinc-950">
                  {data.bathrooms}
                </p>
              </div>
              <div className=" flex flex-col items-center gap-y-0.5 shadow-sm rounded-md bg-slate-50">
                <h5 className=" text-base text-neutral-800/95 font-normal italic font-mono">
                  Area (square metre)
                </h5>
                <p className=" text-xl font-semibold text-zinc-950">
                  {data.area}
                </p>
              </div>
              <div className=" flex flex-col items-center gap-y-0.5 shadow-sm rounded-md bg-slate-50">
                <h5 className=" text-base text-neutral-800/95 font-normal italic font-mono">
                  Current price
                </h5>
                <p className=" text-xl font-semibold text-zinc-950">
                  {data.priceType === "purchase"
                    ? data.purchasePrice.toLocaleString("en")
                    : data.rentalPrice.toLocaleString("en")}
                </p>
              </div>
            </div>
          </div>

          <div className=" mt-4 w-full relative">
            <h3 className=" text-xl font-semibold text-stone-800/85 my-2">
              Amenities
            </h3>
            <div className=" w-full grid md:grid-cols-3 grid-cols-2 gap-4">
              {data.amenities?.map((amenity) => (
                <div
                  key={amenity.id}
                  className=" col-span-1 relative flex items-center justify-center gap-x-1.5"
                >
                  <CheckCircleIcon className=" size-3.5 font-bold text-neutral-900/85" />
                  <span className=" italic">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className=" h-full w-full">
        <CardHeader>
          <CardTitle className=" text-lg font-semibold">Media</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaSection data={data} />
        </CardContent>
      </Card>
    </div>
  );
};
