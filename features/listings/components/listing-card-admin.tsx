"use client";
import {
  Amenity,
  Category,
  Image as ImageType,
  Listing,
  Location,
  Status,
} from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
const statusTone = {
  Active: "bg-emerald-100 text-emerald-600",
  Pending: "bg-amber-100 text-amber-600",
  Closed: "bg-rose-100 text-rose-600",
};

export const ListingCardAdmin = ({
  data,
}: {
  data: Listing & {
    images: ImageType[];
    amenities: Amenity[];
    status: Status | null;
    location: Location;
    category: Category;
  };
}) => {
  const router = useRouter();
  const statusName = data.status?.name ?? "Pending";
  const statusStyles = statusTone[statusName as keyof typeof statusTone] ??
    "bg-slate-100 text-slate-700";
  const price = data.purchasePrice
    ? data.purchasePrice.toLocaleString("en")
    : data.rentalPrice
    ? data.rentalPrice.toLocaleString("en")
    : "N/A";
  const priceLabel = data.priceType === "purchase" ? "Sale" : "Rent";

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-stone-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5 focus-within:shadow-lg"
      tabIndex={0}
      role="button"
      onClick={() =>
        router.push(`/management/properties/${data.id}/dashboard/listing`)
      }
    >
      <div className="relative h-52 w-full">
        {data.images[0]?.url ? (
          <Image
            src={data.images[0].url}
            alt={data.title}
            fill
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100" />
        )}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles}`}
        >
          {statusName}
        </span>
        <span className="absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-900">
          {priceLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="text-lg font-semibold leading-tight">{data.title}</p>
          <p className="text-sm text-neutral-500">
            {data.location.county}, {data.location.city}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-stone-900">Kes {price}</p>
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {data.bedrooms} bd · {data.bathrooms} ba · {data.area} m²
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-neutral-600">
          {data.description ?? "No description available."}
        </p>
      </div>
    </div>
  );
};
