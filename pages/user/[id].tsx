import { useUser } from "../../hooks/swrHooks";
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

const UserId: React.FC = () => {
  const router = useRouter();
  const id = Number(router.query);
  const { user, isLoading, isError } = useUser(id);

  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;
  return (
    <div css={FindCardStyle}>
      <div>{user.name}</div>
      <div>{user.message}</div>
      <div>{user.grade}</div>
      <div>{user.rank}</div>
      <div>{user.body}</div>
      {user.mobileSuites.map((MS: MobileSuit, idx: number) => (
        <div key={idx}>
          <div>{MS.name}</div>
          <div>{MS.series}</div>
          <Image src={MS.image} alt={MS.name} width={50} height={50} />
        </div>
      ))}
    </div>
  );
};

export default UserId;
