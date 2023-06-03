import TabDisplay from "@/components/TabDisplay";
import CardGrid from "@/components/CardGrid";
import MediaCardMUI from "@/components/MediaCardMUI";
import PeopleCard from "@/components/PeopleCard";

const getData = async (mediaType: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/trending/${mediaType}/day?include_adult=false&api_key=${tmdbKey}`;
  const result = await fetch(url, { next: { revalidate: 86400 } });
  const media = await result.json();
  return media.results;
};

const muiPage = async () => {
  const movies = await getData("movie");
  const people = await getData("person");
  const shows = await getData("tv");

  return (
    <>
      <TabDisplay
        tabOne="Trending Movies"
        tabTwo="Trending TV"
        tabThree="Trending People"
      >
        <CardGrid>
          {movies.map(movie => (
            <MediaCardMUI
              media={movie}
              key={movie.id}
            />
          ))}
        </CardGrid>
        <CardGrid>
          {shows.map(show => (
            <MediaCardMUI
              media={show}
              key={show.id}
            />
          ))}
        </CardGrid>
        <CardGrid>
          {people.map(person => (
            <PeopleCard
              person={person}
              key={person.id}
            />
          ))}
        </CardGrid>
      </TabDisplay>
    </>
  );
};

export default muiPage;
