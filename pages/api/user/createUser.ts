import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, email, password, image } = req.body;
  console.log(username, password, image);

  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: password,
        email: email,
        image: image,
      },
    });
    console.log(newUser);
    res.json({ message: "user created" });
  } catch (error: any) {
    console.log(error);
    res.json({ message: error.message });
  }
};

export default createUser;
