import GroupMediaCard from "../_components/GroupMediaCard/GroupMediaCard";
import GroupMediaCardDrawer from "../_components/GroupMediaCard/GroupMediaCardDrawer";
import { getMedia } from "../_server/getMedia.server";

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const GroupMoviesPage = async ({ params, searchParams }: Props) => {
  const movies = await getMedia({
    groupId: params.id,
    mediaType: "movie",
    searchParams,
  });

  if (movies.error)
    throw new Error("There was an error getting your movies. Please try again");

  return (
    <div className="w-full flex flex-wrap gap-2 justify-center">
      {movies.data.map((movie) => (
        <GroupMediaCard
          media={movie.media}
          user={movie.user_public_profile}
          key={movie.id}
        >
          <GroupMediaCardDrawer
            added_reason={movie.added_reason}
            user={movie.user_public_profile}
            groupId={params.id}
            mediaId={movie.media_id}
            mediaType="movie"
            watched={movie.watched}
          />
        </GroupMediaCard>
      ))}
    </div>
  );
};

export default GroupMoviesPage;
