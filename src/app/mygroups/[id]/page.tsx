import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";

interface Props {
  params: {
    id: string;
  };
}

const supabase = createServerComponentClient<Database>({ cookies });
const fetchGroupData = async (id: number) => {
  let { data: group_media, error } = await supabase.from("group_media").select(`*,media ( * )`).eq("group_id", id);
  return group_media;
};

const groupPageById = async ({ params: { id } }: Props) => {
  const data = await fetchGroupData(parseInt(id));
  console.log(data);
  return <h1>group page by id</h1>;
};

export default groupPageById;
