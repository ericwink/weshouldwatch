"use client";

import { Button } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "../context/user";

const ImageUploader = () => {
  const supabase = createClientComponentClient();
  const { user, getUserProfile } = useUser();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const avatarFile = e.target.files[0];
      const { data, error } = await supabase.storage.from("avatars").upload(`${user.id}/userAvatarImage`, avatarFile, {
        cacheControl: "3600",
        upsert: true,
      });

      if (data) {
        const fullPath = `https://zojrocbtklqjgxfijsje.supabase.co/storage/v1/object/public/avatars/${data.path}`;
        updateProfilePath(fullPath);
      }

      if (error) console.log(error);
    } else {
      alert("Something went wrong");
    }

    getUserProfile();
  };

  const updateProfilePath = async (path: string) => {
    const { data, error } = await supabase.from("user_public_profile").update({ profile_pic: path }).eq("user_id", user.id);
    if (error) console.log(error);
  };

  return (
    <Button
      variant="contained"
      component="label"
    >
      Update Avatar
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        hidden
        onChange={handleChange}
      />
    </Button>
  );
};

export default ImageUploader;
