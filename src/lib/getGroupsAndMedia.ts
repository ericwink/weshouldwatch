import useSupabaseServerClient from "./useSupabaseServerClient";

const getGroupsAndMedia = async () => {
  const { supabaseServerClient } = await useSupabaseServerClient();

  let { data, error } = await supabaseServerClient.from("group").select(`
        id, group_name, group_media ( media_id )`);

  return { data, error };
};

export default getGroupsAndMedia;
