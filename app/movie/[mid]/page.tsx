import movieApi from "@/api/movieApi";
import MovieDetail from "@/components/MovieDetail/MovieDetail";

export async function generateMetadata({
  params,
}: {
  params: { mid: string };
}) {
  const { mid } = params;
  const detail = await movieApi.getDetail(mid);

  return {
    title: detail.originalTitle,
    description: detail.overview,
  };
}

export default async function Page({ params }: { params: { mid: string } }) {
  const { mid } = params;
  const detail = await movieApi.getDetail(mid);

  return <MovieDetail {...detail} />;
}
