import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "userState",
  default: {
    id: 0,
    email: "",
    name: "",
    image: "/default.jpg",
    accountStatus: "",
    notificationCount: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
