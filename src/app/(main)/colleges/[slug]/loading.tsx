import { Skeleton } from "@/components/ui/skeleton";

export default function CollegeDetailLoading() {
  return (
    <div>
      <Skeleton className="h-64 w-full" />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Skeleton className="h-10 w-96" />
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    </div>
  );
}
