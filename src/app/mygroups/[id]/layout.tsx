import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import MainGroupNav from "./MainGroupNav";

interface Props {
  children: ReactNode;
  params: {
    id: string;
  };
}

const GroupLayout = async ({ params, children }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) redirect("/login");

  //if user isn't subscribed, check the primary groups. If this isn't one of the primary groups, block access
  let { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .single();
  if (!user?.is_subscribed) {
    if (
      user?.primary_created !== params.id &&
      user?.primary_joined !== params.id
    )
      redirect("/accessDenied");
  }

  return (
    <section className="w-full flex flex-col items-center justify-center gap-3">
      <MainGroupNav groupId={params.id} />
      {children}
    </section>
  );
};

export default GroupLayout;
