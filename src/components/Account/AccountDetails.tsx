"use client";

import { Paper, TextField, Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserAccount } from "../../lib/interface";
import ImageUploader from "@/src/components/Account/ImageUploader";
import UserAvatar from "./UserAvatar";
import { toast } from "react-toastify";

interface Props {
  userInfo: UserAccount;
}

const supabase = createClientComponentClient();

const AccountDetails = ({ userInfo }: Props) => {
  const [userName, setUserName] = useState<string>(userInfo.user_public_profile.user_name ?? "");

  const updateUsername = async () => {
    const { data, error } = await supabase.from("user_public_profile").update({ user_name: userName }).eq("user_id", userInfo.id);

    if (error) toast.error(`${error.message}`, { theme: "colored" });
    if (!error) toast.success(`Username updated!`, { theme: "colored" });
  };

  return (
    <Paper sx={{ minWidth: "300px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, p: 2 }}>
      <Typography
        variant="h4"
        component="h2"
        mb={1}
      >
        Account Details
      </Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="h6">{userInfo.email}</Typography>
      </Box>
      <TextField
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <Button onClick={() => updateUsername()}>Update Username</Button>
      <UserAvatar
        height={100}
        width={100}
      />
      <ImageUploader user={userInfo as UserAccount} />
    </Paper>
  );
};

export default AccountDetails;
