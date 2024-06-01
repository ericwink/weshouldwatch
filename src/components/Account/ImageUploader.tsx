"use client";

export const revalidate = 0;

import { Button, CircularProgress } from "@mui/material";
import { UserAccount } from "@/src/lib/interface";
import { useUpdateUserAvatar } from "@/src/hooks";

interface Props {
  user: UserAccount;
}

const ImageUploader = ({ user }: Props) => {
  const { changeAvatar, isLoading } = useUpdateUserAvatar({ userAccount: user });

  return (
    <Button
      fullWidth
      variant="contained"
      component="label"
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress color="inherit" /> : "Update Avatar"}
      <input
        type="file"
        accept="image/png, image/jpg"
        hidden
        onChange={e => changeAvatar(e)}
      />
    </Button>
  );
};

export default ImageUploader;
