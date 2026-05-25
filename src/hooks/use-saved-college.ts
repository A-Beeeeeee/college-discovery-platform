"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

async function fetchSaved() {
  const res = await fetch("/api/saved");
  if (!res.ok) throw new Error("Failed to fetch saved colleges");
  const json = await res.json();
  return json.data as { id: string; slug: string }[];
}

export function useSavedColleges() {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["saved-colleges"],
    queryFn: fetchSaved,
    enabled: !!session?.user,
  });
}

export function useSaveCollege(collegeId: string) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to save");
      }
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["saved-colleges"] }),
  });

  const unsaveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/saved?collegeId=${collegeId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["saved-colleges"] }),
  });

  const savedQuery = useSavedColleges();
  const isSaved = savedQuery.data?.some((c) => c.id === collegeId) ?? false;

  return {
    isSaved,
    isLoading: saveMutation.isPending || unsaveMutation.isPending,
    isAuthenticated: !!session?.user,
    toggle: () => (isSaved ? unsaveMutation.mutate() : saveMutation.mutate()),
    save: () => saveMutation.mutate(),
    unsave: () => unsaveMutation.mutate(),
  };
}
