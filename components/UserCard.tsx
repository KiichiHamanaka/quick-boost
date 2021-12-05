import { css } from "@emotion/react";
import Link from "next/link";
import { MobileSuit } from "../models/MobileSuit";
import { MSImagePath } from "../util/returnPath";
import { User } from "../models/User";
import Image from "next/image";
import React from "react";

type UserProps = Pick<
  User,
  "twitter" | "handleName" | "message" | "grade" | "rank" | "favoriteMS"
>;

const UserCard = (props: UserProps) => {
  const UserCardStyle = css`
    width: 400px;
    border: solid 1px #2d2d2d;
    border-radius: 4px;
    background-color: whitesmoke;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
  `;

  return (
    <Link href={`/find/${props.twitter}`} passHref>
      <div css={UserCardStyle}>
        <div>{props.twitter}</div>
        <div>{props.message}</div>
        <div>{props.grade}</div>
        <div>{props.rank}</div>
        {
          // @ts-ignore
          props.favoriteMS.map((MS: MobileSuit, idx: number) => (
            <div key={idx}>
              <div>{MS.name}</div>
              <div>{MS.series}</div>
              <Image
                src={MSImagePath(MS.name, MS.series)}
                alt={MS.name}
                width={50}
                height={50}
              />
            </div>
          ))
        }
      </div>
    </Link>
  );
};

export default UserCard;
