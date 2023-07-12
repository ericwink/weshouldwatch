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
