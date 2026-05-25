import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { CollegeListQuery } from "./schemas";
import type { CollegeDetail, CollegeListItem, PaginatedResult } from "@/types";

function buildWhere(query: CollegeListQuery): Prisma.CollegeWhereInput {
  const where: Prisma.CollegeWhereInput = {};

  if (query.q) {
    where.OR = [
      { name: { contains: query.q, mode: "insensitive" } },
      { city: { contains: query.q, mode: "insensitive" } },
      { state: { contains: query.q, mode: "insensitive" } },
      { shortName: { contains: query.q, mode: "insensitive" } },
    ];
  }
  if (query.state) where.state = { equals: query.state, mode: "insensitive" };
  if (query.city) where.city = { contains: query.city, mode: "insensitive" };
  if (query.type) where.type = query.type;
  if (query.minRating) where.avgRating = { gte: query.minRating };

  return where;
}

function buildOrderBy(sort: CollegeListQuery["sort"]): Prisma.CollegeOrderByWithRelationInput {
  switch (sort) {
    case "name":
      return { name: "asc" };
    case "reviews":
      return { reviewCount: "desc" };
    case "newest":
      return { createdAt: "desc" };
    case "rating":
    default:
      return { avgRating: "desc" };
  }
}

export async function getColleges(
  query: CollegeListQuery
): Promise<PaginatedResult<CollegeListItem>> {
  const where = buildWhere(query);
  const orderBy = buildOrderBy(query.sort);
  const skip = (query.page - 1) * query.pageSize;

  const [colleges, total] = await Promise.all([
    prisma.college.findMany({
      where,
      orderBy,
      skip,
      take: query.pageSize,
      select: {
        id: true,
        slug: true,
        name: true,
        shortName: true,
        city: true,
        state: true,
        type: true,
        avgRating: true,
        reviewCount: true,
        logoUrl: true,
        coverImageUrl: true,
        courses: { select: { feesPerYear: true }, orderBy: { feesPerYear: "asc" }, take: 1 },
        placements: {
          select: { averagePackage: true },
          orderBy: { year: "desc" },
          take: 1,
        },
      },
    }),
    prisma.college.count({ where }),
  ]);

  const items: CollegeListItem[] = colleges.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    shortName: c.shortName,
    city: c.city,
    state: c.state,
    type: c.type,
    avgRating: c.avgRating,
    reviewCount: c.reviewCount,
    logoUrl: c.logoUrl,
    coverImageUrl: c.coverImageUrl,
    minFees: c.courses[0]?.feesPerYear ?? null,
    maxPlacement: c.placements[0]?.averagePackage ?? null,
  }));

  return {
    items,
    total,
    page: query.page,
    pageSize: query.pageSize,
    totalPages: Math.ceil(total / query.pageSize),
  };
}

export async function getCollegeBySlug(slug: string): Promise<CollegeDetail | null> {
  return prisma.college.findUnique({
    where: { slug },
    include: {
      courses: { orderBy: { feesPerYear: "asc" } },
      fees: { orderBy: { amount: "asc" } },
      placements: { orderBy: { year: "desc" } },
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 20,
        include: {
          user: { select: { name: true, image: true } },
        },
      },
    },
  });
}

export async function getCollegesForCompare(slugs: string[]) {
  return prisma.college.findMany({
    where: { slug: { in: slugs } },
    include: {
      fees: true,
      placements: { orderBy: { year: "desc" }, take: 1 },
      courses: { orderBy: { feesPerYear: "asc" }, take: 3 },
    },
  });
}

export async function getFilterOptions() {
  const [states, cities] = await Promise.all([
    prisma.college.findMany({
      select: { state: true },
      distinct: ["state"],
      orderBy: { state: "asc" },
    }),
    prisma.college.findMany({
      select: { city: true, state: true },
      distinct: ["city", "state"],
      orderBy: { city: "asc" },
    }),
  ]);

  return {
    states: states.map((s) => s.state),
    cities: cities.map((c) => ({ city: c.city, state: c.state })),
  };
}

export async function getSavedColleges(userId: string) {
  const saved = await prisma.savedCollege.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      college: {
        select: {
          id: true,
          slug: true,
          name: true,
          shortName: true,
          city: true,
          state: true,
          type: true,
          avgRating: true,
          reviewCount: true,
          logoUrl: true,
          coverImageUrl: true,
        },
      },
    },
  });

  return saved.map((s) => s.college);
}

export async function isCollegeSaved(userId: string, collegeId: string) {
  const found = await prisma.savedCollege.findUnique({
    where: { userId_collegeId: { userId, collegeId } },
  });
  return !!found;
}
