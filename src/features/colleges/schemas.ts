import { z } from "zod";

export const collegeTypeEnum = z.enum(["GOVERNMENT", "PRIVATE", "DEEMED"]);

export const collegeListQuerySchema = z.object({
  q: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  type: collegeTypeEnum.optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  sort: z
    .enum(["rating", "name", "reviews", "newest"])
    .optional()
    .default("rating"),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(50).optional().default(12),
});

export type CollegeListQuery = z.infer<typeof collegeListQuerySchema>;

export const compareQuerySchema = z.object({
  slugs: z
    .string()
    .transform((s) => s.split(",").filter(Boolean))
    .pipe(z.array(z.string()).min(2).max(3)),
});

export type CompareQuery = z.infer<typeof compareQuerySchema>;
