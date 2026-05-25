"use client";

import { CollegeCard } from "./college-card";
import { useCompare } from "@/hooks/use-compare";
import type { CollegeListItem } from "@/types";

interface Props {
  college: CollegeListItem;
  showCompare?: boolean;
}

export function CollegeCardWrapper({ college, showCompare }: Props) {
  const { add } = useCompare();
  return (
    <CollegeCard
      college={college}
      showCompare={showCompare}
      onAddCompare={showCompare ? add : undefined}
    />
  );
}
