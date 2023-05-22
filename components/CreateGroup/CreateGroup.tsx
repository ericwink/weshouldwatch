"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const CreateGroup = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleSubmit = e => {
    e.preventDefault();
    sendData();
    setInput("");
  };

  const sendData = async () => {
    setLoading(true);
    const email = session?.user?.email;
    const { data } = await axios.post("/api/group/createGroup", { email: email, groupName: input });
    setMessage(data.message);
    setLoading(false);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <form action="/something">
        <input
          onChange={e => setInput(e.target.value)}
          type="text"
          value={input}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>

      {message ? <h1>{message}</h1> : null}
    </>
  );
};

export default CreateGroup;
