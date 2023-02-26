import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password, image } = req.body;
  console.log(username, password, image);

  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: password,
        image: image,
      },
    });
    console.log(newUser);
  } catch (error) {
    console.log(error);
  }

  res.json({ message: "test" });
};

export default createUser;
