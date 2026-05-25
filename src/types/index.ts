import type { College, CollegeType, Course, Placement, CollegeFee, Review } from "@prisma/client";

export type CollegeListItem = Pick<
  College,
  | "id"
  | "slug"
  | "name"
  | "shortName"
  | "city"
  | "state"
  | "type"
  | "avgRating"
  | "reviewCount"
  | "logoUrl"
  | "coverImageUrl"
> & {
  minFees?: number | null;
  maxPlacement?: number | null;
};

export type CollegeDetail = College & {
  courses: Course[];
  fees: CollegeFee[];
  placements: Placement[];
  reviews: (Review & { user: { name: string | null; image: string | null } })[];
};

export type CompareCollege = CollegeListItem & {
  fees: CollegeFee[];
  placements: Placement[];
};

export { CollegeType };

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
