import { Schema } from "mongoose";
import { UserID } from "./UserVO";
import { MSID } from "./MobileSuitVO";

export type ThreadID = {
  value: Schema.Types.ObjectId;
  _meta: "ThreadID";
};

export type ThreadAuthor = {
  value: UserID;
  _meta: "ThreadAuthor";
};

export type ThreadTitle = {
  value: string;
  _meta: "ThreadTitle";
};

export type ThreadBody = {
  value: string;
  _meta: "ThreadBody";
};

export type PlayStyle = {
  value: "ガチ" | "エンジョイ";
  _meta: "PlayStyle";
};

export type ThreadStyle = {
  value: "相方募集" | "プラベ";
  _meta: "ThreadStyle";
};

export type IsVC = {
  value: boolean;
  _meta: "IsVC";
};

export type IsPlaying = {
  value: boolean;
  _meta: "IsPlaying";
};

export type AllowUsers = {
  value: Array<UserID>;
  _meta: "AllowUsers";
};

export type UseMS = {
  value: Array<MSID>;
  _meta: "UseMS";
};

export type Position = {
  value: "前衛" | "後衛" | "どちらでも";
  _meta: "Position";
};

export type GameMode = {
  value: "カジュアル" | "ランクマッチ" | "クロブフェス" | "何でも";
  _meta: "GameMode";
};

export type TagCode = {
  value: string;
  _meta: "TagCode";
};

export type CreatedAt = {
  value: string;
  _meta: "CreatedAt";
};

export type UpdatedAt = {
  value: string;
  _meta: "UpdatedAt";
};

export type StartedAt = {
  value: string;
  _meta: "StartedAt";
};

export type FinishedAt = {
  value: string;
  _meta: "FinishedAt";
};
