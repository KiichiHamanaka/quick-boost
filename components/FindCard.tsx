import { css } from "@emotion/react";
import Link from "next/link";
import { MobileSuit } from "../models/MobileSuit";
import { MSImagePath } from "../util/returnPath";
import { Find } from "../models/Find";
import Image from "next/image";

type FindProps = Pick<
  Find,
  | "id"
  | "author"
  | "message"
  | "enjoyType"
  | "wantToUse"
  | "isVC"
  | "allowUsers"
  | "position"
  | "start_at"
  | "end_at"
  | "isPlaying"
>;

const FindCard = (props: FindProps) => {
  const bgColor = props.enjoyType === "ガチ" ? "#FFCCCC" : "#CCFFFF";
  const FindCardStyle = css`
    width: 400px;
    border: solid 1px #2d2d2d;
    border-radius: 4px;
    background-color: ${bgColor};
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
  `;

  return (
    <Link href={`/find/${props.id}`} passHref>
      <div css={FindCardStyle}>
        <div>{props.author.handleName}</div>
        <div>ひとこと：{props.message}</div>
        <div>階級：{props.author.grade}</div>
        <div>ランク：{props.author.rank}</div>
        <div>モード：{props.enjoyType}</div>
        {props.wantToUse!.map((MS: MobileSuit, idx: number) => (
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
          <Image src={"/assets/Logo/discord.jpeg"} />
        ) : (
          <Image src={"/assets/cantDiscord.png"} />
        )}
      </div>
    </Link>
  );
};

export default FindCard;
