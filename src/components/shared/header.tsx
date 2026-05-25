import Link from "next/link";
import { GraduationCap, GitCompare, Bookmark, LayoutDashboard } from "lucide-react";
import { auth } from "@/lib/auth";
import { signOutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <GraduationCap className="h-7 w-7 text-blue-600" aria-hidden />
          <span className="hidden sm:inline">CollegeFinder</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          <Link
            href="/colleges"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Colleges
          </Link>
          <Link
            href="/compare"
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <GitCompare className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Compare</span>
          </Link>
          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Bookmark className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">Saved</span>
              </Link>
              <form action={signOutAction}>
                <Button type="submit" variant="outline" size="sm">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm">Sign in</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
