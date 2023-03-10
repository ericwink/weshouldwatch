import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const fetchGroup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { groupID } = req.body;

  try {
    const findGroup = await prisma.group.findUnique({
      where: {
        id: groupID,
      },
    });

    //does not currently include user information!!!
    console.log({ findGroup });
    res.send({ data: findGroup });
  } catch (error: any) {
    console.log(error);
    res.send({ message: error.message });
  }
};

export default fetchGroup;
