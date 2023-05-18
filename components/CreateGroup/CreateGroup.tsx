"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { createGroup } from "@/lib/server-actions";

const CreateGroup = () => {
  const { data: session } = useSession();

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form action={handleSubmit}>
        <input
          type="text"
          placeholder="group name..."
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateGroup;
