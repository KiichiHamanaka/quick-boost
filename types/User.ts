import { DiscordID, UserBio, UserID } from "../ValueObject/UserVO";
import { MSID } from "../ValueObject/MobileSuitVO";
import { OpenSNS } from "./Union";

export type User = {
  _id: UserID;
  twitterId: string;
  twitterName: string;
  grade?: string;
  rank?: string;
  discordId?: DiscordID;
  openSNS: OpenSNS;
  favoriteMS?: Array<MSID>;
  bio?: UserBio;
  createdAt: string;
  updatedAt: string;
};
