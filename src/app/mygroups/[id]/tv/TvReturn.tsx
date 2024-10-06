import GroupMediaCard from "../_components/GroupMediaCard/GroupMediaCard";
import GroupMediaCardDrawer from "../_components/GroupMediaCard/GroupMediaCardDrawer";
import { getMedia } from "../_server/getMedia.server";

interface Props {
  groupId: string;
  searchParams: { watched?: string };
}

const TvReturn = async ({ groupId, searchParams }: Props) => {
  const tvShows = await getMedia({
    groupId,
    mediaType: "tv",
    searchParams,
  });

  if (tvShows.error)
    throw new Error(
      "There was an error getting your TV Shows. Please try again"
    );

  return (
    <>
      {tvShows.data.map((show) => (
        <GroupMediaCard
          media={show.media}
          user={show.user_public_profile}
          key={show.id}
        >
          <GroupMediaCardDrawer
            added_reason={show.added_reason}
            user={show.user_public_profile}
            groupId={groupId}
            mediaId={show.media_id}
            mediaType="tv"
            watched={show.watched}
            rowId={show.id}
          />
        </GroupMediaCard>
      ))}
    </>
  );
};

export default TvReturn;
