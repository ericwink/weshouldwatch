import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import sgMail from "@sendgrid/mail";

interface InviteDetails {
  email: string;
  id: string;
  group_id: number;
  created_by: string;
}

interface Body {
  group_id: number;
  email: string;
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { group_id, email }: Body = await req.json();

  //check that user exists
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("You are not authorized to make this request", { status: 401 });

  try {
    let { data: group, error: groupFindError } = await supabase.from("group").select("created_by").eq("id", group_id).single();
    if (groupFindError) throw new Error("Group not found, please try again");

    if (group?.created_by !== user.id) return new Response("Only the group owner can invite others", { status: 401 });

    const { data, error } = await supabase
      .from("invite_user_to_group")
      .insert([{ group_id: group_id, email: email }])
      .select()
      .single();
    if (error) {
      console.log(error);
      throw new Error("An error occurred. Please try again.");
    }
    const inviteDetails: InviteDetails = data;
    console.log({ inviteDetails });

    //setup SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    //create invite link
    const invitationLink = `${process.env.HOST_URL}/invite?token=${inviteDetails.id}`;

    const message = {
      from: process.env.EMAIL_FROM!,
      to: inviteDetails.email,
      subject: "Invitation to join a group on We Should Watch...",
      html: `Hello! You have been invited to join a group on "We Should Watch...", 
    an app to create groups and keep track of media that you want to watch with friends, 
    family, loved ones, or anyone! <br/><br/> Click <a href="${invitationLink}">here</a> to join!
    <br/><br/>Please note this invite will expire in 72 hours!`,
    };

    // send the email
    // await sgMail.send(message);

    console.log(message);

    return new Response("Invitation Sent!", { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
