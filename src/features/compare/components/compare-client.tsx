"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GitCompare, X } from "lucide-react";
import { useCompare } from "@/hooks/use-compare";
import { CompareTable } from "./compare-table";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/shared/error-boundary";

export function CompareClient() {
  const { slugs, remove, clear } = useCompare();
  const [colleges, setColleges] = useState<unknown[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slugs.length < 2) {
      setColleges(null);
      return;
    }

    setLoading(true);
    setError(null);
    fetch(`/api/colleges/compare?slugs=${slugs.join(",")}`)
      .then((res) => res.json())
      .then((json) => {
        if (!json.success) throw new Error(json.error);
        setColleges(json.data);
      })
      .catch((e) => setError(e.message ?? "Failed to load"))
      .finally(() => setLoading(false));
  }, [slugs]);

  if (slugs.length === 0) {
    return (
      <EmptyState
        icon={GitCompare}
        title="No colleges selected"
        description="Browse colleges and click Compare to add up to 3 institutions side by side."
        actionLabel="Browse colleges"
        actionHref="/colleges"
      />
    );
  }

  if (slugs.length < 2) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="text-sm text-amber-800">
          Add at least one more college to compare. Selected: {slugs.join(", ")}
        </p>
        <Link href="/colleges" className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
          Browse colleges
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {slugs.map((slug) => (
          <span
            key={slug}
            className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
          >
            {slug}
            <button
              type="button"
              onClick={() => remove(slug)}
              className="rounded-full p-0.5 hover:bg-blue-200"
              aria-label={`Remove ${slug}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        <Button variant="outline" size="sm" onClick={clear}>
          Clear all
        </Button>
      </div>

      <ErrorBoundary>
        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        )}
        {error && (
          <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
        {colleges && !loading && (
          <CompareTable colleges={colleges as Parameters<typeof CompareTable>[0]["colleges"]} />
        )}
      </ErrorBoundary>
    </div>
  );
}
