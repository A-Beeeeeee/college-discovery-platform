import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveCollegeSchema } from "@/features/saved/schemas";
import { getSavedColleges } from "@/features/colleges/queries";
import { handleApiError, jsonError, jsonOk } from "@/lib/api-response";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return jsonError("Unauthorized", 401);
    }

    const colleges = await getSavedColleges(session.user.id);
    return jsonOk(colleges);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return jsonError("Unauthorized", 401);
    }

    const body = await request.json();
    const { collegeId } = saveCollegeSchema.parse(body);

    const college = await prisma.college.findUnique({ where: { id: collegeId } });
    if (!college) {
      return jsonError("College not found", 404);
    }

    await prisma.savedCollege.upsert({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId,
        },
      },
      create: { userId: session.user.id, collegeId },
      update: {},
    });

    return jsonOk({ saved: true }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return jsonError("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const collegeId = searchParams.get("collegeId");

    if (!collegeId) {
      return jsonError("collegeId is required", 400);
    }

    await prisma.savedCollege.deleteMany({
      where: { userId: session.user.id, collegeId },
    });

    return jsonOk({ saved: false });
  } catch (error) {
    return handleApiError(error);
  }
}
