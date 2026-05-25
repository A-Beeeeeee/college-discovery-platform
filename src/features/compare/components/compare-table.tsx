import { MapPin, Star, IndianRupee, Briefcase } from "lucide-react";
import { formatCurrency, formatRating } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type CompareCollege = {
  slug: string;
  name: string;
  shortName: string | null;
  city: string;
  state: string;
  type: string;
  avgRating: number;
  reviewCount: number;
  established: number | null;
  fees: { label: string; amount: number; category: string }[];
  placements: {
    year: number;
    averagePackage: number | null;
    highestPackage: number | null;
    placementRate: number | null;
    topRecruiters: string[];
  }[];
  courses: { name: string; degree: string; feesPerYear: number }[];
};

const typeLabels: Record<string, string> = {
  GOVERNMENT: "Government",
  PRIVATE: "Private",
  DEEMED: "Deemed",
};

interface CompareTableProps {
  colleges: CompareCollege[];
}

export function CompareTable({ colleges }: CompareTableProps) {
  const rows = [
    {
      label: "Location",
      render: (c: CompareCollege) => (
        <span className="flex items-center gap-1 text-sm">
          <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden />
          {c.city}, {c.state}
        </span>
      ),
    },
    {
      label: "Type",
      render: (c: CompareCollege) => (
        <Badge variant="secondary">{typeLabels[c.type] ?? c.type}</Badge>
      ),
    },
    {
      label: "Rating",
      render: (c: CompareCollege) => (
        <span className="flex items-center gap-1 font-medium text-amber-600">
          <Star className="h-4 w-4 fill-amber-400" aria-hidden />
          {formatRating(c.avgRating)} ({c.reviewCount} reviews)
        </span>
      ),
    },
    {
      label: "Established",
      render: (c: CompareCollege) => c.established ?? "—",
    },
    {
      label: "Tuition (from)",
      render: (c: CompareCollege) => {
        const tuition = c.fees.find((f) => f.category === "TUITION");
        return tuition ? (
          <span className="flex items-center gap-1">
            <IndianRupee className="h-3.5 w-3.5" aria-hidden />
            {formatCurrency(tuition.amount)}/yr
          </span>
        ) : (
          "—"
        );
      },
    },
    {
      label: "Avg. placement package",
      render: (c: CompareCollege) => {
        const p = c.placements[0];
        return p?.averagePackage ? (
          <span className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5 text-slate-400" aria-hidden />
            {p.averagePackage} LPA
          </span>
        ) : (
          "—"
        );
      },
    },
    {
      label: "Placement rate",
      render: (c: CompareCollege) => {
        const p = c.placements[0];
        return p?.placementRate ? `${p.placementRate}%` : "—";
      },
    },
    {
      label: "Top recruiters",
      render: (c: CompareCollege) => {
        const recruiters = c.placements[0]?.topRecruiters ?? [];
        return (
          <span className="text-sm text-slate-600">
            {recruiters.slice(0, 3).join(", ") || "—"}
          </span>
        );
      },
    },
    {
      label: "Popular courses",
      render: (c: CompareCollege) => (
        <ul className="space-y-1 text-sm text-slate-600">
          {c.courses.slice(0, 2).map((course) => (
            <li key={course.name}>
              {course.degree} — {formatCurrency(course.feesPerYear)}/yr
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="p-4 text-sm font-semibold text-slate-500 w-40">Criteria</th>
            {colleges.map((c) => (
              <th key={c.slug} className="p-4 text-sm font-semibold text-slate-900 min-w-[180px]">
                {c.shortName ?? c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-slate-100 last:border-0">
              <td className="p-4 text-sm font-medium text-slate-600">{row.label}</td>
              {colleges.map((c) => (
                <td key={c.slug} className="p-4 text-sm text-slate-800">
                  {row.render(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
