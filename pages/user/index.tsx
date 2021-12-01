import React from "react";
import FindCard from "../../components/FindCard";
import Find from "../../types/Find";
import { useUsers } from "../../hooks/swrHooks";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

const date = dayjs().tz("Asia/Tokyo").format("YYYY-MM-DD-HH-mm-ss");

const UserIndex: React.FC = () => {
  const { users, isLoading, isError } = useUsers();
  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;
  const res: Array<Find> = users.result;
  return (
    <div>
      {res?.map((find, idx) => {
        return (
          <FindCard
            key={idx}
            id={find.id}
            mobileSuites={find.mobileSuites}
            enjoyType={find.enjoyType}
            message={find.message}
            user={find.user}
            body={find.body}
            isVC={find.isVC}
            allowUsers={[]}
            created_at={date}
            start_at={date}
            end_at={date}
            isPlay
            position={"Both"}
          />
        );
      })}
    </div>
  );
};

export default UserIndex;
