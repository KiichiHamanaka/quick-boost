import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import { User } from "../types/User";
import { GameMode, PlayStyle, Position } from "../types/Union";
import { MobileSuit, MSImagePath } from "../types/MobileSuit";
import { ThreadID } from "../types/thread/Thread";

type ThreadProps = {
  ThreadId: ThreadID;
  threadAuthor: User;
  title: string;
  playStyle: PlayStyle; //色
  useMS: Array<MobileSuit>;
  isVC: boolean;
  position: Position;
  startedAt: Date;
  finishedAt: Date;
  isPlaying: boolean;
  gameMode: GameMode; //色
};

const ThreadCard = (props: ThreadProps) => {
  const bgColor = props.playStyle === "ガチ" ? "#FFCCCC" : "#CCFFFF";
  const ThreadCardStyle = css`
    width: 400px;
    border: solid 1px #2d2d2d;
    border-radius: 4px;
    background-color: ${bgColor};
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
  `;

  return (
    <Link href={`/thread/${props.ThreadId}`} passHref>
      <div css={ThreadCardStyle}>
        {props.isPlaying ? <p>現在プレイ中！</p> : <p>現在募集中！</p>}
        <div>{props.threadAuthor.twitterName}</div>
        <div>{props.title}</div>
        <div>階級：{props.threadAuthor.grade}</div>
        <div>ランク：{props.threadAuthor.rank}</div>
        <div>モード：{props.gameMode}</div>
        {props.useMS.map((MS: MobileSuit, idx: number) => {
          return (
            <div key={idx}>
              <div>{MS.name}</div>
              <Image
                src={MSImagePath(MS)}
                alt={MS.name}
                width={50}
                height={50}
              />
            </div>
          );
        })}
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
