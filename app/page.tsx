import TabDisplay from "@/app/components/TabDisplay";
import CardGrid from "@/app/components/CardGrid";
import MediaCardMUI from "@/app/components/MediaCardMUI";
import PeopleCard from "@/app/components/PeopleCard";

const getData = async (mediaType: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/trending/${mediaType}/day?include_adult=false&api_key=${tmdbKey}`;
  const result = await fetch(url, { next: { revalidate: 86400 } });
  const media = await result.json();
  // await new Promise(resolve => setTimeout(resolve, 10000));
  return media.results;
};

const muiPage = async () => {
  const movies = await getData("movie");
  const people = await getData("person");
  const shows = await getData("tv");

  return (
    <>
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
    </>
  );
};

export default muiPage;
