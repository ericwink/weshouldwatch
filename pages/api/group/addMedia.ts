import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const addMedia = async (req: NextApiRequest, res: NextApiResponse) => {
  const { groupID, mediaID, title, poster_path } = req.body;
  console.log(req.body);

  try {
    const foundMedia = await prisma.media.findUnique({
      where: {
        id: mediaID,
      },
    });

    if (!foundMedia) {
      const addMedia = await prisma.media.create({
        data: {
          id: mediaID,
          poster_path: poster_path,
          title: title,
        },
      });
    }

    const updateGroup = await prisma.group.update({
      where: {
        id: groupID,
      },
      data: {
        collection: {
          push: {
            id: mediaID,
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
