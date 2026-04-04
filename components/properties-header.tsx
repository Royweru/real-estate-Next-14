import React from "react"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export const PropertiesHeader = ({
  count,
}: {
  count?: number
}) => {
  return (
    <div className="w-full flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-xl border border-stone-200 bg-white/80 px-5 py-4 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Property Management
        </p>
        <h3 className="text-2xl font-bold text-stone-900">My Properties</h3>
        <p className="text-sm text-neutral-600">
          {count !== undefined
            ? `You currently have ${count} active ${count === 1 ? "property" : "properties"}.`
            : "Stay on top of every listing you control"}
        </p>
      </div>
      <Link
        href="/listing/new"
        className="flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white shadow-lg shadow-sky-500/50 transition hover:bg-sky-600"
      >
        <span>Add property</span>
        <PlusIcon className="size-4" />
      </Link>
    </div>
  )
}
