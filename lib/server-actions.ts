"use server";

import axios from "axios";
import { revalidateTag } from "next/cache";

export async function addMediaToGroup(email: string, reason: string, groupID: string, mediaID: string, title: string, poster_path: string, genres: string[], mediaType: string) {
  const payload = { email: email, reason: reason, groupID: groupID, mediaID: mediaID, title: title, poster_path: poster_path, genres: genres, mediaType: mediaType };
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

export async function inviteUser(email: string, id: string) {
  "use server";
  console.log(email, id);
}
