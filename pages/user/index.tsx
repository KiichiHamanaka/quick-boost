import React from "react";
import UserCard from "../../components/UserCard";
import { useUsers } from "../../hooks/swrHooks";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { findMobileSuitFromMSID } from "../../util/findItem";
import { nonNullable } from "../../types/util";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

// const date = dayjs().tz().format("YYYY-MM-DD-HH-mm-ss");

const UserIndex: React.FC = () => {
  const { users, isLoadingUsers, isErrorUsers } = useUsers();
  if (isLoadingUsers) return <div>Loading Animation</div>;
  if (isErrorUsers) return <div>Error</div>;
  return (
    <div>
      {users?.map((user, idx) => {
        const fms =
          user.favoriteMS
            .map((msid) => findMobileSuitFromMSID(msid))
            .filter(nonNullable);
        return (
          <UserCard
            key={idx}
            twitterId={user.twitterId}
            twitterName={user.twitterName}
            bio={user.bio}
            grade={user.grade}
            rank={user.rank}
            favoriteMS={fms}
          />
        );
      })}
    </div>
  );
};

export default UserIndex;
