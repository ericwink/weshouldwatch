import MediaData from "@/app/components/MediaData";
import TabDisplay from "@/app/components/TabDisplay";
import CardGrid from "@/app/components/CardGrid";
import PeopleCard from "@/app/components/PeopleCard";
import MediaCardMUI from "@/app/components/MediaCardMUI";

interface Props {
  params: { media_id: string };
  searchParams: { media_type: string };
}

const fetchData = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${tmdbKey}&language=en-US`;
  const result = await fetch(url, { next: { revalidate: 28800 } });
  // await new Promise(resolve => setTimeout(resolve, 80000));

  return result.json();
};

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

const mediaPage = async ({ params, searchParams }: Props) => {
  const { media_type } = searchParams;
  const { media_id } = params;

  const mediaData = await fetchData(media_type, media_id);
  const recommended = await fetchRecommended(media_type, media_id);
  const { cast, crew } = await fetchCredits(media_type, media_id);

  return (
    <TabDisplay tabNames={["Media Data", "Cast", "Crew", "Recommended"]}>
      <MediaData
        media_type={media_type}
        media_id={media_id}
        mediaData={mediaData}
      />
      <CardGrid>
        {cast.map((person: any) => (
          <PeopleCard
            person={person}
            key={person.id}
          />
        ))}
      </CardGrid>
      <CardGrid>
        {crew.map((person: any) => (
          <PeopleCard
            person={person}
            key={person.id}
          />
        ))}
      </CardGrid>
      <CardGrid>
        {recommended.map((media: any) => (
          <MediaCardMUI
            media={media}
            key={media.id}
          />
        ))}
      </CardGrid>
    </TabDisplay>
  );
};

export default mediaPage;
