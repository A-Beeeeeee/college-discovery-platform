import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CollegeNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-slate-900">College not found</h1>
      <p className="mt-2 text-slate-600">The college you are looking for does not exist.</p>
      <Link href="/colleges" className="mt-6 inline-block">
        <Button>Browse colleges</Button>
      </Link>
    </div>
  );
}
