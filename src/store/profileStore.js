import { create } from "zustand";
import { devtools } from "zustand/middleware";

const profileStore = (set) => ({
  profile: {},
  addProfileInfo: (info) => {
    set(() => ({
      profile: info,
    }));
  },
  removeProfileInfo: () => {
    set(() => ({ profile: {} }));
  },
});

const useProfileStore = create(devtools(profileStore));

export default useProfileStore;
