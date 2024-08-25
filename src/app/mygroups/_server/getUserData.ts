import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/src/lib/database.types";

export const getUserData = async (supabase: SupabaseClient<Database>) => {
    let { data: user, error } = await supabase
    .from("users")
    .select("*")
    .single();

    return {user, error}
}