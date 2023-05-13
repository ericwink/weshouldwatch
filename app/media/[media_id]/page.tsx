import getPoster from "@/utilities/getPoster";
import Genres from "@/app/components/Genres/Genres";
import Similar from "@/app/components/Similar/Similar";
import Credits from "@/app/components/Credits/Credits";
import Recommended from "@/app/components/Recommneded/Recommended";
import StreamingOptions from "@/app/components/StreamingOptions/StreamingOptions";
import GroupContainer from "@/app/components/GroupContainer/GroupContainer";

interface Props {
  params: { media_id: string };
  searchParams: { media_type: string };
}

const fetchData = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${tmdbKey}&language=en-US`;
  const result = await fetch(url);
  return result.json();
};

const mediaPage = async ({ params, searchParams }: Props) => {
  const { media_type } = searchParams;
  const { media_id } = params;

  const mediaData = await fetchData(media_type, media_id);

  const poster = getPoster(mediaData.poster_path, "200");
  const title = mediaData.title ? mediaData.title : mediaData.name;
  const backdrop = `https://image.tmdb.org/t/p/w500/${mediaData.backdrop_path}`;
  const rating = `${Math.floor(mediaData.vote_average * 10)}%`;

  const mediaInfo = {
    mediaId: mediaData.id.toString(),
    title: title,
    poster_path: mediaData.poster_path,
  };

  return (
    <main>
      <h1>media page</h1>
      <img
        src={backdrop}
        alt={title}
      />
      {title}
      <img
        src={poster}
        alt={title}
      />

      <Genres
        genre_ids={mediaData.genres}
        type="obj"
      />

      {/* add to group button */}

      <GroupContainer mediaInfo={mediaInfo} />

      <div>
        {mediaData.release_date}
        {mediaData.runtime}
        {rating}
      </div>
      {mediaData.overview}

      <StreamingOptions
        media_type={media_type}
        id={media_id}
      />

      <Credits
        mediaType={media_type}
        id={media_id}
      />

      <Recommended
        mediaType={media_type}
        id={media_id}
      />

      {/* all similar titles have a 'type' of 'undefined' */}
      {/* <Similar
        mediaType={media_type}
        id={media_id}
      /> */}
    </main>
  );
};

export default mediaPage;

// http://localhost:3000/media/713704?media_type=movie
