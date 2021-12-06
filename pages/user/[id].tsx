import { useUser } from "../../hooks/swrHooks";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { css } from "@emotion/react";
import { MSImagePath } from "../../util/returnPath";
import { MobileSuit } from "../../models/MobileSuit";

const UserCardStyle = css`
  width: 400px;
  border: solid 1px #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;

const UserId: React.FC = () => {
  const router = useRouter();
  const id: string = router.query.id as string;

  const { user, isLoading, isError } = useUser(id);

  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;
  return (
    <div css={UserCardStyle}>
      <div>{user.twitter}</div>
      <div>{user.message}</div>
      <div>{user.grade}</div>
      <div>{user.rank}</div>
      {user.favoriteMS!.map((MS: MobileSuit, idx: number) => (
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

export default UserId;
