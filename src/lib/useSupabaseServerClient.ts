import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";

const useSupabaseServerClient = async () => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  return { supabaseServerClient };
};

export default useSupabaseServerClient;
