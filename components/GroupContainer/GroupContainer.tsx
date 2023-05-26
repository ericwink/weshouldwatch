import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import styles from "./style.module.css";
import GroupSendContainer from "../GroupSendContainer/GroupSendContainer";

interface Collection {
  id: string;
  watched: boolean;
}

interface Group {
  collection: Collection[];
  id: string;
  name: string;
}

interface Props {
  mediaInfo: {
    mediaId: string;
    title: string;
    poster_path: string;
    genres: string[];
    mediaType: string;
  };
}

const GroupContainer = async ({ mediaInfo }: Props) => {
  const session = await getServerSession(authOptions);

  const fetchGroups = async () => {
    const email = session?.user.email;
    const url = `http://localhost:3000/api/user/fetchGroups?email=${email}`;
    const result = await fetch(url, { next: { tags: ["userGroups"], revalidate: 3600 } });
    return result.json();
  };

  const groupData: Group[] = await fetchGroups();

  return (
    <GroupSendContainer
      mediaInfo={mediaInfo}
      groupData={groupData}
      email={session?.user?.email}
    />
  );
};

export default GroupContainer;
