import { getCollegeBySlug } from "@/features/colleges/queries";
import { handleApiError, jsonError, jsonOk } from "@/lib/api-response";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const college = await getCollegeBySlug(slug);

    if (!college) {
      return jsonError("College not found", 404);
    }

    return jsonOk(college);
  } catch (error) {
    return handleApiError(error);
  }
}
