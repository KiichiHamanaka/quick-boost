import React from "react";
import UserCard from "../../components/UserCard";
import { useUsers } from "../../hooks/swrHooks";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { nonNullable } from "../../types/util";
import { findMobileSuitFromMSID } from "../../types/MobileSuit";
import { Oval } from "react-loader-spinner";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

// const date = dayjs().tz().format("YYYY-MM-DD-HH-mm-ss");
// このページいらんくね？
// 検索ページにする

const UserIndex: React.FC = () => {
  const { users, isLoadingUsers, isErrorUsers } = useUsers();
  if (isLoadingUsers) return <Oval color="#00BFFF" height={80} width={80} />;
  if (isErrorUsers) return <div>Error</div>;
  return (
    <div>
      {users.length
        ? users.map((user, idx) => {
            const fms = user.favoriteMS
              .map((msid) => findMobileSuitFromMSID(msid))
              .filter(nonNullable);
            return (
              <UserCard
                key={idx}
                twitterId={user.twitterId}
                name={user.name}
                bio={user.bio}
                grade={user.grade}
                rank={user.rank}
                favoriteMS={fms}
              />
            );
          })
        : "検索条件に沿う募集は見つかりませんでした"}
    </div>
  );
};

export default UserIndex;
