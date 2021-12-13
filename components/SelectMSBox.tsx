import { css } from "@emotion/react";
import { MobileSuit } from "../models/MobileSuit";
import { MSImagePath } from "../util/returnPath";
import Image from "next/image";
import { useMobileSuits } from "../hooks/swrHooks";
import { useEffect, useState } from "react";

// お気に入り機体から選ぶも必要？

//MobileSuitを継承して選んだか判定する属性が必要そう
type MobileSuit2 = MobileSuit & {
  select: boolean;
};

type cost = 1500 | 2000 | 2500 | 3000;

type option = {
  series: Array<string | null>;
  costs: Array<cost | null>;
};

const SelectMSBox = () => {
  const { res, isLoading, isError } = useMobileSuits();
  const [mobileSuits, setMobileSuits] = useState<Array<MobileSuit>>(res);
  const [params, setParams] = useState<option>({
    series: [],
    costs: [],
  });
  const [selectMobileSuits, setSelectMobileSuits] = useState<Array<MobileSuit>>(
    []
  );

  const FindCardStyle = css`
    width: 400px;
    border: solid 1px #2d2d2d;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
  `;

  const clickHandler = (MS: MobileSuit) =>
    setSelectMobileSuits([...selectMobileSuits, MS]);

  const MSFilter = (params: option) => {
    setMobileSuits(
      mobileSuits
        .filter((MS) => params.costs.includes(MS.cost))
        .filter((MS) => params.series.includes(MS.series.name))
    );
  };

  useEffect(() => {
    MSFilter(params);
  }, [params]);

  return (
    <div css={FindCardStyle}>
      主に使いたい機体を選択してください
      {mobileSuits.map((MS: MobileSuit, idx: number) => (
        <div key={idx} onClick={() => clickHandler(MS)}>
          <Image src={MSImagePath(MS.name, MS.series)} alt={MS.name} />
        </div>
      ))}
    </div>
  );
};

export default SelectMSBox;
