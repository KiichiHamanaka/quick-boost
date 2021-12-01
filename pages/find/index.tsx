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
            user={find.user}
            body={find.body}
            isVC={find.isVC}
          />
        );
      })}
    </div>
  );
};

export default FindIndex;
