import GroupMediaCard from "../_components/GroupMediaCard/GroupMediaCard";
import GroupMediaCardDrawer from "../_components/GroupMediaCard/GroupMediaCardDrawer";
import { getMedia } from "../_server/getMedia.server";

interface Props {
  groupId: string;
  searchParams: { watched?: string };
}

const MoviesReturn = async ({ groupId, searchParams }: Props) => {
  const movies = await getMedia({
    groupId,
    mediaType: "movie",
    searchParams,
  });

  if (movies.error)
    throw new Error("There was an error getting your movies. Please try again");

  return (
    <>
      {movies.data.map((movie) => (
        <GroupMediaCard
          media={movie.media}
          user={movie.user_public_profile}
          key={movie.id}
        >
          <GroupMediaCardDrawer
            added_reason={movie.added_reason}
            user={movie.user_public_profile}
            groupId={groupId}
            mediaId={movie.media_id}
            mediaType="movies"
            watched={movie.watched}
            rowId={movie.id}
          />
        </GroupMediaCard>
      ))}
    </>
  );
};

export default MoviesReturn;
