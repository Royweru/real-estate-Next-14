/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LocationWithListingsProps } from "@/features/listings/types";
import React, { useState } from "react";
import { useMedia } from "react-use";

export const CitiesGrid = ({
  data,
}: {
  data:LocationWithListingsProps[] |null
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useMedia("(max-width: 540px)");
  if(!data){
    return
  }
  const itemsPerPage = isMobile ? 2 : 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the current items to display
  const currentItems = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleDotClick = (index: any) => {
    setCurrentPage(index);
  };

  return (
    <>
      <div className=" md:grid-cols-3 sm:grid-cols-2 gap-1 md:gap-1.5 grid h-full w-full ">
        {currentItems.map((item, idx) => (
          <div
            className="
           col-span-1 shadow-sm cursor-pointer hover:scale-105 
           transition-transform duration-300
          "
            key={idx}
          >
            <div
              className=" relative w-full h-full min-h-[400px] bg-center bg-cover "
              style={{
                backgroundImage: `url(${item.properties[0]?.images[0]?.url})`,
              }}
            >
              <div className=" inset-0 bg-gradient-to-t from-black/50 to-transparent absolute"></div>
              <div className=" relative h-full flex flex-col gap-y-1.5 items-start justify-end lg:p-6 p-4
              ">
                <div className="  flex flex-col gap-y-1.5">
                  <h4 className=" font-semibold md:text-2xl text-xl font-nunito text-white ">
                    {item?.city}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 w-3 rounded-full ${
              currentPage === index ? "bg-blue-600" : "bg-neutral-500/75"
            } transition-colors duration-300`}
          />
        ))}
      </div>
    </>
  );
};
