import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import GroupEntry from "../GroupEntry/GroupEntry";
import useFetchGroups from "@/hooks/useFetchGroups";

interface Props {
  mediaInfo: {
    id: string;
    title: string;
    poster_path: string;
  };
}

const AddToGroupContainer = ({ mediaInfo }: Props) => {
  const { data: session } = useSession();
  const [addClick, setAddClick] = useState(false);
  const { loading, error, groups } = useFetchGroups(session?.user?.email, addClick);

  const addToGroup = async (groupID: string) => {
    try {
      const add = await axios.post("/api/group/addMedia", { groupID: groupID, mediaID: mediaInfo.id, title: mediaInfo.title, poster_path: mediaInfo.poster_path });
      setAddClick(prev => !prev);
      console.log(add);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  if (groups) {
    return (
      <div style={{ backgroundColor: "white" }}>
        {groups.map(each => {
          return (
            <GroupEntry
              {...each}
              onClick={addToGroup}
              movieID={mediaInfo.id}
            />
          );
        })}
      </div>
    );
  }

  return <h1>No groups available</h1>;
};

export default AddToGroupContainer;
