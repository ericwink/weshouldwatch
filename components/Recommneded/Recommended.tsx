import Slider from "../Slider/Slider";

interface Props {
  mediaType: "movie" | "tv";
  id: string;
}

const fetchRecommended = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${tmdbKey}&language=en-US`;
  const results = await fetch(url);
  const recommended = await results.json();
  return recommended.results;
};

const Recommended = async ({ mediaType, id }: Props) => {
  const recommended = await fetchRecommended(mediaType, id);

  if (recommended.length < 1) return;

  return (
    <>
      <h1>Recommended Titles</h1>
      <Slider
        mediaType={mediaType}
        data={recommended}
      />
    </>
  );
};

export default Recommended;
