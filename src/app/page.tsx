import TabDisplay from "@/src/components/TabDisplay";
import CardGrid from "../components/Cards/CardGrid";
import MediaCardMUI from "@/src/components/Cards/MediaCardMUI";
import PeopleCard from "@/src/components/Cards/PeopleCard";
const getData = async (mediaType: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/trending/${mediaType}/day?include_adult=false&api_key=${tmdbKey}`;
  const result = await fetch(url, { next: { revalidate: 3600 } });
  const media = await result.json();
  // await new Promise(resolve => setTimeout(resolve, 10000));
  return media.results;
};

const muiPage = async () => {
  const movies = await getData("movie");
  const people = await getData("person");
  const shows = await getData("tv");

  return (
    <main>
      <TabDisplay tabNames={["Trending Movies", "Trending TV", "Trending People"]}>
        <CardGrid>
          {movies.map((movie: any) => (
            <MediaCardMUI
              media={movie}
              key={movie.id}
            />
          ))}
        </CardGrid>
        <CardGrid>
          {shows.map((show: any) => (
            <MediaCardMUI
              media={show}
              key={show.id}
            />
          ))}
        </CardGrid>
        <CardGrid>
          {people.map((person: any) => (
            <PeopleCard
              person={person}
              key={person.id}
            />
          ))}
        </CardGrid>
      </TabDisplay>
    </main>
  );
};

export default muiPage;
