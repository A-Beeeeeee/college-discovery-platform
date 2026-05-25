import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Bookmark } from "lucide-react";
import { getSavedColleges } from "@/features/colleges/queries";
import { CollegeCard } from "@/features/colleges/components/college-card";
import { EmptyState } from "@/components/shared/empty-state";

export const metadata = { title: "Saved Colleges" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const colleges = await getSavedColleges(session.user.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Saved Colleges</h1>
      <p className="mt-2 text-slate-600">
        Welcome back, {session.user.name ?? session.user.email}
      </p>

      <div className="mt-8">
        {colleges.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="No saved colleges yet"
            description="Browse colleges and tap Save to build your shortlist."
            actionLabel="Explore colleges"
            actionHref="/colleges"
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
