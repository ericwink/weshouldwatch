"use client";

import { Button } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "../context/user";

const ImageUploader = async () => {
  const supabase = createClientComponentClient();
  const { user } = useUser();

  const handleChange = async e => {
    const avatarFile = e.target.files[0];
    const { data, error } = await supabase.storage.from("avatars").upload(`${user.id}/${avatarFile.name}`, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });
    const fullPath = `https://zojrocbtklqjgxfijsje.supabase.co/storage/v1/object/public/avatars/${data.path}`;

    updateProfilePath(fullPath);

    console.log(data);
    if (error) console.log(error);
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
      Upload File
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
