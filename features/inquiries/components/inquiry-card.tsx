"use client"
import { Inquiry } from "@prisma/client"
import React from "react"

export const InquiryCard = ({ data }: { data: Inquiry }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Lead</p>
          <h4 className="text-lg font-semibold text-stone-900">{data.name}</h4>
          <p className="text-sm text-neutral-600">{data.email}</p>
          {data.phone && <p className="text-sm text-neutral-600">{data.phone}</p>}
        </div>
        <div className="flex flex-col gap-1 text-sm text-neutral-500">
          <span className="font-semibold text-sm text-stone-900">Message</span>
          <p className="text-sm leading-relaxed text-neutral-600">{data.message || "No message provided."}</p>
        </div>
      </div>
    </div>
  )
}
