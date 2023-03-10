import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const tmdbKey = process.env.MOVIE_DB_API;

const trending = async (req: NextApiRequest, res: NextApiResponse) => {
  const { mediaType } = req.query;

  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=${tmdbKey}`);
    //send an array of the data
    res.send(data.results);
  } catch (error: any) {
    const status = error.response.status;
    const message = error.response.data.status_message;
    res.status(status).send(message);
  }
};

export default trending;
