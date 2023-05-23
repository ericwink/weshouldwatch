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

  const cast = (
    <>
      <h1>Cast</h1>
      <Slider
        mediaType="person"
        data={creditsData.cast}
      />
    </>
  );

  const crew = (
    <>
      <h1>Production Staff</h1>
      <Slider
        mediaType="person"
        data={creditsData.crew}
      />
    </>
  );

  return (
    <>
      {creditsData.cast.length > 1 && cast}

      {creditsData.crew.length > 1 && crew}
    </>
  );
};

export default Credits;
