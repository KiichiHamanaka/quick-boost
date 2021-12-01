import MobileSuit from "./MobileSuit";

type User = {
  id: number;
  name: string;
  rank?: Rank;
  grade?: Grade;
  discordName?: string;
  openSNSName: "Free" | "Friends" | "No";
  mobileSuites?: Array<MobileSuit>;
  message: string;
  good: number;
  friends: Array<User>;
};

type Rank = {}; //C1~EXX
type Grade = {}; //民間人~大元帥

export default User;
