import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import AcceptInvite from "@/src/components/AcceptInvite";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { token: string };
}
// http://localhost:3000/invite?token=${body.record.id}

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
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
    error: accountError,
  } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  const { token } = searchParams;
  let { data: invitations, error } = await supabase.from("invite_to_group").select("*, user_public_profile ( * )").eq("id", token);

  if (!invitations) return <h1>{`No invitations found for your email address`}</h1>;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {invitations.map(invitation => (
        <AcceptInvite invite={invitation as Invite} />
      ))}
    </div>
  );
}
