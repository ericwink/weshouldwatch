"use server";

import { revalidateTag } from "next/cache";

export async function addMediaToGroup(groupID: string, mediaID: string, title: string, poster_path: string) {
  const payload = { groupID: groupID, mediaID: mediaID, title: title, poster_path: poster_path };
  const url = "http://localhost:3000/api/group/addMedia";
  // console.log("from the action page", url, payload);
  const result = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ ...payload }),
    cache: "no-cache",
  });
  revalidateTag("userGroups");

  if (result.ok) {
    return true;
  } else {
    return false;
  }
}

export async function createGroup(userEmail: string, groupName: string) {
  // const email = session?.user?.email;
  // const { data } = await axios.post("/api/group/createGroup", { email: email, groupName: input });
  // console.log(data);
}
