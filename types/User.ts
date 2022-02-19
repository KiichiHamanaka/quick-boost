import { OpenSNSSettings } from "./Union";
import mongoose from "mongoose";

export interface User {
  _id?: UserID;
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

export type UserID = {
  _id: mongoose.Types.ObjectId;
  _meta: "UserID";
};

export const newUserID = (): UserID => {
  return {
    _id: new mongoose.Types.ObjectId(),
    _meta: "UserID",
  };
};

export const applyUserID = (str: string): UserID => {
  return {
    _id: new mongoose.Types.ObjectId(str),
    _meta: "UserID",
  };
};

export type UserBio = {
  _id: string;
  _meta: "UserBio";
};

export const applyUserBio = (str: string): UserBio => {
  return {
    _id: str,
    _meta: "UserBio",
  };
};

export type DiscordID = {
  _id: string;
  _meta: "DiscordID";
};
