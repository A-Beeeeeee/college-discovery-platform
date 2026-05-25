import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CollegeListItem } from "@/types";
import { formatCurrency, formatRating } from "@/lib/utils";

const typeLabels = {
  GOVERNMENT: "Government",
  PRIVATE: "Private",
  DEEMED: "Deemed",
} as const;

interface CollegeCardProps {
  college: CollegeListItem;
  showCompare?: boolean;
  onAddCompare?: (slug: string) => void;
}

export function CollegeCard({ college, showCompare, onAddCompare }: CollegeCardProps) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative h-36 bg-gradient-to-br from-blue-50 to-slate-100">
        {college.coverImageUrl && (
          <Image
            src={college.coverImageUrl}
            alt=""
            fill
            className="object-cover opacity-60"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        {college.logoUrl && (
          <div className="absolute bottom-3 left-3 h-12 w-12 overflow-hidden rounded-lg border-2 border-white bg-white shadow">
            <Image src={college.logoUrl} alt="" width={48} height={48} className="object-cover" />
          </div>
        )}
      </div>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/colleges/${college.slug}`}>
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 line-clamp-2">
                {college.shortName ?? college.name}
              </h3>
            </Link>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {college.city}, {college.state}
            </p>
          </div>
          <Badge variant="secondary">{typeLabels[college.type]}</Badge>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="flex items-center gap-1 font-medium text-amber-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
            {formatRating(college.avgRating)}
            <span className="font-normal text-slate-500">({college.reviewCount})</span>
          </span>
          {college.minFees != null && (
            <span className="flex items-center gap-1 text-slate-600">
              <IndianRupee className="h-3.5 w-3.5" aria-hidden />
              from {formatCurrency(college.minFees)}/yr
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/colleges/${college.slug}`}
            className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
          >
            View details
          </Link>
          {showCompare && onAddCompare && (
            <button
              type="button"
              onClick={() => onAddCompare(college.slug)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Compare
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
