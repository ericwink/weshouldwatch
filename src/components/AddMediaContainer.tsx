import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import AddMediaGroupEntry from "./AddMediaGroupEntry";
import ListWrapper from "./ListWrapper";
import type { MediaPayload } from "../lib/interface";

const supabase = createServerComponentClient<Database>({ cookies });

interface Props {
  media_id: number;
  mediaPayload: MediaPayload;
}

const fetchGroupsAndMovies = async () => {
  let { data: group, error } = await supabase.from("group").select(`
    id, group_name, group_media ( media_id )`);
  return group;
};

const AddMediaContainer = async ({ media_id, mediaPayload }: Props) => {
  const groupsAndMovies = await fetchGroupsAndMovies();

  return (
    <ListWrapper>
      {groupsAndMovies?.map(group => (
        <AddMediaGroupEntry
          key={group.id}
          media_id={media_id}
          {...group}
          mediaPayload={mediaPayload}
        />
      ))}
    </ListWrapper>
  );
};

export default AddMediaContainer;
