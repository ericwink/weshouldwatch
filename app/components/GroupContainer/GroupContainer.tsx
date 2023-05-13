import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import GroupEntry from "@/app/components/GroupEntry/GroupEntry";
import styles from "./style.module.css";

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
  };
}

const GroupContainer = async ({ mediaInfo }: Props) => {
  const session = await getServerSession(authOptions);

  const fetchGroups = async () => {
    const email = session?.user.email;
    const url = `http://localhost:3000/api/user/fetchGroups?email=${email}`;
    const result = await fetch(url, { next: { tags: ["userGroups"], revalidate: 5 } });
    return result.json();
  };

  const data: Group[] = await fetchGroups();
  console.log(data[0]);

  const entries = data.map(each => {
    return (
      <GroupEntry
        {...each}
        mediaInfo={mediaInfo}
        key={each.id}
      />
    );
  });

  return <ul className={styles.container}>{entries}</ul>;
};

export default GroupContainer;
