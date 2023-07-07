import TabDisplay from "@/src/components/TabDisplay";
import CardGrid from "@/src/components/Cards/CardGrid";
import MediaCardMUI from "@/src/components/Cards/MediaCardMUI";
import { Movie, TV, TVCredits, MovieCredits } from "@/src/lib/interface";
import PersonBio from "@/src/components/PersonBio";
import { fetchMediaData } from "@/src/lib/tmdbHelper";
import { fetchCredits } from "@/src/lib/tmdbHelper";

interface Props {
  params: { id: string };
}

const PersonPage = async ({ params: { id } }: Props) => {
  const personBio = await fetchMediaData("person", id);
  const movieCredits = await fetchCredits(id, "movie_credits");
  const tvCredits = await fetchCredits(id, "tv_credits");

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
