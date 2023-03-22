import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const tmdbKey = process.env.MOVIE_DB_API;

export default async function findByID(req: NextApiRequest, res: NextApiResponse) {
  const { mediaType, id } = req.query;
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=${tmdbKey}`);
    //send single object
    res.send(data);
  } catch (error: any) {
    const status = error.response.status;
    const message = error.response.data.status_message;
    res.status(status).send(message);
  }
}

// 980078?media_type=movie