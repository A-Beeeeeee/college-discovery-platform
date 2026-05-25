import { compareQuerySchema } from "@/features/colleges/schemas";
import { getCollegesForCompare } from "@/features/colleges/queries";
import { handleApiError, jsonError, jsonOk } from "@/lib/api-response";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { slugs } = compareQuerySchema.parse({
      slugs: searchParams.get("slugs") ?? "",
    });

    const colleges = await getCollegesForCompare(slugs);

    if (colleges.length < 2) {
      return jsonError("At least 2 valid colleges required for comparison", 404);
    }

    return jsonOk(colleges);
  } catch (error) {
    return handleApiError(error);
  }
}
