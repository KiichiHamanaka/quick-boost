import React, { useEffect, useState } from "react";
import FindCard from "../../components/FindCard";
import { useFinds } from "../../hooks/swrHooks";
import { Find } from "../../models/Find";
import { MobileSuit } from "../../models/MobileSuit";

type option = {
  start_at: Date | null;
  wantToUse: Array<MobileSuit>;
};

const FindIndex: React.FC = () => {
  const { finds, isLoading, isError } = useFinds();
  const [Finds, setFinds] = useState<Array<Find>>(finds);
  const [params, setParams] = useState<option>({
    start_at: null,
    wantToUse: [],
  });
  // useEffect(() => {
  //   setFinds(
  //       finds.filter(find => find.)
  //   ); //Finds をフィルタする
  // }, params);
  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;

  // const aaa = (args:string) => {
  //   setParams()
  // }

  return (
    <div>
      {Finds?.map((find, idx) => {
        return (
          <FindCard
            key={idx}
            id={find.id}
            wantToUse={find.wantToUse}
            enjoyType={find.enjoyType}
            message={find.message}
            author={find.author}
            isVC={find.isVC}
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
