import { css } from "@emotion/react";
import Link from "next/link";
import { MobileSuit } from "../models/MobileSuit";
import { MSImagePath } from "../util/returnPath";
import { Thread } from "../models/Thread";
import Image from "next/image";

type ThreadProps = Pick<
  Thread,
  | "id"
  | "threadAuthor"
  | "title"
  | "playStyle" //色
  | "useMS"
  | "isVC"
  | "allowUsers"
  | "position"
  | "startedAt"
  | "finishedAt"
  | "isPlaying"
  | "gameMode" //色
>;

const ThreadCard = (props: ThreadProps) => {
  const bgColor = props.playStyle === "ガチ" ? "#FFCCCC" : "#CCFFFF";
  const FindCardStyle = css`
    width: 400px;
    border: solid 1px #2d2d2d;
    border-radius: 4px;
    background-color: ${bgColor};
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
  `;

  return (
    <Link href={`/thread/${props.id}`} passHref>
      <div css={FindCardStyle}>
        <div>{props.threadAuthor.twitterName}</div>
        <div>ひとこと：{props.title}</div>
        <div>階級：{props.threadAuthor.grade}</div>
        <div>ランク：{props.threadAuthor.rank}</div>
        <div>モード：{props.gameMode}</div>
        {props.useMS!.map((MS: MobileSuit, idx: number) => (
          <div key={idx}>
            <div>{MS.name}</div>
            <div>{MS.series.name}</div>
            <Image
              src={MSImagePath(MS.name, MS.series)}
              alt={MS.name}
              width={50}
              height={50}
            />
          </div>
        ))}
        {props.isVC ? (
          <Image src={"/assets/Logo/discord.jpeg"} alt={"VC可能"} />
        ) : (
          <Image src={"/assets/cantDiscord.png"} alt={"VC不可"} />
        )}
      </div>
    </Link>
  );
};

export default ThreadCard;
