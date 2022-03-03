import { OpenSNSSettings } from "../Union";

interface UserCreateDTO {
  twitterUID: number;
  twitterId: string;
  twitterName: string;
  grade?: string;
  rank?: string;
  discordId?: string;
  openSNSSettings: OpenSNSSettings;
  favoriteMSIDs?: Array<number>;
  bio?: string;
}

export default UserCreateDTO;
