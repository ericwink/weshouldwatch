import TrendingGrid from "@/components/TrendingGrid";

const getData = async (mediaType: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=${tmdbKey}`;
  const result = await fetch(url, { next: { revalidate: 86400 } });
  const media = await result.json();
  return media.results;
};

const muiPage = async () => {
  const data = await getData("movie");

  return (
    <>
      <TrendingGrid data={data} />
    </>
  );
};

export default muiPage;
