import ActorButton from "@/components/ActorLink/ActorLink";
import PosterButton from "@/components/PosterButton/PosterButton";
import PreviewCard from "@/components/PreviewCard/PreviewCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import Trending from "@/components/Trending/Trending";
import Head from "next/head";

const actorInfo = {
  adult: false,
  gender: 1,
  id: 974169,
  known_for_department: "Acting",
  known_for: null,
  media_type: "person",
  name: "Jenna Ortega",
  original_name: "Jenna Ortega",
  popularity: 174.025,
  profile_path: "/jmLhlMCHgqlHIlneIPpcckpkzaz.jpg",
};

const tvInfo = {
  adult: false,
  backdrop_path: "/7vCSrzwqS5PEm0i5mHlkDfjHcnX.jpg",
  first_air_date: "2022-12-30",
  genre_ids: [18],
  id: 136283,
  media_type: "tv",
  name: "The Glory",
  origin_country: ["KR"],
  original_language: "ko",
  original_name: "더 글로리",
  overview: "After a childhood marked by pain and violence, a woman puts a carefully planned revenge scheme in motion.",
  popularity: 430.662,
  poster_path: "/6jOpyXVzQyYL4QB12VRpHUxdwg1.jpg",
  vote_average: 8.537,
  vote_count: 216,
};

const movieInfo = {
  adult: false,
  backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
  id: 505642,
  title: "Black Panther: Wakanda Forever",
  original_language: "en",
  original_title: "Black Panther: Wakanda Forever",
  overview:
    "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
  poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
  media_type: "movie",
  genre_ids: [28, 12, 878],
  popularity: 3095.305,
  release_date: "2022-11-09",
  video: false,
  vote_average: 7.347,
  vote_count: 3904,
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main>
        <SearchBar />

        <p>Trending Movies...</p>
        <Trending mediaType="movie" />
        <p>Trending TV Shows...</p>
        <Trending mediaType="tv" />
        <p>Trending Actors</p>
        <Trending mediaType="person" />
      </main>
    </>
  );
}
