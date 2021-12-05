import { useFind } from "../../hooks/swrHooks";
import MobileSuit from "../../types/MobileSuit";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { css } from "@emotion/react";

const FindCardStyle = css`
  width: 400px;
  border: solid 1px #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;

const FindId = () => {
  const router = useRouter();
  const id = Number(router.query);
  const { find, isLoading, isError } = useFind(id);

  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;
  return (
    <div css={FindCardStyle}>
      <div>{find.user.name}</div>
      <div>{find.message}</div>
      <div>{find.user.grade}</div>
      <div>{find.user.rank}</div>
      <div>{find.body}</div>
      {find.mobileSuites.map((MS: MobileSuit, idx: number) => (
        <div key={idx}>
          <div>{MS.name}</div>
          <div>{MS.series}</div>
          <img src={MS.image} alt={MS.name} width={50} height={50} />
        </div>
      ))}
    </div>
  );
};

export default FindId;
