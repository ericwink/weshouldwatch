import { useState, useEffect } from "react";
import { GroupInfo } from "@/utilities/interface";
import axios from "axios";

const useFetchGroups = (email: string | null | undefined, refresh: boolean = false) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [groups, setGroups] = useState<GroupInfo[] | []>([]);

  useEffect(() => {
    if (email) fetchGroups();
  }, [refresh]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const groups = await axios.get("/api/user/fetchGroups", { params: { email: email } });
      setGroups(groups.data);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  return { loading, error, groups };
};

export default useFetchGroups;
