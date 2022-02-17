import React, {
  Dispatch,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fms, MobileSuit } from "../types/MobileSuit";
import { useSession } from "next-auth/react";
import MSList from "./selectMS/MSList";
import { useThreads } from "../hooks/swrHooks";
import useSelectMSBox from "../hooks/useSelectMSBox";
import { Cost } from "../types/Union";
import { Series } from "../types/Series";
import { Input } from "@mui/material";

export const SelectMobileSuits = () => {
  // ここにコスト,シリーズ,FavMSフィルタをつける

  const { threadDispatch } = useThreads();
  const { mobileSuits, useMS, dispatch } = useSelectMSBox();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [favMS, setFavMS] = useState<MobileSuit[]>([]);

  const favoriteMSMemo: MobileSuit[] = useMemo(
    () => (session ? fms(session.user.favoriteMSIDs) : []),
    [session]
  );

  const updateFavMS = useCallback(
    () => setFavMS(favoriteMSMemo),
    [favoriteMSMemo]
  );

  useEffect(() => {
    if (session) {
      updateFavMS();
    }
  }, [session]);

  const [isCost, setIsCost] = useState<Cost>("ALL");
  const [isSeries, setIsSeries] = useState<Series | null>(null);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [word, setWord] = useState<string | null>(null);

  const filterByName = (ms: MobileSuit[], arg: string) => {
    return ms.filter((ms) => ms.name.includes(arg));
  };

  if (loading) return null;
  return (
    // <div css={FindCardStyle}>
    <div>
      コスト シリーズ お気に入り 名前検索
      {/*ヘッダ*/}
      {/*<div>*/}
      {/*  /!*シリーズ デカめのドロップダウン*!/*/}
      {/*  {*/}
      {/*    <div*/}
      {/*      onMouseEnter={() => setIsSeries(!isSeries)}*/}
      {/*      onMouseLeave={() => setIsSeries(!isSeries)}*/}
      {/*    >*/}
      {/*      {isSeries && <SeriesList dispatch={dispatch} />}*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*  /!*コスト ドロップダウンメニュー*!/*/}
      {/*  {*/}
      {/*    <div*/}
      {/*      onMouseEnter={() => setIsCost(!isCost)}*/}
      {/*      onMouseLeave={() => setIsCost(!isCost)}*/}
      {/*    >*/}
      {/*      {isCost &&*/}
      {/*        costs.map((cost: Cost, idx) => (*/}
      {/*          <Image*/}
      {/*            key={idx}*/}
      {/*            alt={cost}*/}
      {/*            src={costsImagePath(cost)}*/}
      {/*            onClick={() => dispatch({ type: "cost", cost: cost })}*/}
      {/*          />*/}
      {/*        ))}*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*  /!*お気に入りMSリストボタン*!/*/}
      {/*  /!*<Image src={!isFav ? "" : ""} onClick={() => setIsFav(!isFav)} />*!/*/}
      {/*  /!*検索バー*!/*/}
      {/*  <input type="text" name="name" />*/}
      {/*</div>*/}
      {/*本体*/}
      {/*シリーズごとにMSを表示*/}
      <Input />
      {!isFav ? (
        <MSList mobileSuits={mobileSuits} useMS={useMS} />
      ) : favMS.length ? (
        <MSList mobileSuits={favMS} useMS={useMS} />
      ) : (
        <div>お気に入りMSが登録されていません</div>
      )}
    </div>
  );
};

export default SelectMobileSuits;
