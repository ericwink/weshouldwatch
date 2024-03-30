"use client";

import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserAccount } from "../../lib/interface";
import { toast } from "react-toastify";

interface Props {
  userInfo: UserAccount;
}

const supabase = createClientComponentClient();

const UpdateUsername = ({ userInfo }: Props) => {
  const [userName, setUserName] = useState<string>(userInfo.user_public_profile.user_name ?? "");
  const [loading, setLoading] = useState(false);

  const updateUsername = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("user_public_profile").update({ user_name: userName }).eq("user_id", userInfo.id);

    if (error) toast.error(`${error.message}`, { theme: "colored" });
    if (!error) toast.success(`Username updated!`, { theme: "colored" });
    setLoading(false);
  };

  return (
    <>
      <TextField
        fullWidth
        disabled={loading}
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <Button
        disabled={loading}
        onClick={() => updateUsername()}
      >
        Update Username
      </Button>
    </>
  );
};

export default UpdateUsername;
