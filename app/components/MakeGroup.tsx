"use client";

import { TextField, Button } from "@mui/material";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

const MakeGroup = () => {
  const [name, setName] = useState("");

  const handleClick = async () => {
    const { data, error } = await supabase.from("group").insert([{ group_name: name }]);
    console.log(data);
    console.log(error);
  };

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
      <Button onClick={handleClick}>Create Group!</Button>
    </form>
  );
};

export default MakeGroup;
