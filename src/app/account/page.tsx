"use client";

import { Paper, TextField, Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import ImageUploader from "@/src/components/ImageUploader";
import UserAvatar from "@/src/components/UserAvatar";
import { useUser } from "@/src/context/user";
import { User } from "@/src/lib/interface";

import { redirect } from "next/navigation";

const supabase = createClientComponentClient();

const updateUsername = async (username: string, userId: string) => {
  const { data, error } = await supabase.from("user_public_profile").update({ user_name: username }).eq("user_id", userId);

  if (error) console.log(error);
  if (!error) alert("username updated!");
};

const AccountPage = () => {
  const { user }: { user: User } = useUser();
  if (!user) redirect("/login");

  const [userName, setUserName] = useState(user.user_public_profile.user_name);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Paper sx={{ minWidth: "300px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, p: 2 }}>
        <Typography
          variant="h4"
          component="h2"
          mb={1}
        >
          Account Details
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="h6">{user.email}</Typography>
        </Box>
        <TextField
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <Button onClick={() => updateUsername(userName, user.id)}>Update Username</Button>
        <UserAvatar
          height={100}
          width={100}
        />
        <ImageUploader />
      </Paper>
    </div>
  );
};

export default AccountPage;
