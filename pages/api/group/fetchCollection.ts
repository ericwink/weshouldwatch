import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const fetchCollection = async (req: NextApiRequest, res: NextApiResponse) => {
  const { groupID } = req.query;
  console.log(groupID);

  const findMedia = async (id: string) => {
    return await prisma.media.findUnique({
      where: {
        id: id,
      },
    });
  };

  try {
    const foundGroup = await prisma.group.findUnique({
      where: {
        id: groupID,
      },
    });

    //opted for a for..of loop here rather than .map for readability and to avoid use of Promise.all
    const collection = [];
    if (foundGroup) {
      for (const each of foundGroup?.collection) {
        let data = await findMedia(each.id);
        collection.push({ ...data, watched: each.watched });
      }
    }

    const data = { groupID: foundGroup?.id, groupName: foundGroup?.name, collection: collection };

    res.send({ data });
  } catch (error: any) {
    console.log(error);
    res.send({ message: error.message });
  }
};

export default fetchCollection;
