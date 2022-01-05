import { css } from "@emotion/react";
import React, { Dispatch, useEffect, useState } from "react";
import { Cost } from "../types/Union";
import { fms, MobileSuit } from "../types/MobileSuit";
import { useSession } from "next-auth/react";
import MSList from "./selectMS/MSList";
import UseSelectMSBox from "../hooks/useSelectMSBox";

/*
   ユーザー画面とスレッド作成時、スレッドフィルタの3箇所で使いまわしたい
   モーダル
   お気に入り機体から選ぶも必要？
   favoriteはsessionから持ってくる？
   検索ボックスとコストセレクタ,シリーズセレクタが必要
   useSWRでuser情報を持ってくるそっからfavMSのid取得して
   favListに突っ込む
   ホバー時(onMouseEnter)にプルダウン
 */

const FindCardStyle = css`
  width: 400px;
  border: solid 1px #2d2d2d;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;

const costs: Cost[] = ["ALL", "1500", "2000", "2500", "3000"];

type MSBOXProps = {
  dispatch: Dispatch<any>;
};

export const SelectMobileSuits = (props: MSBOXProps) => {
  const { mobileSuits, dispatch } = UseSelectMSBox();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [favMS, setFavMS] = useState<MobileSuit[]>([]);

  useEffect(() => {
    if (session) setFavMS(fms(session.user.favoriteMSIDs));
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
      {/*      {isSeries && <SeriesList dispatch={props.dispatch} />}*/}
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
        <MSList mobileSuits={mobileSuits} dispatch={props.dispatch} />
      ) : favMS !== null ? (
        <MSList mobileSuits={favMS} dispatch={props.dispatch} />
      ) : (
        <div>お気に入りMSが登録されていません</div>
      )}
    </div>
  );
};

export default SelectMobileSuits;