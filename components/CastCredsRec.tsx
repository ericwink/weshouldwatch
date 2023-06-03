import TabDisplay from "./TabDisplay";
import CardGrid from "./CardGrid";
import PeopleCard from "./PeopleCard";
import MediaCardMUI from "./MediaCardMUI";

const fetchCredits = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${tmdbKey}&language=en-US`;
  const results = await fetch(url, { next: { revalidate: 28800 } });
  const creditsData = await results.json();
  return creditsData;
};

const fetchRecommended = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${tmdbKey}&language=en-US`;
  const results = await fetch(url, { next: { revalidate: 28800 } });
  const recommended = await results.json();
  return recommended.results;
};

interface Props {
  media_id: string;
  media_type: string;
}

const CastCredsRec = async ({ media_id, media_type }: Props) => {
  const recommended = await fetchRecommended(media_type, media_id);
  const { cast, crew } = await fetchCredits(media_type, media_id);

  return (
    <TabDisplay
      tabOne="Cast"
      tabTwo="Crew"
      tabThree="Recommended"
    >
      <CardGrid>
        {cast.map(person => (
          <PeopleCard
            person={person}
            key={person.id}
          />
        ))}
      </CardGrid>
      <CardGrid>
        {crew.map(person => (
          <PeopleCard
            person={person}
            key={person.id}
          />
        ))}
      </CardGrid>
      <CardGrid>
        {recommended.map(media => (
          <MediaCardMUI
            media={media}
            key={media.id}
          />
        ))}
      </CardGrid>
    </TabDisplay>
  );
};

export default CastCredsRec;

// TabDisplay
// CardGrid
//map cast => PeopleCard
// CardGrid
//map cast => PeopleCard
// CardGrid
//map recs => MediaCard
