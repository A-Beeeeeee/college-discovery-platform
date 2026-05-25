import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/features/auth/schemas";
import { handleApiError, jsonError, jsonOk } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return jsonError("Email already registered", 409);
    }

    const hashed = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
      },
      select: { id: true, email: true, name: true },
    });

    return jsonOk({ user }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
