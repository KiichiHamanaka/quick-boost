import { OpenSNSSettings } from "./Union";

export interface User {
  _id: UserID;
  twitterId: string;
  twitterName: string;
  grade?: string;
  rank?: string;
  discordId?: DiscordID;
  openSNSSettings: OpenSNSSettings;
  favoriteMS: Array<number>;
  bio?: UserBio;
  createdAt: string;
  updatedAt: string;
}

export type UserID = {
  value: string;
  _meta: "UserID";
};

export const applyUserID = (str: string): UserID => {
  return {
    value: str,
    _meta: "UserID",
  };
};

export type UserBio = {
  value: string;
  _meta: "UserBio";
};

export const applyUserBio = (str: string): UserBio => {
  return {
    value: str,
    _meta: "UserBio",
  };
};

export type DiscordID = {
  value: string;
  _meta: "DiscordID";
};
