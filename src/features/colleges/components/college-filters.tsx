"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface CollegeFiltersProps {
  states: string[];
  current: {
    q?: string;
    state?: string;
    type?: string;
    sort?: string;
    minRating?: string;
  };
}

export function CollegeFilters({ states, current }: CollegeFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      params.delete("page");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, searchParams]
  );

  const clearFilters = () => {
    startTransition(() => router.push(pathname));
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-20">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <SlidersHorizontal className="h-4 w-4" aria-hidden />
        Filters
        {isPending && <span className="text-xs font-normal text-slate-500">Updating…</span>}
      </div>

      <div>
        <label htmlFor="search" className="mb-1 block text-xs font-medium text-slate-600">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <Input
            id="search"
            placeholder="Name, city, state…"
            className="pl-9"
            defaultValue={current.q ?? ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateParams({ q: (e.target as HTMLInputElement).value || undefined });
              }
            }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="state" className="mb-1 block text-xs font-medium text-slate-600">
          State
        </label>
        <Select
          id="state"
          value={current.state ?? ""}
          onChange={(e) => updateParams({ state: e.target.value || undefined })}
        >
          <option value="">All states</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor="type" className="mb-1 block text-xs font-medium text-slate-600">
          College type
        </label>
        <Select
          id="type"
          value={current.type ?? ""}
          onChange={(e) => updateParams({ type: e.target.value || undefined })}
        >
          <option value="">All types</option>
          <option value="GOVERNMENT">Government</option>
          <option value="PRIVATE">Private</option>
          <option value="DEEMED">Deemed</option>
        </Select>
      </div>

      <div>
        <label htmlFor="sort" className="mb-1 block text-xs font-medium text-slate-600">
          Sort by
        </label>
        <Select
          id="sort"
          value={current.sort ?? "rating"}
          onChange={(e) => updateParams({ sort: e.target.value })}
        >
          <option value="rating">Highest rated</option>
          <option value="reviews">Most reviewed</option>
          <option value="name">Name (A–Z)</option>
          <option value="newest">Newest</option>
        </Select>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear filters
      </Button>
    </div>
  );
}
