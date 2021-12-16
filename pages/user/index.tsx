import React from "react";
import UserCard from "../../components/UserCard";
import { useUsers } from "../../hooks/swrHooks";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

// const date = dayjs().tz().format("YYYY-MM-DD-HH-mm-ss");

const UserIndex: React.FC = () => {
  const { res, isLoading, isError } = useUsers();
  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;
  return (
    <div>
      {res?.map((user, idx) => {
        return (
          <UserCard
            key={idx}
            twitterId={user.twitterId}
            twitterName={user.twitterName}
            bio={user.bio}
            grade={user.grade}
            rank={user.rank}
            favoriteMS={user.favoriteMS}
          />
        );
      })}
    </div>
  );
};

export default UserIndex;
