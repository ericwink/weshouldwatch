"use client";

import { Box, InputLabel, MenuItem, FormControl, TextField, Button, CircularProgress, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, ChangeEvent } from "react";
import { inviteToGroup } from "../../lib/serverActions";
import { useUserAccount } from "../../lib/tanstackHooks";
import { toast } from "react-toastify";

interface Props {
  groups: { created_at: string | null; created_by: string | null; group_name: string; id: number }[] | null;
}

export default function InviteToAGroup({ groups }: Props) {
  const { data: user } = useUserAccount();
  const [group, setGroup] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!user) return <h1>Pending user data</h1>;
  if (!groups) return <h1>Create a group first!</h1>;

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const isDisabled = group === null || email === "";
  const button = isPending ? <CircularProgress /> : "Send Email";

  const menuItems = groups.map(group => {
    if (group.created_by === user.id) return <MenuItem value={group.id}>{group.group_name}</MenuItem>;
  });

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError({ error: false, message: "" });
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail && group !== "") {
      sendInvite();
    } else {
      setError({ error: true, message: "Please set valid email and group selection" });
    }
  };

  const sendInvite = async () => {
    setIsPending(true);
    const result = await inviteToGroup(parseInt(group), email);
    if (result.error) {
      toast.error(`${result.message}`, { theme: "colored" });
    } else {
      setSuccess(true);
    }
    setIsPending(false);
  };

  const reset = () => {
    setEmail("");
    setGroup("");
    setSuccess(false);
  };

  if (!groups)
    return (
      <Box sx={{ minWidth: 120, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography textAlign="center">{`You haven't created any groups yet!`}</Typography>
      </Box>
    );

  if (success)
    return (
      <Box sx={{ minWidth: 120, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography textAlign="center">{`Invitation sent!`}</Typography>
        <Button onClick={reset}>Send Another?</Button>
      </Box>
    );

  return (
    <form
      action=""
      onSubmit={e => e.preventDefault()}
    >
      <Box sx={{ minWidth: 120, display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="select-group-label">Group</InputLabel>
          <Select
            labelId="select-group"
            id="select-group"
            value={group}
            label="Group"
            onChange={handleChange}
            disabled={isPending}
          >
            {menuItems}
          </Select>
        </FormControl>
        <TextField
          label="email"
          variant="outlined"
          type="email"
          error={error.error}
          helperText={error.error && error.message}
          onChange={handleInput}
          fullWidth
          disabled={isPending}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          {button}
        </Button>
      </Box>
    </form>
  );
}
