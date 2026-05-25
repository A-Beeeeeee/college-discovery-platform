"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
}

export function Pagination({ page, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    return `${pathname}?${params.toString()}`;
  };

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (page <= 3) return i + 1;
    if (page >= totalPages - 2) return totalPages - 4 + i;
    return page - 2 + i;
  });

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      {page > 1 ? (
        <Link
          href={createPageUrl(page - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 hover:bg-slate-50"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 opacity-50">
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={createPageUrl(p)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium",
            p === page
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          )}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </Link>
      ))}

      {page < totalPages ? (
        <Link
          href={createPageUrl(page + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 hover:bg-slate-50"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 opacity-50">
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
