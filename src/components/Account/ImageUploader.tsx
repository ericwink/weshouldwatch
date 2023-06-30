"use client";

export const revalidate = 0;

import { Button, CircularProgress } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAccount } from "@/src/lib/interface";

interface Props {
  user: UserAccount;
}

const ImageUploader = ({ user }: Props) => {
  const queryClient = useQueryClient();
  const supabase = createClientComponentClient();

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
    if (error) console.log(error);
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
      const fullPath = `https://zojrocbtklqjgxfijsje.supabase.co/storage/v1/object/public/avatars/${data!.path}`;
      await updateProfilePath(fullPath);
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ["userAccount"] });
    },
  });

  return (
    <Button
      variant="contained"
      component="label"
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
