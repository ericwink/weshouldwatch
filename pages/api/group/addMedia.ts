import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const addMedia = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, reason, groupID, mediaID, title, poster_path, genres, mediaType } = req.body;

  try {
    const foundMedia = await prisma.media.findUnique({
      where: {
        id: mediaID,
      },
    });

    if (!foundMedia) {
      await prisma.media.create({
        data: {
          id: mediaID,
          poster_path: poster_path,
          title: title,
          genres: genres,
          mediaType: mediaType,
        },
      });
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log({ foundUser });

    const foundGroup = await prisma.group.update({
      where: {
        id: groupID,
      },
      data: {
        collection: {
          push: {
            id: mediaID,
            watched: false,
            added_reason: reason,
            added_by: foundUser.id,
          },
        },
      },
    });

    if (!foundGroup) throw new Error("Group not found");

    res.send({ message: "movie added to group" });
  } catch (error: any) {
    if (error.code === "P2025") {
      //handle prisma error for invalid group ID
      res.status(400).json({ error: "Invalid group ID" });
    } else {
      res.status(500).json({ error: error.message });
    }
    // console.log("error in back-end", error);
  }
};

export default addMedia;
