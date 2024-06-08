import AddMediaGroupEntry from "./AddMediaGroupEntry";
import ListWrapper from "../../ListWrapper";
import type { MediaPayload } from "../../../lib/interface";
import { Typography } from "@mui/material";
import { getUserSession, getGroupsAndMedia } from "@/src/lib";

interface Props {
  media_id: number;
  mediaPayload: MediaPayload;
}

const AddMediaContainer = async ({ media_id, mediaPayload }: Props) => {
  const { data: session, error } = await getUserSession();

  if (!session) return <p>Log in to add media to a group!</p>;

  const { data: groupsAndMovies, error: groupsError } = await getGroupsAndMedia();

  if (!groupsAndMovies || groupsAndMovies.length < 1) return <Typography>No groups yet!</Typography>;

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
