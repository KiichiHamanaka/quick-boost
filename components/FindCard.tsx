import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import Find from "../type/Find";
import MobileSuit from "../type/MobileSuit";

const FindCard = (props: Find) => {
  const bgColor = props.enjoyType === "ガチ" ? "red" : "white";
  const FindCardStyle = css`
    width: 400px;
    border: solid;
    background-color: ${bgColor};
  `;

  return (
    <Link href={`/find/${props.id}`} passHref>
      <div css={FindCardStyle}>
        <div>{props.user.name}</div>
        <div>{props.message}</div>
        <div>{props.user.grade}</div>
        <div>{props.user.rank}</div>
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
