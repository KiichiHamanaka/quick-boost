import { Schema } from "mongoose";

export type UserID = {
  value: Schema.Types.ObjectId;
  _meta: "UserID";
};

export const applyUserID = (str: string): UserID => {
  const objId = new Schema.Types.ObjectId(str);
  return {
    value: objId,
    _meta: "UserID",
  };
};

export type UserBio = {
  value: string;
  _meta: "UserBio";
};

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
