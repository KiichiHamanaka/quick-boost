import { css } from "@emotion/react";
import {
  costsImagePath,
  MSImagePath,
  seriesImagePath,
} from "../util/returnPath";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Cost } from "../types/Union";
import { MSDict } from "../dict/MSDict";
import { SeriesDict } from "../dict/SeriesDict";
import {
  filteredMSsFromMSCost,
  filteredMSsFromMSName,
  filterMSsFromSeries,
} from "../util/filterItem";
import { SeriesId } from "../ValueObject/SeriesVO";
import { MSID } from "../ValueObject/MobileSuitVO";
import { useUser } from "../hooks/swrHooks";
import { nonNullable } from "../types/util";
import { MobileSuit } from "../types/MobileSuit";
import { Series } from "../types/Series";

/*
   ユーザー画面とスレッド作成時の二箇所で使いまわしたい
  お気に入り機体から選ぶも必要？
 * 検索ボックスとコストセレクタ,シリーズセレクタが必要
 * useSWRでuser情報を持ってくるそっからfavMSのid取得して
 * favListに突っ込む
 */

const SelectMSBox = () => {
  const msDict: MobileSuit[] = Object.values(MSDict).filter(nonNullable);
  const seriesDict: Series[] = Object.values(SeriesDict).filter(nonNullable);
  const [mobileSuits, setMobileSuits] = useState<MobileSuit[]>(msDict);
  const [cost, setCost] = useState<Cost>("ALL");
  const [seriesId, setSeriesId] = useState<SeriesId | null>(null);
  const [msName, setMsName] = useState<string>("");
  const [selectMobileSuitsId, setSelectMobileSuitsId] = useState<Array<MSID>>(
    []
  );
  // const { res, isLoading, isError } = useUser(session.USERID);
  // const favList = res.favoriteMS;

  const clickHandlerMSID = (msid: MSID) => {
    !selectMobileSuitsId.includes(msid)
      ? setSelectMobileSuitsId([...selectMobileSuitsId, msid])
      : setSelectMobileSuitsId(
          [...selectMobileSuitsId].filter((id) => id !== msid)
        );
  };

  const filterMS = (cost: Cost, msName: string, sid: SeriesId | null) => {
    if (sid) setMobileSuits(filterMSsFromSeries(mobileSuits, sid));
    if (cost !== "ALL")
      setMobileSuits(filteredMSsFromMSCost(mobileSuits, cost));
    if (msName) setMobileSuits(filteredMSsFromMSName(mobileSuits, msName));
  };
  // const callFM = useCallback(
  //     () => filterMS(cost, msName, seriesId),
  //     [cost, msName, seriesId]
  // );

  useEffect(() => {
    filterMS(cost, msName, seriesId);
  }, [cost, msName, seriesId]);

  const FindCardStyle = css`
    width: 400px;
    border: solid 1px #2d2d2d;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
  `;

  const costs: Array<Cost> = ["ALL", "1500", "2000", "2500", "3000"];
  // フォームにしてuser/idにpostする
  return (
    <div css={FindCardStyle}>
      {/*タブにしたい*/}
      <div>
        {costs.map((cost: Cost, idx) => (
          <Image
            key={idx}
            alt={cost}
            src={costsImagePath(cost)}
            onClick={() => setCost(cost)}
          />
        ))}
      </div>
      {/*タブにしたい*/}
      {seriesDict.map((series, idx) => (
        <Image key={idx} alt={series.name} src={seriesImagePath(series)} />
      ))}
      {/*検索バー*/}
      <div>
        {mobileSuits.map((MS, idx: number) => (
          <div key={idx} onClick={() => clickHandlerMSID(MS.id)}>
            <Image src={MSImagePath(MS)} alt={MS.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectMSBox;
