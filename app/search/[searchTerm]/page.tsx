import { Movie, TV, Person } from "@/lib/interface";
import ActorLink from "@/components/ActorLink/ActorLink";
import PosterLink from "@/components/PosterLink/PosterLink";

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
        return (
          <li>
            <ActorLink {...each} />
          </li>
        );
      } else {
        return (
          <li>
            <PosterLink media={each} />
          </li>
        );
      }
    });
  };

  const movies = mapResults("movie");
  const tv = mapResults("tv");
  const people = mapResults("person");

  return (
    <main className="container">
      <h1>Search Results</h1>

      {movies.length > 1 && (
        <section>
          <p>Movies:</p>
          <ul className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 md:gap-2">{movies}</ul>
        </section>
      )}
      {tv.length > 1 && (
        <section>
          <p>TV:</p>
          <ul className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 md:gap-2">{tv}</ul>
        </section>
      )}
      {people.length > 1 && (
        <section>
          <p>TV:</p>
          <ul className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 md:gap-2">{people}</ul>
        </section>
      )}
    </main>
  );
};
export default SearchTermPage;
