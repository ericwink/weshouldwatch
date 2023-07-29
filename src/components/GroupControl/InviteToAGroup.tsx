"use client";

import { Box, InputLabel, MenuItem, FormControl, TextField, Button, CircularProgress, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, ChangeEvent } from "react";
import { inviteToGroup } from "../../lib/serverActions";
import { toast } from "react-toastify";
import { useUserStore } from "@/src/lib/store";
import { useMutation } from "@tanstack/react-query";

interface Props {
  groups: { created_at: string | null; created_by: string | null; group_name: string; id: number }[] | null;
}

export default function InviteToAGroup({ groups }: Props) {
  const user = useUserStore(state => state.user);

  const [group, setGroup] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const [email, setEmail] = useState("");

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const isDisabled = group === null || email === "";

  const menuItems = groups?.map(group => {
    if (group.created_by === user?.id) return <MenuItem value={group.id}>{group.group_name}</MenuItem>;
  });

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError({ error: false, message: "" });
    setEmail(e.target.value);
  };

  const { mutate: sendInvite, isLoading } = useMutation({
    mutationFn: async () => {
      const result = await inviteToGroup(parseInt(group), email);
      if (result.error) throw new Error(result.message);
    },
    onSuccess: () => {
      toast.success("Invitation sent successfully!", { theme: "colored" });
      setEmail("");
      setGroup("");
    },
    onError: (error: any) => toast.error(error.message, { theme: "colored" }),
  });

  const handleSubmit = () => {
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail && group !== "") {
      sendInvite();
    } else {
      setError({ error: true, message: "Please set valid email and group selection" });
    }
  };

  if (!user) return <h1>Pending user data</h1>;
  if (!groups)
    return (
      <Box sx={{ minWidth: 120, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography textAlign="center">{`You haven't created any groups yet!`}</Typography>
      </Box>
    );

  return (
    <form
      action=""
      onSubmit={e => e.preventDefault()}
    >
      <Box sx={{ minWidth: 120, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography textAlign="center">Invite to a Group (only here temporarily!)</Typography>
        <FormControl fullWidth>
          <InputLabel id="select-group-label">Group</InputLabel>
          <Select
            labelId="select-group"
            id="select-group"
            value={group}
            label="Group"
            onChange={handleChange}
            disabled={isLoading}
          >
            {menuItems}
          </Select>
        </FormControl>
        <TextField
          label="email"
          variant="outlined"
          type="email"
          value={email}
          error={error.error}
          helperText={error.error && error.message}
          onChange={handleInput}
          fullWidth
          disabled={isLoading}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          {isLoading ? <CircularProgress /> : "Send Email"}
        </Button>
      </Box>
    </form>
  );
}
