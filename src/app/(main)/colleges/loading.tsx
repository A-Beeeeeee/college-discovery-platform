import { Skeleton } from "@/components/ui/skeleton";

export default function CollegesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-2 h-5 w-40" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <Skeleton className="h-96" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72" />
          ))}
        </div>
      </div>
    </div>
  );
}
