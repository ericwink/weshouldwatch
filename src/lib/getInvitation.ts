import useSupabaseServerClient from "./useSupabaseServerClient";

interface Args {
  token: string;
}

const getInvitation = async (args: Args) => {
  const { token } = args;
  const { supabaseServerClient } = await useSupabaseServerClient();

  let { data, error } = await supabaseServerClient.from("invite_user_to_group").select("*, user_public_profile ( * )").eq("id", token).single();

  return { data, error };
};

export default getInvitation;
