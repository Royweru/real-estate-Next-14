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
import {
  BedDouble,
  Bath,
  Ruler,
  Images,
  Video,
  MoreVertical,
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import axios from "axios";
import { toast } from "sonner";

const statusTone: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
  Pending: "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
  Rejected: "bg-rose-50 text-rose-600 ring-1 ring-rose-200",
  Closed: "bg-slate-50 text-slate-600 ring-1 ring-slate-200",
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
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete listing",
    "This action cannot be undone. The listing and all its images will be permanently removed.",
    "destructive"
  );

  const statusName = data.status?.name ?? "Pending";
  const statusStyles = statusTone[statusName] ?? "bg-slate-50 text-slate-600 ring-1 ring-slate-200";
  const price = data.purchasePrice
    ? data.purchasePrice.toLocaleString("en")
    : data.rentalPrice
    ? data.rentalPrice.toLocaleString("en")
    : "N/A";
  const priceLabel = data.priceType === "purchase" ? "For Sale" : "For Rent";
  const imageCount = data.images.length;
  const hasVideo = !!data.videoUrl;

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    try {
      await axios.delete(`/api/listings/delete/${data.id}`);
      toast.success("Listing deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete listing");
    }
  };

  return (
    <>
      <ConfirmDialog />
      <div
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-stone-900 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        tabIndex={0}
        role="button"
        onClick={() =>
          router.push(`/management/properties/${data.id}/dashboard/listing`)
        }
      >
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          {data.images[0]?.url ? (
            <Image
              src={data.images[0].url}
              alt={data.title}
              fill
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-200 to-slate-100" />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {/* Status badge */}
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles}`}
          >
            {statusName}
          </span>

          {/* Badges row */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            {imageCount > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                <Images className="h-3 w-3" />
                {imageCount}
              </span>
            )}
            {hasVideo && (
              <span className="flex items-center gap-1 rounded-full bg-violet-600/80 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                <Video className="h-3 w-3" />
              </span>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute bottom-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition hover:bg-white"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/listing/${data.id}`);
                  }}
                  className="gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Edit listing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/listings/${data.id}/view`);
                  }}
                  className="gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View public page
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="gap-2 text-rose-600 focus:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete listing
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Price label */}
          <span className="absolute right-3 bottom-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-stone-900 backdrop-blur-sm">
            {priceLabel}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div>
            <p className="text-base font-semibold leading-tight text-stone-900 line-clamp-1">
              {data.title}
            </p>
            <p className="mt-0.5 text-sm text-slate-500">
              {data.location.county}, {data.location.city}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-stone-900">KES {price}</p>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5" />
              {data.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {data.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Ruler className="h-3.5 w-3.5" />
              {data.area} m²
            </span>
          </div>

          <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
            {data.description ?? "No description provided."}
          </p>
        </div>
      </div>
    </>
  );
};
