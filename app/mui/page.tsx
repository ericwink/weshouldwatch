import TrendingTabs from "@/components/TrendingTabs";
import TrendingGrid from "@/components/TrendingGrid";

const getData = async (mediaType: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/trending/${mediaType}/day?include_adult=false&api_key=${tmdbKey}`;
  const result = await fetch(url, { next: { revalidate: 86400 } });
  const media = await result.json();
  return media.results;
};

const muiPage = async () => {
  const data = await getData("person");

  return (
    <>
      <TrendingTabs>
        <TrendingGrid data={await getData("movie")} />
        <TrendingGrid data={await getData("tv")} />
        <TrendingGrid data={await getData("person")} />
      </TrendingTabs>
    </>
  );
};

export default muiPage;
