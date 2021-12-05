import React from "react";
import FindCard from "../../components/FindCard";
import { useFinds } from "../../hooks/swrHooks";
import { Find } from "../../models/Find";

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
            wantToUse={find.wantToUse}
            enjoyType={find.enjoyType}
            message={find.message}
            author={find.author}
            isVC={find.isVC}
            allowUsers={find.allowUsers}
            start_at={"2022-12-12"}
            end_at={"2022-12-12"}
            isPlaying={false}
            position={"どちらでも"}
          />
        );
      })}
    </div>
  );
};

export default FindIndex;
