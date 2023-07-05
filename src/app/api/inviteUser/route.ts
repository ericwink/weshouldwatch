import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

interface Invitation {
  record: {
    email: string;
    id: string;
  };
}

export async function POST(req: Request) {
  //  check params sent with Supabase request to ensure it has the secret key
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json({ error: "You are not authorized to call this API" }, { status: 401 });
  }

  //pull contents of body from req, which comes from supabase webhook
  const body: Invitation = await req.json();
  console.log({ body });

  // setup for SendGrid
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  //create link
  const invitationLink = `${process.env.HOST_URL}/invite?token=${body.record.id}`;

  //Create email
  const message = {
    from: process.env.EMAIL_FROM!,
    to: body.record.email,
    subject: "Invitation to join a group on We Should Watch...",
    html: `Hello! You have been invited to join a group on "We Should Watch...", 
    an app to create groups and keep track of media that you want to watch with friends, 
    family, loved ones, or anyone! <br/><br/> Click <a href="${invitationLink}">here</a> to join!
    <br/><br/>Please note this invite will expire in 72 hours!`,
  };

  try {
    // send the email
    await sgMail.send(message);

    // decide if we want to make an update in the supabase table...

    return new Response(`email sent successfully`);
  } catch (error: any) {
    console.log(error);
    return new Response(error.message);
  }
}
