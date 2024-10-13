import GroupMediaCard from "./GroupMediaCard";
import { MediaOptions } from "./page";
import { getMedia } from "../_server/getMedia.server";

interface Props {
  groupId: string;
  mediaType: MediaOptions;
  watched: boolean | undefined;
}

const GroupMediaReturn = async ({ groupId, watched, mediaType }: Props) => {
  const media = await getMedia({ groupId, mediaType, watched });

  return (
    <>
      {media.map((m) => (
        <GroupMediaCard mediaData={m} key={m.id} />
      ))}
    </>
  );
};

export default GroupMediaReturn;

export type MediaReturn = Awaited<ReturnType<typeof getMedia>>;
