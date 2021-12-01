import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import Find from "../type/Find";
import MobileSuit from "../type/MobileSuit";

const FindCard = (props: Find) => {
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
        <div>{props.user.name}</div>
        <div>ひとこと：{props.message}</div>
        <div>階級：{props.user.grade}</div>
        <div>ランク：{props.user.rank}</div>
        <div>モード：{props.enjoyType}</div>
        {props.mobileSuites.map((MS: MobileSuit, idx: number) => (
          <div key={idx}>
            <div>{MS.name}</div>
            <div>{MS.series}</div>
            <Image src={MS.imagePath} alt={MS.name} width={50} height={50} />
          </div>
        ))}
        {/*{props.isVC ? (*/}
        {/*  <Image src={"/assets/canDiscord.png"} />*/}
        {/*) : (*/}
        {/*  <Image src={"/assets/cantDiscord.png"} />*/}
        {/*)}*/}
      </div>
    </Link>
  );
};

export default FindCard;
