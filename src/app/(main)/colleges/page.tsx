import { Suspense } from "react";
import { Building2 } from "lucide-react";
import { collegeListQuerySchema } from "@/features/colleges/schemas";
import { getColleges, getFilterOptions } from "@/features/colleges/queries";
import { CollegeCardWrapper } from "@/features/colleges/components/college-card-wrapper";
import { CollegeFilters } from "@/features/colleges/components/college-filters";
import { Pagination } from "@/features/colleges/components/pagination";
import { CollegesCompareBar } from "@/features/colleges/components/colleges-compare-bar";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/shared/error-boundary";

export const metadata = { title: "Browse Colleges" };

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CollegesPage({ searchParams }: PageProps) {
  const raw = await searchParams;
  const params = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
  );
  const query = collegeListQuerySchema.parse(params);

  const [result, filters] = await Promise.all([
    getColleges(query),
    getFilterOptions(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Browse Colleges</h1>
        <p className="mt-2 text-slate-600">
          {result.total} colleges found
          {query.q ? ` for "${query.q}"` : ""}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <CollegeFilters
              states={filters.states}
              current={{
                q: query.q,
                state: query.state,
                type: query.type,
                sort: query.sort,
              }}
            />
          </Suspense>
        </aside>

        <div>
          <CollegesCompareBar />

          <ErrorBoundary>
            {result.items.length === 0 ? (
              <EmptyState
                icon={Building2}
                title="No colleges found"
                description="Try adjusting your filters or search term."
                actionLabel="Clear filters"
                actionHref="/colleges"
              />
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {result.items.map((college) => (
                    <CollegeCardWrapper key={college.id} college={college} showCompare />
                  ))}
                </div>
                <div className="mt-10">
                  <Pagination page={result.page} totalPages={result.totalPages} />
                </div>
              </>
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
