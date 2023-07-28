import TabDisplay from "@/src/components/TabDisplay";
import CardGrid from "@/src/components/Cards/CardGrid";
import PeopleCard from "@/src/components/Cards/PeopleCard";
import MediaCardMUI from "@/src/components/Cards/MediaCardMUI";
import MediaData from "@/src/components/MediaData";
import { fetchMediaData } from "@/src/lib/tmdbHelper";

interface Props {
  params: { media_id: string };
  searchParams: { media_type: string };
}

const mediaPage = async ({ params, searchParams }: Props) => {
  const { media_type } = searchParams;
  const { media_id } = params;

  const mediaData = await fetchMediaData(media_type, media_id);
  const { results: recommmendations } = await fetchMediaData(media_type, media_id, "recommendations");
  const { cast, crew } = await fetchMediaData(media_type, media_id, "credits");

  interface CrewMember {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    jobs: string[];
  }

  const dedupeCrewAndJobs = (crew: any[]) => {
    const dedupedCrew: { [key: number]: CrewMember } = {};

    for (const person of crew) {
      if (dedupedCrew[person.id]) {
        dedupedCrew[person.id].jobs.push(person.job);
      } else {
        dedupedCrew[person.id] = { ...person, jobs: [person.job] };
      }
    }
    return Object.values(dedupedCrew);
  };

  const createTabTitles = () => {
    const tabTitles = [];
    if (mediaData) tabTitles.push("Summary");
    if (cast.length > 0) tabTitles.push("Cast");
    if (crew.length > 0) tabTitles.push("Crew");
    if (recommmendations.length > 0) tabTitles.push("Recommended");
    return tabTitles;
  };

  return (
    <main>
      <TabDisplay tabNames={createTabTitles()}>
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
          {dedupeCrewAndJobs(crew).map((person: any) => (
            <PeopleCard
              person={person}
              key={person.id}
            />
          ))}
        </CardGrid>
        <CardGrid>
          {recommmendations.map((media: any) => (
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

export default mediaPage;
