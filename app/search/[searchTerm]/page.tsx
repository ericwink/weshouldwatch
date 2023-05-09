import { Movie, TV, Person } from "@/utilities/interface";
import PosterButton from "@/components/PosterButton/PosterButton";
import PreviewCard from "@/components/PreviewCard/PreviewCard";
import ActorLink from "@/app/components/ActorLink/ActorLink";

interface Props {
  params: { searchTerm: string };
}

interface SortedResults {
  tv: TV[];
  movie: Movie[];
  person: Person[];
}

const fetchData = async (searchTerm: string): Promise<SortedResults> => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${tmdbKey}&language=en-US&page=1&include_adult=false&query=${searchTerm}`;
  const results = await fetch(url);
  const searchResults = await results.json();
  const separatedResults = separateData(searchResults.results);
  return separatedResults;
};

const separateData = (data: [Movie | TV | Person]): SortedResults => {
  const tempData = { movie: [], tv: [], person: [] };
  data.forEach(entry => {
    tempData[entry.media_type].push(entry);
  });
  return tempData;
};

const SearchTermPage = async ({ params }: Props) => {
  const { searchTerm } = params;
  const searchResults = await fetchData(searchTerm);

  const mapResults = (mediaType: "movie" | "tv" | "person") => {
    return searchResults[mediaType].map(each => {
      if (mediaType === "person") {
        return <ActorLink {...each} />;
      }
      return (
        <PosterButton {...each}>
          <PreviewCard {...each} />
        </PosterButton>
      );
    });
  };

  return (
    <>
      <h1>Search Results</h1>
      <p>Movies:</p>
      {mapResults("movie")}
      <p>TV:</p>
      {mapResults("tv")}
      <p>People:</p>
      {mapResults("person")}
    </>
  );
};
export default SearchTermPage;
