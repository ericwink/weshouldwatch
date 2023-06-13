"use client";
import { TextField, Button, Typography, CircularProgress, Box } from "@mui/material";
import { useState } from "react";
import { addGroup } from "../../lib/serverActions";

const MakeGroup = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const result = await addGroup(name);
    if (result.error) {
      setError({ ...result });
    } else {
      setSuccess(true);
    }
    setIsLoading(false);
  };

  if (success) return <Typography>Group created!</Typography>;

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
          error={error.error}
          helperText={error.error ? error.message : null}
          onChange={e => setName(e.target.value)}
        />
        <Button
          disabled={isLoading}
          onClick={handleClick}
          type="submit"
        >
          {isLoading ? <CircularProgress /> : "Create Group!"}
        </Button>
      </Box>
    </form>
  );
};

export default MakeGroup;
