import { useQuery } from "@tanstack/react-query";
import { getUserAccount } from "./supabaseClientHelper";
import { UserAccount } from "./interface";

// export const useUserAccount = (initialData: UserAccount | undefined = undefined) =>
//   useQuery({
//     queryKey: ["userAccount"],
//     queryFn: getUserAccount,
//     // staleTime: 15 * 60 * 1000,
//     initialData: initialData,
//   });
