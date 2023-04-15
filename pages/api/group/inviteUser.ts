import { NextApiRequest, NextApiResponse } from "next";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import prisma from "@/prisma/prisma";

const inviteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { groupId, invitedUserEmail } = req.body;

  //create nodemailer info
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const invitationToken = randomBytes(32).toString("hex");
  const invitationLink = `http://localhost:3000/invite?token=${invitationToken}`;

  //Create email
  const message = {
    from: process.env.EMAIL_FROM,
    to: invitedUserEmail,
    subject: "Invitation to join a group on We Should Watch...",
    html: `Hello! You have been invited to join a group on "We Should Watch...", 
    an app to create groups and keep track of media that you want to watch with friends, 
    family, loved ones, or anyone! <br/><br/> Click <a href="${invitationLink}">here</a> to join!`,
  };

  try {
    await prisma.invitation.create({
      data: {
        groupId,
        invitedUserEmail,
        invitationToken,
      },
    });

    const emailInfo = await transporter.sendMail(message);

    console.log(emailInfo.response);
    res.send({ message: "Email sent" });
  } catch (error) {
    console.log(error);
    res.send({ message: "Email failed to send. Please try again." });
  }
};

export default inviteUser;
