import React from "react";
import FindCard from "../../components/FindCard";
import { useUsers } from "../../hooks/swrHooks";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import axios from "axios";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const date = dayjs().tz().format("YYYY-MM-DD-HH-mm-ss");

const testUser = {
  twitter: "dogages",
  handleName: "KIE",
  openSNSName: "Free",
};

const click = () => {
  axios.post("http://localhost:3000/users", testUser).then((res) => {
    console.log("response body:", res.data);
  });
};

const UserIndex: React.FC = () => {
  const { users, isLoading, isError } = useUsers();
  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;
  const res: Array<any> = users.result;
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
            author={find.author}
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
      <button onClick={() => click}>つくるよん</button>
    </div>
  );
};

export default UserIndex;
