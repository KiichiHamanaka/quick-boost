import User from "./User";
import MobileSuit from "./MobileSuit";

type Find = {
  id: number;
  user: User;
  message: string;
  body: string;
  enjoyType: "ガチ" | "エンジョイ";
  isVC: boolean;
  isPlay: boolean;
  allowUsers: Array<User>;
  mobileSuites: Array<MobileSuit>;
  position: "Front" | "Back" | "Both";
  created_at: Date;
  start_at: Date;
  end_at: Date; //その日の間だけにしたいね
};

export default Find;
