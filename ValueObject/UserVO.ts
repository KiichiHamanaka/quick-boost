import { Schema } from "mongoose";

export type UserID = {
  value: Schema.Types.ObjectId;
  _meta: "UserID";
};

export type UserBio = {
  value: string;
  _meta: "UserBio";
};

// export type OpenSNS = {
//   value: "Open" | "FriendsOnly" | "No";
//   _meta: "OpenSNS";
// };

// export type UserGrade = {
//   value: Grade;
//   _meta: "UserGrade";
// };

// export type UserRank = {
//   value: Rank;
//   _meta: "UserRank";
// };

export type DiscordID = {
  value: string;
  _meta: "DiscordID";
};

// export type TwitterID = {
//   value: string;
//   _meta: "TwitterID";
// };
//
// export type TwitterName = {
//   value: string;
//   _meta: "TwitterName";
// };

// export type FavoriteMS = {
//   value: Array<MobileSuit>;
//   _meta: "FavoriteMS";
// };
