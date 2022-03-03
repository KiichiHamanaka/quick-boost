import { OpenSNSSettings } from "./Union";
import mongoose from "mongoose";

export interface UserType {
  _id: mongoose.Types.ObjectId;
  twitterUID: number;
  twitterId: string;
  twitterName: string;
  grade?: string;
  rank?: string;
  discordId?: string;
  openSNSSettings?: OpenSNSSettings;
  favoriteMS: Array<number>;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}
