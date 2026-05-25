import { GitCompare } from "lucide-react";
import { CompareClient } from "@/features/compare/components/compare-client";

export const metadata = { title: "Compare Colleges" };

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <GitCompare className="h-8 w-8 text-blue-600" aria-hidden />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Compare Colleges</h1>
          <p className="text-slate-600">Side-by-side comparison of fees, placements, and ratings</p>
        </div>
      </div>
      <CompareClient />
    </div>
  );
}
