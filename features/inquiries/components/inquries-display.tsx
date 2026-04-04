"use client"
import { Inquiry } from "@prisma/client"
import React from "react"
import { InquiryCard } from "./inquiry-card"

export const InquiriesDisplay = ({ inquiries }: { inquiries: Inquiry[] }) => {
  if (!inquiries || inquiries.length === 0)
    return (
      <div className="w-full rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Inquiries
        </p>
        <h4 className="mt-4 text-xl font-bold text-stone-900">No inquiries yet</h4>
        <p className="text-sm text-neutral-600">
          Your listings have not received any messages. Share them across your network and watch new leads come in.
        </p>
      </div>
    )
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Recent leads</p>
          <h3 className="text-2xl font-bold text-stone-900">Inquiries</h3>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {inquiries.map((inquiry) => (
          <InquiryCard key={inquiry.id} data={inquiry} />
        ))}
      </div>
    </div>
  )
}
