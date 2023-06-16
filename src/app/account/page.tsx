export const revalidate = 0;
import ImageUploader from "@/src/components/ImageUploader";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";

const supabase = createServerComponentClient<Database>({ cookies });

const fetchUserAccount = async () => {
  let { data: users, error } = await supabase.from("users").select("*, user_public_profile (profile_pic, user_name)").single();
  if (error) console.log(error);
  return users;
};

const AccountPage = async () => {
  const userData = await fetchUserAccount();

  return (
    <div>
      <span>{JSON.stringify(userData, null, 2)}</span>
      <ImageUploader />
    </div>
  );
};

export default AccountPage;
