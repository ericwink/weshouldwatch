import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUserStore } from "@/src/lib/store";
import type { UserAccount } from "../lib/interface";
import { getUserAccount } from "@/src/lib/supabaseClientHelper";
import { useMutation } from "@tanstack/react-query";

interface Args {
  userAccount: UserAccount;
}

const useUpdateUserAvatar = (args: Args) => {
  const supabase = createClientComponentClient();
  const setUser = useUserStore(state => state.setUser);
  const { userAccount } = args;

  const emptyFolder = async () => {
    const { data: files, error } = await supabase.storage.from("avatars").list(`${userAccount.id}`);
    if (files) {
      files.forEach(async image => {
        await supabase.storage.from("avatars").remove([`${userAccount.id}/${image.name}`]);
      });
    }
  };

  const updateProfilePath = async (path: string) => {
    const { data, error } = await supabase.from("user_public_profile").update({ profile_pic: path }).eq("user_id", userAccount.id);
    if (error) throw new Error(error.message);
  };

  const { mutate: changeAvatar, isLoading } = useMutation({
    mutationFn: async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const avatarFile = e.target.files[0];
        await emptyFolder();

        const { data, error } = await supabase.storage.from("avatars").upload(`${userAccount.id}/${avatarFile.name}`, avatarFile, {
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

  return { changeAvatar, isLoading };
};

export default useUpdateUserAvatar;
