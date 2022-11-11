import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "userState",
  default: {
    id: 0,
    email: "",
    name: "",
  },
  effects_UNSTABLE: [persistAtom],
});
