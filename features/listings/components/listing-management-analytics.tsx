"use client"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import React from "react"

const dummyData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 600 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
  { name: "May", value: 300 },
  { name: "Jun", value: 900 },
]
const metrics = [
  { label: "Views", value: "13,000" },
  { label: "Total earnings", value: "Kes 2,504,332" },
  { label: "Inquiries", value: "3,000" },
]

export const ListingManagementAnalytics = () => {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{metric.label}</p>
            <p className="text-xl font-semibold text-stone-900">{metric.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-stone-900">Views over time</h2>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Monthly</p>
        </div>
        <div className="mt-3 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dummyData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#0caaff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
