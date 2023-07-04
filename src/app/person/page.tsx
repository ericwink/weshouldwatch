import TabDisplay from "@/src/components/TabDisplay";
import CardGrid from "@/src/components/CardGrid";
import MediaCardMUI from "@/src/components/MediaCardMUI";
import { Movie, TV } from "@/src/lib/interface";
import PersonBio from "@/src/components/PersonBio";

interface TVCredits {
  cast?: TV[];
  crew?: TV[];
  id: number;
}
interface MovieCredits {
  cast?: Movie[];
  crew?: Movie[];
  id: number;
}

const fetchData = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${tmdbKey}&language=en-US`;
  const result = await fetch(url, { next: { revalidate: 28800 } });
  return result.json();
};

const fetchMovieCredits = async (id: string): Promise<MovieCredits> => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${tmdbKey}&language=en-US`;
  const result = await fetch(url, { next: { revalidate: 28800 } });
  return result.json();
};

const fetchTVCredits = async (id: string): Promise<TVCredits> => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${tmdbKey}&language=en-US`;
  const result = await fetch(url, { next: { revalidate: 28800 } });
  return result.json();
};

const PersonPage = async () => {
  const personBio = await fetchData("person", "976");
  const movieCredits = await fetchMovieCredits("976");
  const tvCredits = await fetchTVCredits("976");

  function consolidateMedia(media: (Movie | TV)[], type: "movie" | "tv") {
    interface Tracker {
      [id: string]: number;
    }
    const hashmap: Tracker = {};
    let result = [];

    for (let each of media) {
      if (!hashmap[each.id]) {
        hashmap[each.id] = 1;
        const mediaData = each as Movie & TV; //type assertion
        const media = {
          poster_path: mediaData.poster_path,
          title: mediaData.title ?? mediaData.name,
          vote_average: mediaData.vote_average,
          release_date: mediaData.release_date ?? mediaData.first_air_date,
          id: mediaData.id,
          media_type: type,
        };
        if (media.release_date) result.push(media); //some entries don't have a release date so we cut them out
      }
    }
    return result;
  }

  const handleCredits = (credits: MovieCredits | TVCredits, type: "movie" | "tv") => {
    let cast: (Movie | TV)[] = [];
    let crew: (Movie | TV)[] = [];

    if (credits.cast) {
      cast = credits.cast;
    }

    if (credits.crew) {
      crew = credits.crew;
    }

    const mediaArray = consolidateMedia([...cast, ...crew], type);

    mediaArray.sort((a, b) => {
      const dateA = parseInt(a.release_date.slice(0, 4));
      const dateB = parseInt(b.release_date.slice(0, 4));
      return dateB - dateA;
    });

    return mediaArray;
  };

  const consolidatedMovies = handleCredits(movieCredits, "movie");
  const consolidatedTV = handleCredits(tvCredits, "tv");

  return (
    <main>
      <TabDisplay tabNames={["Bio", "Movies", "TV"]}>
        <PersonBio person={personBio} />
        <CardGrid>
          {consolidatedMovies.map(media => (
            <MediaCardMUI
              media={media}
              key={media.id}
            />
          ))}
        </CardGrid>
        <CardGrid>
          {consolidatedTV.map(media => (
            <MediaCardMUI
              media={media}
              key={media.id}
            />
          ))}
        </CardGrid>
      </TabDisplay>
    </main>
  );
};

export default PersonPage;
