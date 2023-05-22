import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { GroupInfo } from "@/lib/interface";

interface Props {
  params: { group_id: string };
}

const GroupIdPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const { group_id } = params;

  const fetchGroups = async () => {
    const email = session?.user.email;
    const id = group_id.toString();
    const url = `http://localhost:3000/api/group/fetchCollection?groupID=${id}`;
    // const result = await fetch(url, { next: { tags: [id], revalidate: 3600 } });
    const result = await fetch(url, { cache: "no-store" });
    return result.json();
  };

  const groupData: GroupInfo[] = await fetchGroups();

  return <h1>My group ID page {JSON.stringify(groupData)}</h1>;
};

export default GroupIdPage;
