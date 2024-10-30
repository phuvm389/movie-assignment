import { contentfulApi } from "@/api/contentful";

export async function GET(
  request: Request,
  { params }: { params: { usid: string } }
) {
  try {
    const usid = params.usid;
    const data = await contentfulApi.getUserSubmittedById(usid);
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: `Failed because of ${error}` },
      { status: 500 }
    );
  }
}
