import { useState } from "react";
import { toast } from "react-toastify";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { UserAccount } from "../lib/interface";

interface Args {
  userName: string;
  userAccount: UserAccount;
}

const useUpdateUsername = (args: Args) => {
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();
  const { userName, userAccount } = args;

  const updateUsername = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("user_public_profile").update({ user_name: userName }).eq("user_id", userAccount.id);

    if (error) toast.error(`${error.message}`, { theme: "colored" });
    if (!error) toast.success(`Username updated!`, { theme: "colored" });
    setLoading(false);
  };

  return { updateUsername, loading };
};

export default useUpdateUsername;
