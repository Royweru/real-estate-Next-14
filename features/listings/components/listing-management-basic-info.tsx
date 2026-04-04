import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListingType } from "../types";
import { MediaSection } from "./media-section-admin";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const metricStyles = "rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center";

export const ListingManagementBasicInfo = ({ data }: { data: ListingType }) => {
  if (!data) return <div className="font-bold">No data</div>;

  return (
    <div className="w-full space-y-5">
      <Card className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <CardTitle className="text-xl font-bold">Property overview</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/listing/${data.id}`}>
              Edit Listing
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-5 pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-1 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Status</p>
              <p className="text-lg font-semibold text-emerald-700">{data.status.name}</p>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Type</p>
              <p className="text-lg font-semibold text-stone-900">{data.type.name}</p>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Category</p>
              <p className="text-lg font-semibold text-stone-900">{data.category.name}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className={metricStyles}>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Bedrooms</p>
              <p className="text-2xl font-bold text-stone-900">{data.bedrooms}</p>
            </div>
            <div className={metricStyles}>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Bathrooms</p>
              <p className="text-2xl font-bold text-stone-900">{data.bathrooms}</p>
            </div>
            <div className={metricStyles}>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Area (m²)</p>
              <p className="text-2xl font-bold text-stone-900">{data.area}</p>
            </div>
            <div className={metricStyles}>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Price</p>
              <p className="text-2xl font-bold text-stone-900">
                {data.priceType === "purchase"
                  ? `Kes ${data.purchasePrice?.toLocaleString("en") ?? "-"}`
                  : `Kes ${data.rentalPrice?.toLocaleString("en") ?? "-"}`}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Location</p>
              <p className="text-sm font-medium text-stone-900">
                {data.location?.city ? `${data.location.county}, ${data.location.city}` : "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Description</p>
            <p className="text-sm text-stone-900 leading-relaxed whitespace-pre-wrap">
              {data.description || "No description provided."}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Amenities
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.amenities?.map((amenity) => (
                <span
                  key={amenity.id}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-neutral-600"
                >
                  {amenity.name}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-bold">Media & assets</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaSection data={data} />
        </CardContent>
      </Card>
    </div>
  )
}
