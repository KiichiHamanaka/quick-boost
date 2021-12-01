type User = {
  id: number;
  name: string;
  rank?: Rank;
  grade?: Grade;
  discordName?: string;
};

type Rank = {}; //C1~EXX
type Grade = {}; //民間人~大元帥

export default User;
