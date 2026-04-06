"use client"
import { Category, Status, Type } from '@prisma/client'
import { SearchIcon, X, ArrowUpDown } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useFiltersPropertiesAdmin } from '../hooks/use-filters-admin'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type SortOption = "newest" | "oldest" | "price-high" | "price-low" | "title-az" | "title-za"

interface PropertiesManagementFilterProps {
  categories: Category[]
  propertyTypes: Type[]
  status: Status[]
  locations: { id: string; county: string; city: string }[]
}

export const PropertiesManagementFilter = ({
  categories,
  propertyTypes,
  status,
  locations
}: PropertiesManagementFilterProps) => {
  const [filters, setFilters] = useFiltersPropertiesAdmin()
  const [titleSearch, setTitleSearch] = useState(filters.title || "")
  const [sort, setSort] = useState<SortOption>((filters.sort as SortOption) || "newest")
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (filters.title) setTitleSearch(filters.title)
    if (filters.sort) setSort(filters.sort as SortOption)
    if (filters.categoryId || filters.typeId || filters.statusId || filters.locationId) {
      setIsExpanded(true)
    }
  }, [])

  const activeFilterCount = [
    filters.typeId,
    filters.statusId,
    filters.locationId,
    filters.categoryId,
    filters.title
  ].filter(Boolean).length

  const handleSearch = () => {
    setFilters({
      title: titleSearch || null,
      typeId: filters.typeId || null,
      locationId: filters.locationId || null,
      categoryId: filters.categoryId || null,
      statusId: filters.statusId || null,
      sort: sort || null,
    })
  }

  const handleReset = () => {
    setFilters({
      title: null,
      typeId: null,
      locationId: null,
      categoryId: null,
      statusId: null,
      sort: null,
    })
    setTitleSearch("")
    setSort("newest")
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-3">
      {/* Top bar: search + sort + toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by property title..."
            value={titleSearch}
            onChange={(e) => setTitleSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="h-11 rounded-xl border-slate-200 bg-white pl-10 pr-10 text-sm shadow-sm focus:border-violet-400 focus:ring-violet-200"
          />
          {titleSearch && (
            <button
              type="button"
              onClick={() => {
                setTitleSearch("")
                setFilters({ title: null })
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Sort</span>
            <Select
              value={sort}
              onValueChange={(v) => {
                setSort(v as SortOption)
                setFilters({ sort: v })
              }}
            >
              <SelectTrigger className="h-11 w-[160px] rounded-xl border-slate-200 bg-white text-sm shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="price-high">Price: High → Low</SelectItem>
                <SelectItem value="price-low">Price: Low → High</SelectItem>
                <SelectItem value="title-az">Title: A → Z</SelectItem>
                <SelectItem value="title-za">Title: Z → A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition",
              isExpanded || activeFilterCount > 0
                ? "border-violet-300 bg-violet-50 text-violet-700"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            <ArrowUpDown className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expanded filter panel */}
      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Select
              value={filters.categoryId || ""}
              onValueChange={(v) => setFilters({ categoryId: v || null })}
            >
              <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50 text-sm">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.typeId || ""}
              onValueChange={(v) => setFilters({ typeId: v || null })}
            >
              <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50 text-sm">
                <SelectValue placeholder="Property type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.statusId || ""}
              onValueChange={(v) => setFilters({ statusId: v || null })}
            >
              <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {status.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.locationId || ""}
              onValueChange={(v) => setFilters({ locationId: v || null })}
            >
              <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50 text-sm">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.id} value={loc.id}>
                    {loc.county}, {loc.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <X className="h-3.5 w-3.5" />
              Reset all
            </button>
            <button
              type="button"
              onClick={handleSearch}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              <SearchIcon className="h-4 w-4" />
              Apply filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
