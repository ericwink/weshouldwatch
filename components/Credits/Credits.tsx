import Slider from "../Slider/Slider";

interface Props {
  mediaType: "movie" | "tv";
  id: number;
}

const fetchCredits = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${tmdbKey}&language=en-US`;
  const results = await fetch(url, { next: { revalidate: 28800 } });
  const creditsData = await results.json();
  return creditsData;
};

const Credits = async ({ mediaType, id }: Props) => {
  const creditsData = await fetchCredits(mediaType, id.toString());

  if (!creditsData) return <h1>No Credits Data Found</h1>;

  return (
    <>
      <h1>Cast</h1>
      <Slider
        mediaType="person"
        data={creditsData.cast}
      />

      <h1>Production Staff</h1>
      <Slider
        mediaType="person"
        data={creditsData.crew}
      />
    </>
  );
};

export default Credits;
