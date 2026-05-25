import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <GraduationCap className="h-5 w-5 text-blue-600" aria-hidden />
          <span>CollegeFinder — Discover your perfect college</span>
        </div>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} College Discovery Platform. Built for internship MVP.
        </p>
      </div>
    </footer>
  );
}
