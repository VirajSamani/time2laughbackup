import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { apiCall } from "../utils/apiCall";

const authStore = (set) => ({
  user: undefined,
  addUserInfo: (user) => {
    set((state) => ({
      user: { ...state.user, ...user },
    }));
  },
  removeUserInfo: () => {
    localStorage.clear();
    set(() => ({ user: {} }));
  },
  login: (cred, navigate) => {
    apiCall("users/login", "POST", cred).then((response) => {
      if (response?.accessToken) {
        localStorage.setItem("authToken", response.accessToken);
        navigate("/");
      }
    });
  },
});

const useAuthStore = create(devtools(authStore));

export default useAuthStore;
