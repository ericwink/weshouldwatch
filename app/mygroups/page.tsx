// tell nextJS not to cache fetch request on this page
export const revalidate = 0;

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import MakeGroup from "../components/MakeGroup";

const supabase = createServerComponentClient({ cookies });

const readAllRows = async () => {
  let { data: group, error } = await supabase.from("group").select("*");
  return group;
};

const groupsPage = async () => {
  const data = await readAllRows();
  console.log(JSON.stringify(data, null, 2));

  return (
    <>
      <h1>Group Page</h1>
      <MakeGroup />
      <p>{JSON.stringify(data, null, 2)}</p>
    </>
  );
};

export default groupsPage;

//at the moment GROUP has..
////insert for auth users only
////enable read for ALL users

//join table has
////auth.uid = user_id
