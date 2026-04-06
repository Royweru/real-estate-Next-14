import { Amenity, Category, Image, Listing, Location, Status } from "@prisma/client";
import { LayoutGrid, CheckCircle2, Clock, XCircle } from "lucide-react";

type PropertyData = (Listing & {
  images: Image[];
  amenities: Amenity[];
  status: Status | null;
  location: Location;
  category: Category;
})[];

const statCards = [
  {
    label: "Total Listings",
    icon: LayoutGrid,
    color: "text-slate-700",
    bg: "bg-slate-100",
    border: "border-slate-200",
    ring: "ring-slate-100",
  },
  {
    label: "Active",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    ring: "ring-emerald-100",
  },
  {
    label: "Pending",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    ring: "ring-amber-100",
  },
  {
    label: "Rejected",
    icon: XCircle,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    ring: "ring-rose-100",
  },
];

export const DashboardStats = ({ properties }: { properties: PropertyData }) => {
  const total = properties.length;
  const active = properties.filter((p) => p.status?.name === "Active").length;
  const pending = properties.filter((p) => p.status?.name === "Pending").length;
  const rejected = properties.filter((p) => p.status?.name === "Rejected").length;

  const counts = [total, active, pending, rejected];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {statCards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`flex items-center gap-3 rounded-2xl border ${card.border} ${card.bg} px-4 py-4 shadow-sm ring-1 ${card.ring} transition hover:shadow-md`}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.bg} ${card.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                {card.label}
              </p>
              <p className={`text-xl font-bold ${card.color}`}>{counts[i]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
