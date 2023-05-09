import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const MyGroupsPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <h1>My Groups Page</h1>
      <p>{session?.user?.email}</p>
    </>
  );
};

export default MyGroupsPage;
