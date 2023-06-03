import TabDisplay from "@/components/TabDisplay";
import CardGrid from "@/components/CardGrid";
import MediaCardMUI from "@/components/MediaCardMUI";
import PeopleCard from "@/components/PeopleCard";
import { supabase } from "@/lib/supabase";

const getData = async (mediaType: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/trending/${mediaType}/day?include_adult=false&api_key=${tmdbKey}`;
  const result = await fetch(url, { next: { revalidate: 86400 } });
  const media = await result.json();
  // await new Promise(resolve => setTimeout(resolve, 10000));
  return media.results;
};

// const fetchSupabase = async () => {
//   const { data: movie } = await supabase.from("media").select("*");
//   return movie;
// };

const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data;
};

const muiPage = async () => {
  // const movie = await fetchSupabase();
  // console.log(movie);
  const user = await getUser();
  console.log({ user });
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
