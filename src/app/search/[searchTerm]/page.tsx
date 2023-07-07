import { Movie, TV, Person } from "@/src/lib/interface";
import TabDisplay from "@/src/components/TabDisplay";
import MediaCardMUI from "@/src/components/Cards/MediaCardMUI";
import PeopleCard from "@/src/components/Cards/PeopleCard";
import CardGrid from "@/src/components/Cards/CardGrid";

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
  const tempData: any = { movie: [], tv: [], person: [] };
  data.forEach(entry => {
    tempData[entry.media_type].push(entry);
  });
  return tempData;
};

const SearchTermPage = async ({ params }: Props) => {
  const { searchTerm } = params;
  const searchResults = await fetchData(searchTerm);

  const createTabTitles = (results: SortedResults) => {
    const tabTitles = [];
    if (results.movie.length > 0) tabTitles.push("Movies");
    if (results.tv.length > 0) tabTitles.push("TV Shows");
    if (results.person.length > 0) tabTitles.push("People");
    return tabTitles;
  };

  const movies = searchResults.movie.map(movie => (
    <MediaCardMUI
      media={movie}
      key={movie.id}
    />
  ));
  const tvShows = searchResults.tv.map(show => (
    <MediaCardMUI
      media={show}
      key={show.id}
    />
  ));
  const people = searchResults.person.map(person => (
    <PeopleCard
      person={person}
      key={person.id}
    />
  ));

  return (
    <TabDisplay tabNames={createTabTitles(searchResults)}>
      {movies && <CardGrid>{movies}</CardGrid>}
      {tvShows && <CardGrid>{tvShows}</CardGrid>}
      {people && <CardGrid>{people}</CardGrid>}
    </TabDisplay>
  );
};
export default SearchTermPage;
