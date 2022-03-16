import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { MobileSuit, MSImagePath } from "../types/MobileSuit";

type UserProps = {
  twitterId: string;
  name: string;
  grade?: string;
  rank?: string;
  favoriteMS: Array<MobileSuit>;
  bio?: string;
};

const UserCard = (props: UserProps) => {
  const UserCardStyle = css`
    width: 400px;
    border: solid 1px #2d2d2d;
    border-radius: 4px;
    background-color: whitesmoke;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
  `;

  return (
    <Link href={`/user/${props.twitterId}`} passHref>
      <div css={UserCardStyle}>
        <div>{props.name}</div>
        <div>{props.bio}</div>
        <div>{props.grade}</div>
        <div>{props.rank}</div>
        {props.favoriteMS!.map((MS: MobileSuit, idx: number) => (
          <div key={idx}>
            <div>{MS.name}</div>
            <div>{MS.series}</div>
            <Image src={MSImagePath(MS)} alt={MS.name} width={50} height={50} />
          </div>
        ))}
      </div>
    </Link>
  );
};

export default UserCard;
