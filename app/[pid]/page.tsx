import { notFound } from "next/navigation";
import MovieList from "@/components/MovieList/MovieList";
import Hero from "@/components/Hero/Hero";
import getListPages from "@/helpers/pages/getListPages";

export async function generateMetadata({
  params,
}: {
  params: { pid: string };
}) {
  const { pid } = params;
  const detail = getListPages(pid);
  if (detail === null) {
    return notFound();
  }
  return {
    title: detail.title,
    description: detail.description,
  };
}

export default async function Page({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const detail = getListPages(pid);
  if (detail === null) {
    return notFound();
  }
  return (
    <>
      <Hero title={detail.title} />
      <MovieList title={detail.listTitle} query={detail.query} />
    </>
  );
}
