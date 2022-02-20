import { useUser } from "../../hooks/swrHooks";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";

import { nonNullable } from "../../types/util";
import {
  findMobileSuitFromMSID,
  MobileSuit,
  MSImagePath,
} from "../../types/MobileSuit";
import { applyUserID } from "../../types/User";

const UserCardStyle = css`
  width: 400px;
  border: solid 1px #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;

const UserId: React.FC = () => {
  const router = useRouter();
  const id: string = router.query.id as string;
  const uid = applyUserID(id);

  const { user, isLoadingUser, isErrorUser } = useUser(uid);
  const [favoriteMS, setFavoriteMS] = useState<MobileSuit[]>([]);

  if (isLoadingUser) return <div>Loading Animation</div>;
  if (isErrorUser) return <div>Error</div>;
  return (
    <div css={UserCardStyle}>
      <div>{user.twitterId}</div>
      <div>{user.twitterName}</div>
      <div>{user.grade}</div>
      <div>{user.rank}</div>
      <div>{user.bio}</div>
      {favoriteMS.length
        ? favoriteMS.map((MS, idx) => (
            <Image
              key={idx}
              src={MSImagePath(MS)}
              alt={MS.name}
              width={50}
              height={50}
            />
          ))
        : "このユーザはお気に入りMSを設定していません"}
    </div>
  );
};

export default UserId;
