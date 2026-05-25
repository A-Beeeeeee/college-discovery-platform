import { collegeListQuerySchema } from "@/features/colleges/schemas";
import { getColleges, getFilterOptions } from "@/features/colleges/queries";
import { handleApiError, jsonOk } from "@/lib/api-response";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    const query = collegeListQuerySchema.parse(params);

    const [result, filters] = await Promise.all([
      getColleges(query),
      searchParams.get("includeFilters") === "true" ? getFilterOptions() : null,
    ]);

    return jsonOk({ ...result, filters });
  } catch (error) {
    return handleApiError(error);
  }
}
