// import nodemailer from "nodemailer";

const inviteUser = async () => {
  //   const { groupId, invitedUserEmail } = req.body;
  //   console.log(groupId);
  //   console.log(invitedUserEmail);
  //   //create nodemailer info
  //   const transporter = nodemailer.createTransport({
  //     host: process.env.EMAIL_SERVER_HOST,
  //     port: process.env.EMAIL_SERVER_PORT,
  //     secure: false,
  //     auth: {
  //       user: process.env.EMAIL_SERVER_USER,
  //       pass: process.env.EMAIL_SERVER_PASSWORD,
  //     },
  //   });
  //   const invitationToken = randomBytes(32).toString("hex");
  //   const invitationLink = `http://localhost:3000/invite?token=${invitationToken}`;
  //   //Create email
  //   const message = {
  //     from: process.env.EMAIL_FROM,
  //     to: invitedUserEmail,
  //     subject: "Invitation to join a group on We Should Watch...",
  //     html: `Hello! You have been invited to join a group on "We Should Watch...",
  //     an app to create groups and keep track of media that you want to watch with friends,
  //     family, loved ones, or anyone! <br/><br/> Click <a href="${invitationLink}">here</a> to join!
  //     <br/><br/>Please note this invite will expire in 24 hours!`,
  //   };
  //   try {
  //     const ONE_DAY_IN_SECONDS = 86400;
  //     const expires = new Date(Date.now() + ONE_DAY_IN_SECONDS * 1000);
  //     await prisma.invitation.create({
  //       data: {
  //         groupId,
  //         invitedUserEmail,
  //         invitationToken,
  //         expires,
  //       },
  //     });
  //     const emailInfo = await transporter.sendMail(message);
  //     console.log(emailInfo.response);
  //     res.send({ message: "Invite sent successfully!" });
  //   } catch (error) {
  //     console.log(error);
  //     res.send({ message: "Invite failed to send. Please try again." });
  //   }
};

export default inviteUser;
