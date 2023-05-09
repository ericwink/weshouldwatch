import getPoster from "@/utilities/getPoster";
import Genres from "@/app/components/Genres/Genres";
import Similar from "@/app/components/Similar/Similar";

interface Props {
  params: { media_id: string };
  searchParams: { media_type: string };
}

const fetchData = async (mediaType: string, id: string) => {
  console.log("inside", mediaType, id);
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${tmdbKey}&language=en-US`;
  const result = await fetch(url);
  const mediaData = await result.json();
  console.log({ mediaData });
  return mediaData;
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
    id: mediaData.id.toString(),
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

      <div>
        {mediaData.release_date}
        {mediaData.runtime}
        {rating}
      </div>
      {mediaData.overview}

      <Similar
        mediaType={media_type}
        id={media_id}
      />
    </main>
  );
};

export default mediaPage;

// http://localhost:3000/media/713704?media_type=movie
