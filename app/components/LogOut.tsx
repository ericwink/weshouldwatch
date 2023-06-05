import { supabase } from "@/lib/supabase";
import { Button } from "@mui/material";

const logout = async () => {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

const LogOut = async () => {
  const currentUser = await getUser();

  console.log({ currentUser });
  return (
    <button>LogOut</button>
    // <Button
    //   variant="contained"
    //   onClick={logout}
    // >
    //   Log Out
    // </Button>
  );
};

export default LogOut;
