"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import type { MediaPayload } from "./interface";
import { z } from "zod";
import axios from "axios";

const supabase = createServerComponentClient<Database>({ cookies });

const searchTerm = z.string();
type SearchTerm = z.infer<typeof searchTerm>;

const getSearchSuggestions = async (searchTerm: SearchTerm) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/search/keyword?query=${searchTerm}&page=1&?api_key=${tmdbKey}`;

  const data = await axios.get(url);
  console.log(data);
};
