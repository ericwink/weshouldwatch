import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import AcceptInvite from "@/src/components/AcceptInvite";

interface Props {
  searchParams: { token: string };
}

// http://localhost:3000/invite?token=${body.record.id}

//make sure that the email on the invite matches the email of the user
//if no, return a note that the invite is not found
//if yes, return the invite and give the user the option to accept it

interface Invite {
  created_at: string;
  created_by: string;
  email: string;
  group_id: number;
  id: string;
  user_public_profile: {
    created_at: string | null;
    profile_pic: string | null;
    user_id: string;
    user_name: string;
  };
}

export default async function invitePage({ searchParams }: Props) {
  const { token } = searchParams;
  const supabase = createServerComponentClient<Database>({ cookies });
  let { data: invite_to_group, error } = await supabase.from("invite_to_group").select("*, user_public_profile ( * )").eq("id", token).single();
  console.log(invite_to_group);

  if (!invite_to_group) return <h1>You're not on the list</h1>;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <AcceptInvite invite={invite_to_group as Invite} />
    </div>
  );
}
