import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Globe, Calendar, Users, Award } from "lucide-react";
import { getCollegeBySlug } from "@/features/colleges/queries";
import { SaveCollegeButton } from "@/features/saved/components/save-college-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatRating } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

const typeLabels = { GOVERNMENT: "Government", PRIVATE: "Private", DEEMED: "Deemed" };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const college = await getCollegeBySlug(slug);
  return { title: college?.shortName ?? college?.name ?? "College" };
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const college = await getCollegeBySlug(slug);

  if (!college) notFound();

  const latestPlacement = college.placements[0];

  return (
    <div>
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-slate-200 sm:h-64">
        {college.coverImageUrl && (
          <Image src={college.coverImageUrl} alt="" fill className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            {college.logoUrl && (
              <div className="h-20 w-20 overflow-hidden rounded-xl border-4 border-white bg-white shadow-lg">
                <Image src={college.logoUrl} alt="" width={80} height={80} />
              </div>
            )}
            <div className="pb-2">
              <Badge className="mb-2">{typeLabels[college.type]}</Badge>
              <h1 className="text-2xl font-bold text-white drop-shadow sm:text-3xl">
                {college.name}
              </h1>
              <p className="flex items-center gap-1 text-white/90">
                <MapPin className="h-4 w-4" aria-hidden />
                {college.city}, {college.state}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pb-4">
            <SaveCollegeButton collegeId={college.id} />
            <Link
              href={`/compare?slugs=${college.slug}`}
              className="rounded-lg border border-white/60 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/20"
            >
              Add to compare
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Star, label: "Rating", value: `${formatRating(college.avgRating)} (${college.reviewCount})` },
            { icon: Calendar, label: "Established", value: college.established?.toString() ?? "—" },
            { icon: Users, label: "Students", value: college.totalStudents?.toLocaleString() ?? "—" },
            { icon: Award, label: "Accreditation", value: college.accreditation ?? "—" },
          ].map(({ icon: Icon, label, value }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-3 pt-6">
                <Icon className="h-5 w-5 text-blue-600" aria-hidden />
                <div>
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="font-semibold text-slate-900">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="text-xl font-bold text-slate-900">Overview</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{college.description}</p>
              {college.website && (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
                >
                  <Globe className="h-4 w-4" aria-hidden />
                  Visit website
                </a>
              )}
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">Courses</h2>
              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="p-3 font-medium">Course</th>
                      <th className="p-3 font-medium">Degree</th>
                      <th className="p-3 font-medium">Duration</th>
                      <th className="p-3 font-medium">Fees/yr</th>
                    </tr>
                  </thead>
                  <tbody>
                    {college.courses.map((c) => (
                      <tr key={c.id} className="border-t border-slate-100">
                        <td className="p-3">{c.name}</td>
                        <td className="p-3">{c.degree}</td>
                        <td className="p-3">{c.duration}</td>
                        <td className="p-3 font-medium">{formatCurrency(c.feesPerYear)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">Reviews</h2>
              {college.reviews.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500">No reviews yet.</p>
              ) : (
                <div className="mt-4 space-y-4">
                  {college.reviews.map((r) => (
                    <Card key={r.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{r.user.name ?? "Anonymous"}</span>
                          <span className="flex items-center gap-1 text-amber-600">
                            <Star className="h-4 w-4 fill-amber-400" aria-hidden />
                            {r.rating}/5
                          </span>
                        </div>
                        {r.title && <p className="mt-1 font-medium text-slate-800">{r.title}</p>}
                        <p className="mt-2 text-sm text-slate-600">{r.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fees breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {college.fees.map((f) => (
                  <div key={f.id} className="flex justify-between text-sm">
                    <span className="text-slate-600">{f.label}</span>
                    <span className="font-medium">{formatCurrency(f.amount)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Placements {latestPlacement ? `(${latestPlacement.year})` : ""}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {latestPlacement ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Avg. package</span>
                      <span className="font-medium">{latestPlacement.averagePackage} LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Highest</span>
                      <span className="font-medium">{latestPlacement.highestPackage} Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Placement rate</span>
                      <span className="font-medium">{latestPlacement.placementRate}%</span>
                    </div>
                    <div>
                      <p className="text-slate-600">Top recruiters</p>
                      <p className="mt-1 font-medium">{latestPlacement.topRecruiters.join(", ")}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-500">No placement data available.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
