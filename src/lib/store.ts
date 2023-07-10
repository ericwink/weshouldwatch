import { create } from "zustand";
import { UserAccount } from "./interface";

interface UserState {
  user: UserAccount | null;
  setUser: (user: UserAccount | null) => void;
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({ user }),
}));

//make a store to hold the user account data
//use this data in the user avatar component
//use this data to control what renders in the navbar
//on login, set store with user data
//on logout, set store to null
