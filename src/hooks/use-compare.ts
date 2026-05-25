"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "compare-colleges";
const MAX_COMPARE = 3;

export function useCompare() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSlugs(JSON.parse(stored));
    } catch {
      setSlugs([]);
    }
  }, []);

  const persist = useCallback((next: string[]) => {
    setSlugs(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const add = useCallback(
    (slug: string) => {
      if (slugs.includes(slug)) return;
      if (slugs.length >= MAX_COMPARE) {
        alert(`You can compare up to ${MAX_COMPARE} colleges at a time.`);
        return;
      }
      persist([...slugs, slug]);
    },
    [slugs, persist]
  );

  const remove = useCallback(
    (slug: string) => {
      persist(slugs.filter((s) => s !== slug));
    },
    [slugs, persist]
  );

  const clear = useCallback(() => persist([]), [persist]);

  return { slugs, add, remove, clear, max: MAX_COMPARE };
}
