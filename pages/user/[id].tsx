import { useUser } from "../../hooks/swrHooks";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MobileSuit, MSImagePath } from "../../types/MobileSuit";
import { Oval } from "react-loader-spinner";

const UserId: React.FC = () => {
  const router = useRouter();
  const id: string = router.query.id as string;

  const { user, isLoadingUser, isErrorUser } = useUser(id);
  const [favoriteMS, setFavoriteMS] = useState<MobileSuit[]>([]);

  if (isLoadingUser) return <Oval color="#00BFFF" height={80} width={80} />;

  if (isErrorUser) return <div>Error</div>;
  return (
    <div>
      <div>{user.twitterId}</div>
      <div>{user.name}</div>
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
