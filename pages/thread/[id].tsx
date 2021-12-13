import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { css } from "@emotion/react";
import { MobileSuit } from "../../models/MobileSuit";
import { MSImagePath } from "../../util/returnPath";
import { useThread } from "../../hooks/swrHooks";

const FindCardStyle = css`
  width: 400px;
  border: solid 1px #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;

const FindId = () => {
  const router = useRouter();
  const id: string = router.query.id as string;

  const { res, isLoading, isError } = useThread(id);
  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;
  return (
    <div css={FindCardStyle}>
      <div>{res.threadAuthor.twitterId}</div>
      <div>{res.threadAuthor.twitterName}</div>
      <div>{res.title}</div>
      <div>{res.threadAuthor.grade}</div>
      <div>{res.threadAuthor.rank}</div>
      <div>{res.body}</div>
      {res.useMS!.map((MS: MobileSuit, idx: number) => (
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
      ))}
    </div>
  );
};

export default FindId;
