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
import UseSelectMSBox from "../hooks/useSelectMSBox";
import { ThreadAction } from "../reducers/thread";

type MSBOXProps = {
  threadDispatch: Dispatch<ThreadAction>;
};

export const SelectMobileSuits = (props: MSBOXProps) => {
  const { mobileSuits, useMS, dispatch } = UseSelectMSBox();
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
      props.threadDispatch({ type: "filterMS", msids: useMS });
    }
  }, [session]);

  const [isCost, setIsCost] = useState<boolean>(false);
  const [isSeries, setIsSeries] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  if (loading) return null;
  return (
    // <div css={FindCardStyle}>
    <div>
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
      {!isFav ? (
        <MSList mobileSuits={mobileSuits} useMS={useMS} dispatch={dispatch} />
      ) : favMS.length ? (
        <MSList mobileSuits={favMS} useMS={useMS} dispatch={dispatch} />
      ) : (
        <div>お気に入りMSが登録されていません</div>
      )}
    </div>
  );
};

export default SelectMobileSuits;
