"use client";

import { Bookmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSaveCollege } from "@/hooks/use-saved-college";

interface SaveCollegeButtonProps {
  collegeId: string;
}

export function SaveCollegeButton({ collegeId }: SaveCollegeButtonProps) {
  const { isSaved, isLoading, isAuthenticated, toggle } = useSaveCollege(collegeId);

  if (!isAuthenticated) {
    return (
      <Link href="/login">
        <Button variant="outline" size="sm">
          <Bookmark className="mr-2 h-4 w-4" aria-hidden />
          Sign in to save
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant={isSaved ? "secondary" : "outline"}
      size="sm"
      onClick={() => toggle()}
      disabled={isLoading}
      aria-pressed={isSaved}
    >
      <Bookmark
        className={`mr-2 h-4 w-4 ${isSaved ? "fill-blue-600 text-blue-600" : ""}`}
        aria-hidden
      />
      {isSaved ? "Saved" : "Save college"}
    </Button>
  );
}
