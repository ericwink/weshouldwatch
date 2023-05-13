import Slider from "../Slider/Slider";

interface Props {
  mediaType: "movie" | "tv";
  id: string;
}

const getSimilar = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${tmdbKey}&language=en-US`;
  const results = await fetch(url);
  const similarTitles = await results.json();
  return similarTitles.results;
};

const Similar = async ({ mediaType, id }: Props) => {
  const similarTitles = await getSimilar(mediaType, id);

  if (!similarTitles) return <h1>No suggestions found</h1>;
  return (
    <>
      <h1>Similar Titles</h1>
      <Slider
        mediaType={mediaType}
        data={similarTitles}
      />
    </>
  );
};

export default Similar;
