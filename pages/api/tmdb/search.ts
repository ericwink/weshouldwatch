import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const tmdbKey = process.env.MOVIE_DB_API;

export default async function search(req: NextApiRequest, res: NextApiResponse) {
  const { searchTerm } = req.query;
  console.log({ searchTerm });
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${tmdbKey}&language=en-US&page=1&include_adult=false&query=${searchTerm}`);
    //send an array of objects back to the client
    res.send(data.results);
  } catch (error: any) {
    const status = error.response.status;
    const message = error.response.data.status_message;
    res.status(status).send(message);
  }
}
