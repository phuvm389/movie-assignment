import { contentfulApi } from "@/api/contentful";

export async function GET(request: Request) {
  try {
    const data = await contentfulApi.getListUserSubmitted(0);
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: `Failed because of ${error}` },
      { status: 500 }
    );
  }
}
