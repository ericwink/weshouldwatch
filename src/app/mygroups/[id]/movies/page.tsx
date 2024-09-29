import { Suspense } from "react";
import MoviesReturn from "./MoviesReturn";
import MediaLoader from "../_components/MediaLoader";

interface Props {
  params: {
    id: string;
  };
  searchParams: { watched?: string };
}

const GroupMoviesPage = ({ params, searchParams }: Props) => {
  return (
    <div className="w-full flex flex-wrap gap-2 justify-center">
      <Suspense key={searchParams?.watched || ""} fallback={<MediaLoader />}>
        {/* @ts-expect-error Server Component */}
        <MoviesReturn groupId={params.id} searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default GroupMoviesPage;
