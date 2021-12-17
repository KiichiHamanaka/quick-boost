import { DiscordID, UserBio, UserID } from "../ValueObject/UserVO";
import { MSID } from "../ValueObject/MobileSuitVO";
import { OpenSNS } from "./Union";
import { Document } from "mongoose";
import { Grade } from "./Grade";
import { Rank } from "./Rank";
import { MobileSuit } from "./MobileSuit";

export interface User extends Document {
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
}
