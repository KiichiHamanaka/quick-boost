import User from "./User";
import MobileSuit from "./MobileSuit";

type Find = {
  id: number;
  user: User;
  message: string;
  body: string;
  enjoyType: "ガチ" | "エンジョイ";
  mobileSuites: Array<MobileSuit>;
};

export default Find;
