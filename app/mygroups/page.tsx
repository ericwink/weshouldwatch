import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { RxPerson } from "react-icons/rx";
import { GrMultimedia } from "react-icons/gr";

const MyGroupsPage = async () => {
  const session = await getServerSession(authOptions);

  const fetchGroups = async () => {
    const email = session?.user.email;
    const url = `http://localhost:3000/api/user/fetchGroups?email=${email}`;
    const result = await fetch(url, { next: { tags: ["userGroups"], revalidate: 3600 } });
    return result.json();
  };

  const groupData = await fetchGroups();
  console.log(groupData);
  return (
    <>
      <h1>My Groups Page</h1>
      <p>{session?.user?.email}</p>

      <ul className="flex flex-col gap-4">
        {groupData.map(group => {
          const mediaCount = group.collection.length;
          const memberCount = group.userIDs.length;
          return (
            <li className="flex flex-col gap-2 border border-black border-solid">
              <h2>{group.name}</h2>
              <div className="flex gap-2 items-center">
                <RxPerson />
                <p>Total Members: {memberCount}</p>
              </div>
              <div className="flex gap-2 items-center">
                <GrMultimedia />
                <p>Media in collection: {mediaCount}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MyGroupsPage;
