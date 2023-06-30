import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import { redirect } from "next/navigation";
import AccountDetails from "@/src/components/Account/AccountDetails";
import { UserAccount } from "@/src/lib/interface";
import { PostgrestError } from "@supabase/supabase-js";

const AccountPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  // await new Promise(resolve => setTimeout(resolve, 5000));

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  let { data: user, error: fetchError }: { data: UserAccount | null; error: PostgrestError | null } = await supabase.from("users").select("*, user_public_profile (profile_pic, user_name)").single();
  if (error) throw new Error(error.message);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <AccountDetails userInfo={user as UserAccount} />
    </div>
  );
};

export default AccountPage;
