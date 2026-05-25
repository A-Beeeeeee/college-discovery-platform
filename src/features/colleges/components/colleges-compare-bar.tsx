"use client";

import Link from "next/link";
import { GitCompare } from "lucide-react";
import { useCompare } from "@/hooks/use-compare";
import { Button } from "@/components/ui/button";

export function CollegesCompareBar() {
  const { slugs } = useCompare();

  if (slugs.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
      <span className="text-sm text-blue-800">
        <GitCompare className="mr-1 inline h-4 w-4" aria-hidden />
        {slugs.length} college{slugs.length > 1 ? "s" : ""} selected for compare
      </span>
      <Link href="/compare">
        <Button size="sm">View comparison</Button>
      </Link>
    </div>
  );
}
