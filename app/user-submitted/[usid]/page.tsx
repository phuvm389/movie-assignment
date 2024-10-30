import { userSubmittedApi } from "@/api/userSubmittedApi";
import DynamicBlock from "@/components/DynamicBlock/DynamicBlock";
import MovieDetail from "@/components/MovieDetail/MovieDetail";
import { notFound } from "next/navigation";

export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: { usid: string };
}) {
  const { usid } = params;
  const detail = await userSubmittedApi.getUserSubmittedById(usid);
  if (!detail) {
    return notFound();
  }
  return {
    title: detail.originalTitle,
    description: detail.overview,
  };
}

// EX: /user-submitted/j4lbti
export default async function Page({ params }: { params: { usid: string } }) {
  const { usid } = params;
  const detail = await userSubmittedApi.getUserSubmittedById(usid);
  // console.log("detail", detail.components);

  // let blocks: any = [];
  // if (detail) {
  //   blocks = getBlocks(detail?.components);
  // }
  // console.log("components", detail.components[0].content);

  if (!detail) {
    return notFound();
  }
  return (
    <>
      <MovieDetail {...detail} />
      <div className="components">
        <DynamicBlock components={detail.components} />
      </div>
    </>
  );
}
