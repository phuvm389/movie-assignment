import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

/**
 * Used to invalidate Next.js page cache.
 *
 * Example usage.
 * api/revalidate?path=/
 * api/revalidate?path=/user-submitted/j4lbti
 */
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");

  if (path) {
    revalidatePath(path);
    revalidateTag("user-submitted-list");
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path to revalidate",
  });
}
