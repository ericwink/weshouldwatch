import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addMedia = async (req: NextApiRequest, res: NextApiResponse) => {
  const { groupID, mediaID, title, poster_path } = req.body;

  try {
    const updateGroup = await prisma.group.update({
      where: {
        id: groupID,
      },
      data: {
        media: {
          push: {
            id: mediaID,
            poster_path: poster_path,
            title: title,
            watched: false,
          },
        },
      },
    });

    res.send({ message: "movie added to group" });
  } catch (error: any) {
    console.log(error);
    res.send({ message: error.message });
  }
};

export default addMedia;
