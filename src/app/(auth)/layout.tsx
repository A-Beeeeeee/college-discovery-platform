import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2 font-semibold text-slate-900">
        <GraduationCap className="h-8 w-8 text-blue-600" aria-hidden />
        CollegeFinder
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
