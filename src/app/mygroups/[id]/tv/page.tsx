import GroupMediaCard from "../_components/GroupMediaCard/GroupMediaCard";
import GroupMediaCardDrawer from "../_components/GroupMediaCard/GroupMediaCardDrawer";
import { getMedia } from "../_server/getMedia.server";

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const GroupTvPage = async ({ params, searchParams }: Props) => {
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
      {tvShows.data.map((show) => (
        <GroupMediaCard
          media={show.media}
          user={show.user_public_profile}
          key={show.id}
        >
          <GroupMediaCardDrawer
            added_reason={show.added_reason}
            user={show.user_public_profile}
            groupId={params.id}
            mediaId={show.media_id}
            mediaType="tv"
            watched={show.watched}
          />
        </GroupMediaCard>
      ))}
    </div>
  );
};

export default GroupTvPage;
