import Slider from "../Slider/Slider";

interface Props {
  mediaType: "movie" | "person" | "tv";
}

const getData = async (mediaType: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=${tmdbKey}`;
  const result = await fetch(url, { next: { revalidate: 86400 } });
  const media = await result.json();
  return media.results;
};

const Trending = async ({ mediaType }: Props) => {
  const media = await getData(mediaType);

  if (!media) return <h1>No data found</h1>;

  return (
    <Slider
      mediaType={mediaType}
      data={media}
    />
  );
};

export default Trending;
