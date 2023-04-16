import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface GroupData {
  groupId: string;
  invitedUserEmail: string;
  groupName: string;
}

const Invite = () => {
  const router = useRouter();
  const { token } = router.query;
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [data, setData] = useState<GroupData | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    fetchInvitation();
  }, [router.isReady]);

  const fetchInvitation = async () => {
    try {
      const { data } = await axios.get("/api/group/fetchInvite", { params: { token } });
      setData(data);
      setMessage(data.message);
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  const acceptInvite = async () => {
    try {
      const { data } = await axios.post("/api/group/acceptInvite", { email: session?.user?.email, invitationToken: token });
      console.log(data);
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  if (error) return <h1>{error}</h1>;
  if (session?.user?.email !== data?.invitedUserEmail) return <h1>Current user email does not match invitation</h1>;
  if (message) return <h1>{message}</h1>;

  return (
    <>
      <h1>You have been invited to join the group {data?.groupName}</h1>
      <button onClick={acceptInvite}>ACCEPT INVITE</button>
    </>
  );
};

export default Invite;
