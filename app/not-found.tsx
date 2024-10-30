import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="min-h-4/6-screen flex flex-col justify-center items-center w-full ">
      <p className="text-rose-600 text-4xl font-bold mb-5">404</p>
      <h2 className="text-5xl mb-5">Page not found</h2>
      <p className="mb-5">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link href="/" className="btn">
        Go back home
      </Link>
    </div>
  );
}
