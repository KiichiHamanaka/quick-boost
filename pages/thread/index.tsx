import React, { useEffect, useReducer, useState } from "react";
import ThreadCard from "../../components/ThreadCard";
import { useThreads } from "../../hooks/swrHooks";
import { findMobileSuitFromMSID } from "../../types/MobileSuit";
import { nonNullable } from "../../types/util";
import SelectMobileSuits from "../../components/SelectMobileSuits";

import useSelectMSBox from "../../hooks/useSelectMSBox";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MSDialog from "../../components/thread/MSDialog";

import { Button, TextField, TextFieldProps } from "@mui/material";
import { LocalizationProvider } from "@mui/lab";

const ThreadIndex: React.FC = () => {
  const {
    threads,
    isLoadingThreads,
    isErrorThreads,
    threadState,
    threadDispatch,
  } = useThreads();

  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);
  const { mobileSuits, useMS, dispatch } = useSelectMSBox();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  useEffect(() => {
    threadDispatch({ type: "fetch", threads: threads });
  }, [threads]);

  useEffect(() => {
    threadDispatch({ type: "filterMS", msids: useMS });
  }, [useMS]);

  if (isErrorThreads) return <div>なんかおかしいわ</div>;

  if (isLoadingThreads) {
    return <div>ロードなう アニメにせんかい</div>;
  } else {
    return (
      <div>
        <MSDialog
          msDispatch={dispatch}
          threadDispatch={threadDispatch}
          setOpen={setIsShowMSBOX}
          open={isShowMSBOX}
        />
        {"ここの部分を検索用の別コンポーネントに"}
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              label="開始日時"
              openTo="year"
              views={["year", "month", "day"]}
              value={startDate}
              onChange={(newValue: React.SetStateAction<Date | null>) => {
                setStartDate(newValue);
              }}
              renderInput={(
                params: JSX.IntrinsicAttributes & TextFieldProps
              ) => <TextField {...params} />}
            />
            <DatePicker
              disableFuture
              label="終了日時"
              openTo="year"
              views={["year", "month", "day"]}
              value={endDate}
              onChange={(newValue: React.SetStateAction<Date | null>) => {
                setEndDate(newValue);
              }}
              renderInput={(
                params: JSX.IntrinsicAttributes & TextFieldProps
              ) => <TextField {...params} />}
            />
            <Button onClick={() => setIsShowMSBOX(true)}>MS</Button>
          </LocalizationProvider>
        </div>

        <div>
          {threadState.threads.length
            ? threadState.threads.map((thread, idx) => {
                return (
                  <ThreadCard
                    key={idx}
                    ThreadId={thread._id}
                    useMS={
                      thread.useMS.length
                        ? thread.useMS
                            .map((msid) => findMobileSuitFromMSID(msid))
                            .filter(nonNullable)
                        : []
                    }
                    playStyle={thread.playStyle}
                    title={thread.title}
                    threadAuthor={thread.threadAuthor}
                    isVC={thread.isVC}
                    startedAt={thread.startedAt}
                    finishedAt={thread.finishedAt}
                    isPlaying={false}
                    position={thread.position}
                    gameMode={thread.gameMode}
                  />
                );
              })
            : "なんもない"}
        </div>
      </div>
    );
  }
};

export default ThreadIndex;
