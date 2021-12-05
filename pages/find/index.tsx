import React from "react";
import FindCard from "../../components/FindCard";
import Find from "../../types/Find";
import { useFinds } from "../../hooks/swrHooks";

const FindIndex: React.FC = () => {
  const { finds, isLoading, isError } = useFinds();
  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;
  const res: Array<Find> = finds.result;
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
            allowUsers={find.allowUsers}
            created_at={"2022-12-12"}
            start_at={"2022-12-12"}
            end_at={"2022-12-12"}
            isPlay
            position={"Both"}
          />
        );
      })}
    </div>
  );
};

export default FindIndex;
