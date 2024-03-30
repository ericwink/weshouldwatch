"use client";

export const revalidate = 0;

import { Button, CircularProgress } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation } from "@tanstack/react-query";
import { UserAccount } from "@/src/lib/interface";
import { getUserAccount } from "@/src/lib/supabaseClientHelper";
import { useUserStore } from "@/src/lib/store";

interface Props {
  user: UserAccount;
}

const ImageUploader = ({ user }: Props) => {
  const supabase = createClientComponentClient();
  const setUser = useUserStore(state => state.setUser);

  const emptyFolder = async () => {
    const { data: files, error } = await supabase.storage.from("avatars").list(`${user.id}`);
    if (files) {
      files.forEach(async image => {
        await supabase.storage.from("avatars").remove([`${user.id}/${image.name}`]);
      });
    }
  };

  const updateProfilePath = async (path: string) => {
    const { data, error } = await supabase.from("user_public_profile").update({ profile_pic: path }).eq("user_id", user.id);
    if (error) throw new Error(error.message);
  };

  const { mutate: changeAvatar, isLoading } = useMutation({
    mutationFn: async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const avatarFile = e.target.files[0];
        await emptyFolder();

        const { data, error } = await supabase.storage.from("avatars").upload(`${user.id}/${avatarFile.name}`, avatarFile, {
          cacheControl: "3600",
          upsert: false,
        });

        if (error) {
          throw new Error(error.message);
        }
        return data;
      }
    },
    onSuccess: async data => {
      const fullPath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${data!.path}`;
      await updateProfilePath(fullPath);
      const userData = await getUserAccount();
      setUser(userData);
    },
  });

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
