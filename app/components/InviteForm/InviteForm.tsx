"use client";
import { useState, FormEvent } from "react";
import axios from "axios";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

const InviteForm = ({ groupID }: { groupID: string }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/group/inviteUser", { invitedUserEmail: email, groupId: groupID });
      setSuccess(true);
    } catch (error: any) {
      console.log(error);
      setError(true);
    }
  };

  if (success)
    return (
      <div className="flex justify-center items-center h-20">
        <p className="text-green-600">Invite Sent Successfully!</p>
      </div>
    );

  return (
    <div className="h-20">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex justify-between gap-2"
      >
        <Input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="example@mail.com"
          onChange={e => setEmail(e.target.value)}
        />
        <Button variant="outline">SEND</Button>
      </form>
      {error && <p className="text-red-500">Something went wrong, please try again!</p>}
    </div>
  );
};

export default InviteForm;
