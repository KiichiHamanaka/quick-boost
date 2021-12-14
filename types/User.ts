import {
  DiscordID,
  FavoriteMS,
  OpenSNS,
  TwitterID,
  TwitterName,
  UserBio,
  UserGrade,
  UserID,
  UserRank,
} from "../ValueObject/UserVO";

export type User = {
  _id: UserID;
  twitterId: TwitterID;
  twitterName: TwitterName;
  grade?: UserGrade;
  rank?: UserRank;
  discordId?: DiscordID;
  openSNS: OpenSNS;
  favoriteMS?: FavoriteMS;
  bio?: UserBio;
  createdAt: string;
  updatedAt: string;
};
