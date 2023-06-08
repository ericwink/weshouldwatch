"use client";

// tell nextJS not to cache fetch request on this page
export const revalidate = 0;

import { supabase } from "@/lib/supabase";
import MakeGroup from "../components/MakeGroup";

const readAllRows = async () => {
  //   let { data: group, error } = await supabase.from("group").select("*");
  //   return group;

  let { data: user_group_join, error } = await supabase.from("user_group_join").select("*");
  return user_group_join;
};

const groupsPage = async () => {
  const data = await readAllRows();

  return (
    <>
      <h1>Group Page</h1>
      <MakeGroup />
      {JSON.stringify(data, null, 2)}
    </>
  );
};

export default groupsPage;
