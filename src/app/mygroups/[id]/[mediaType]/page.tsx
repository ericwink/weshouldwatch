import { Suspense } from "react";
import GroupMediaReturn from "./GroupMediaReturn";
import MediaLoader from "../_components/MediaLoader";
import { userIsGroupMember } from "../_server/userIsGroupMember.server";
import { redirect } from "next/navigation";

export type MediaOptions = "movie" | "tv";

interface Props {
  params: {
    id: string;
    mediaType: MediaOptions | string;
  };
  searchParams: { watched?: string };
}

const GroupMediaPage = async ({ params, searchParams }: Props) => {
  const isMember = await userIsGroupMember(params.id);
  if (!isMember) redirect("/accessDenied");

  if (params.mediaType !== "movie" && params.mediaType !== "tv")
    throw new Error("Only movie or tv allowed a this path");

  const groupId = params.id;
  const mediaType = params.mediaType;
  const watched = searchParams?.watched
    ? searchParams.watched === "true"
    : undefined;

  return (
    <div className="w-full flex flex-wrap gap-2 justify-center">
      <Suspense key={groupId + mediaType + watched} fallback={<MediaLoader />}>
        {/* @ts-expect-error Server Component */}
        <GroupMediaReturn
          groupId={groupId}
          watched={watched}
          mediaType={mediaType}
        />
      </Suspense>
    </div>
  );
};

export default GroupMediaPage;
