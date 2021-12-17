import { DiscordID, UserBio, UserID } from "./UserVO";
import { MSID } from "./MobileSuitVO";
import {OpenSNSSettings} from "./Union";

export interface User  {
  _id: UserID;
  twitterId: string;
  twitterName: string;
  grade?: string;
  rank?: string;
  discordId?: DiscordID;
  openSNSSettings: OpenSNSSettings;
  favoriteMS: Array<MSID>;
  bio?: UserBio;
  createdAt: string;
  updatedAt: string;
}
