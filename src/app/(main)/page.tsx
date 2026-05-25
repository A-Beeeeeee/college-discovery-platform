import Link from "next/link";
import { Search, GitCompare, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getColleges } from "@/features/colleges/queries";
import { CollegeCard } from "@/features/colleges/components/college-card";

export default async function HomePage() {
  const { items } = await getColleges({ page: 1, pageSize: 6, sort: "rating" });

  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Find the right college for your future
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Search 1000+ institutions, compare fees & placements, read reviews, and save your
            favorites — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/colleges">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Search className="mr-2 h-5 w-5" aria-hidden />
                Explore colleges
              </Button>
            </Link>
            <Link href="/compare">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                <GitCompare className="mr-2 h-5 w-5" aria-hidden />
                Compare colleges
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Top rated colleges</h2>
            <p className="mt-1 text-slate-600">Hand-picked from our database</p>
          </div>
          <Link href="/colleges" className="text-sm font-medium text-blue-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: Search, title: "Smart search", desc: "Filter by state, type, rating, and more." },
            { icon: GitCompare, title: "Side-by-side compare", desc: "Compare up to 3 colleges on key metrics." },
            { icon: Bookmark, title: "Save favorites", desc: "Build your shortlist with a free account." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center sm:text-left">
              <Icon className="mx-auto h-8 w-8 text-blue-600 sm:mx-0" aria-hidden />
              <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
