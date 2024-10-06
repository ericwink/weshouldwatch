import { getMedia } from "../_server/getMedia.server";
import TvReturn from "./TvReturn";
import MediaLoader from "../_components/MediaLoader";
import { Suspense } from "react";
import { userIsGroupMember } from "../_server/userIsGroupMember.server";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
  searchParams: { watched?: string };
}

const GroupTvPage = async ({ params, searchParams }: Props) => {
  const isMember = await userIsGroupMember(params.id);
  if (!isMember) redirect("/accessDenied");

  const tvShows = await getMedia({
    groupId: params.id,
    mediaType: "tv",
    searchParams,
  });

  if (tvShows.error)
    throw new Error(
      "There was an error getting your TV Shows. Please try again"
    );

  return (
    <div className="w-full flex flex-wrap gap-2 justify-center">
      <div className="w-full flex flex-wrap gap-2 justify-center">
        <Suspense key={searchParams?.watched || ""} fallback={<MediaLoader />}>
          {/* @ts-expect-error Server Component */}
          <TvReturn groupId={params.id} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default GroupTvPage;
