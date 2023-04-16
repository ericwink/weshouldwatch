import { useEffect, useState } from "react";
import { GroupInfo } from "@/utilities/interface";
import { useSession } from "next-auth/react";
import axios from "axios";
import style from "./inviteForm.module.css";

const InviteForm = () => {
  const { data: session } = useSession();
  const [groups, setGroups] = useState<GroupInfo[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  //split to own file, using twice, here and in AddToGroup
  const fetchGroups = async () => {
    try {
      setLoading(true);
      const groups = await axios.get("/api/user/fetchGroups", { params: { email: session?.user?.email } });
      setGroups(groups.data);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setMessage(error.message);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/group/inviteUser", { invitedUserEmail: email, groupId: selectedGroup });
      setMessage(data.message);
    } catch (error: any) {
      console.log(error);
      setMessage(error.message);
    }
  };

  const options = groups.map(group => {
    return (
      <option
        value={group.id}
        key={group.id}
      >
        {group.name}
      </option>
    );
  });

  if (!session) return <h1>Please sign in to invite</h1>;
  if (loading) return <h1>Loading...</h1>;
  if (message) return <h1>{message}</h1>;

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className={style.form}
    >
      <label
        className={style.label}
        htmlFor="email"
      >
        Email:
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@mail.com"
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label
        className={style.label}
        htmlFor="group"
      >
        Group:
        <select
          name="group"
          id="group"
          className={style.select}
          onChange={e => setSelectedGroup(e.target.value)}
        >
          {options}
        </select>
      </label>
      <button>SEND</button>
    </form>
  );
};

export default InviteForm;
