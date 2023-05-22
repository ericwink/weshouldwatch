import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import GroupCard from "@/components/GroupCard/GroupCard";
import { GroupInfo } from "@/lib/interface";

const MyGroupsPage = async () => {
  const session = await getServerSession(authOptions);

  const fetchGroups = async () => {
    const email = session?.user.email;
    const url = `http://localhost:3000/api/user/fetchGroups?email=${email}`;
    const result = await fetch(url, { next: { tags: ["userGroups"], revalidate: 3600 } });
    return result.json();
  };

  const groupData: GroupInfo[] = await fetchGroups();
  return (
    <main className="container py-4 max-w-4xl">
      <h1>My Groups Page</h1>
      <p>{session?.user?.email}</p>

      <ul className="flex flex-col gap-4">
        {groupData.map(group => {
          return <GroupCard {...group} />;
        })}
      </ul>
    </main>
  );
};

export default MyGroupsPage;
