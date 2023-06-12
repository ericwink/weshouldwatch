"use client";
import { TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useTransition } from "react";

interface Props {
  addGroup(name: string): Promise<void>;
}

const MakeGroup = ({ addGroup }: Props) => {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  if (isPending) return <Typography>Loading...</Typography>;

  return (
    <form
      action=""
      onSubmit={e => e.preventDefault()}
    >
      <TextField
        label="Group name..."
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button onClick={() => startTransition(() => addGroup(name))}>Create Group!</Button>
    </form>
  );
};

export default MakeGroup;
