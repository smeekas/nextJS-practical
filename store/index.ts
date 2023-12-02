import create from "zustand";
import { getToken } from "../helper/localStorage";
interface AuthStateType {
  token: string | null;
  userName: string;
  isLoggedIn: boolean;
  login: (arg0: string | null, arg1: string, arg2: string) => void;
  logout: () => void;
  userId: string;
}
const useAuthStore = create<AuthStateType>()((set) => ({
  token: "",
  userName: "itssk",
  isLoggedIn: !!"",
  userId: "",
  login: (token, userName, userId) =>
    set((state) => ({ token, userName, userId, isLoggedIn: !!token })),
  logout: () => set((state) => ({ token: "", isLoggedIn: false })),
}));

export default useAuthStore;


