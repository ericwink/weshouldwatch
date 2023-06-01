import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const addMedia = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, reason, groupID, mediaID, title, poster_path, genres, mediaType } = req.body;

  let mediaToAdd = null

  try {
    mediaToAdd = await prisma.media.findUnique({
      where: {
        tmdb_id: mediaID,
      },
    });

    if (!mediaToAdd) {
      mediaToAdd = await prisma.media.create({
        data: {
          tmdb_id: mediaID,
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

    const foundGroup = await prisma.group.findUnique({
      where: {
        id: groupID
      }
    })

    const addedMedia = await prisma.added_media.create({
      data: {
        added_reason: reason,
        watched: false,
        added_by: foundUser?.id,
        groupId: foundGroup?.id,
        mediaId: mediaToAdd.id
      }
    })

    //update the group by pushing the added media id

    const foundGroup = await prisma.group.update({
      where: {
        id: groupID,
      },
      data: {
        added_media: {
          push: {
            addedMedia.id
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
