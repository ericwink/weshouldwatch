import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createGroup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, groupName } = req.body;

  //find user by email
  const currentUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  //create new group and add user as first member
  try {
    const newGroup = await prisma.group.create({
      data: {
        name: groupName,
        userIDs: currentUser?.id,
      },
    });
    currentUser?.groupIDs.push(newGroup.id);

    console.log({ newGroup });
    console.log({ currentUser });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }

  res.json({ message: "group created!" });
};

export default createGroup;
