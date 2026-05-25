import { z } from "zod";

export const saveCollegeSchema = z.object({
  collegeId: z.string().cuid("Invalid college ID"),
});

export type SaveCollegeInput = z.infer<typeof saveCollegeSchema>;
