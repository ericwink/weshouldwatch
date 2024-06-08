import useSupabaseServerClient from "./useSupabaseServerClient";

const getUserSession = async () => {
  const { supabaseServerClient } = await useSupabaseServerClient();

  const { data, error } = await supabaseServerClient.auth.getSession();

  return { data, error };
};

export default getUserSession;
