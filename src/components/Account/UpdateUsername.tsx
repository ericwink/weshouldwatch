"use client";

import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { UserAccount } from "../../lib/interface";
import { useUpdateUsername } from "@/src/hooks";

interface Props {
  userInfo: UserAccount;
}

const UpdateUsername = ({ userInfo }: Props) => {
  const [userName, setUserName] = useState<string>(userInfo.user_public_profile.user_name ?? "");

  const { loading, updateUsername } = useUpdateUsername({ userAccount: userInfo, userName });

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
