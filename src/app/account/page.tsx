import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserAccount } from "@/src/lib/interface";
import { Paper, Typography } from "@mui/material";
import UserAvatar from "@/src/components/Account/UserAvatar";
import ImageUploader from "@/src/components/Account/ImageUploader";
import SubscriptionDetails from "@/src/components/Account/SubscriptionDetails";
import ManagePlan from "@/src/components/Account/ManagePlan";
import UpdateUsername from "@/src/components/Account/UpdateUsername";

const AccountPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  // await new Promise(resolve => setTimeout(resolve, 5000));

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  let { data, error: fetchError } = await supabase.from("users").select("*, user_public_profile (profile_pic, user_name)").single();
  if (error) throw new Error(error.message);
  const user: UserAccount = data;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Paper sx={{ minWidth: "300px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, p: 2 }}>
        <Typography
          variant="h4"
          component="h2"
          mb={1}
        >
          Account Details
        </Typography>
        <Typography variant="h6">{user.email}</Typography>
        <UpdateUsername userInfo={user} />

        <UserAvatar
          height={100}
          width={100}
        />
        <ImageUploader user={user} />
        {user.is_subscribed && (
          <>
            {/* @ts-expect-error Server Component */}
            <SubscriptionDetails userAccount={user} />
            <ManagePlan />
          </>
        )}
      </Paper>
    </div>
  );
};

export default AccountPage;
