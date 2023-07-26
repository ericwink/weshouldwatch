"use client";
import { TextField, Button, CircularProgress, Box } from "@mui/material";
import { useState } from "react";
import { createGroup } from "../../lib/serverActions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const MakeGroup = () => {
  const [name, setName] = useState("");

  const { mutate: handleCreate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await createGroup(name);
      if (response.error) throw new Error(response.message);
    },
    onSuccess: () => {
      toast.success("Group created successfully!", { theme: "colored" });
      setName("");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message, { theme: "colored" });
    },
  });

  return (
    <form
      action=""
      onSubmit={e => e.preventDefault()}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
      >
        <TextField
          label="Group name..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button
          disabled={isLoading || !name}
          onClick={() => handleCreate()}
          type="submit"
        >
          {isLoading ? <CircularProgress /> : "Create Group!"}
        </Button>
      </Box>
    </form>
  );
};

export default MakeGroup;
