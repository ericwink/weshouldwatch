import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createGroup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, groupName } = req.body;

  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const newGroup = await prisma.group.create({
      data: {
        name: groupName,
        userIDs: currentUser?.id,
      },
    });

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        groupIDs: {
          push: newGroup.id,
        },
      },
    });

    res.json({ message: "group created!" });
  } catch (error: any) {
    console.log(error);
    res.json({ message: error.message });
  }
};

export default createGroup;
