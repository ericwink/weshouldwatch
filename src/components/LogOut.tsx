"use client";

import { Button } from "@mui/material";
import { useUser } from "../context/user";

const LogOut = () => {
  const { logout, user } = useUser();

  return (
    <>
      <Button
        variant="contained"
        onClick={logout}
      >
        Log Out
      </Button>
      {/* <Button
        variant="contained"
        onClick={() => console.log(user)}
      >
        View Session Data From Context
      </Button> */}
    </>
  );
};

export default LogOut;
