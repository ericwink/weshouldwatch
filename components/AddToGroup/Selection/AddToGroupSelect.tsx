import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface GroupInfo {
  id: string;
  name: string;
}

interface Props {
  mediaInfo: {
    id: string;
    title: string;
    poster_path: string;
  };
}

const AddToGroupSelect = ({ mediaInfo }: Props) => {
  const { data: session } = useSession();
  const [data, setData] = useState<GroupInfo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const groups = await axios.get("/api/user/fetchGroups", { params: { email: session?.user?.email } });
      setData(groups.data);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  const addToGroup = async (groupID: string) => {
    try {
      const add = await axios.post("/api/group/addMedia", { groupID: groupID, mediaID: mediaInfo.id, title: mediaInfo.title, poster_path: mediaInfo.poster_path });
      console.log(add);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  if (data) {
    const groups = data.map(each => {
      return (
        <h1
          key={each.name}
          onClick={() => addToGroup(each.id)}
        >
          {each.name}
        </h1>
      );
    });
    return <div style={{ backgroundColor: "white" }}>{groups}</div>;
  }

  return <h1>No groups available</h1>;
};

export default AddToGroupSelect;
