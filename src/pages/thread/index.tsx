import React, { useEffect, useState } from "react";
import ThreadCard from "../../components/ThreadCard";
import { useThreads } from "../../hooks/swrHooks";
import { findMobileSuitFromMSID } from "../../types/MobileSuit";
import useSelectMSBox from "../../hooks/useSelectMSBox";
import MSDialog from "../../components/dialog/MSSearchDialog";
import DateSearchDialog from "../../components/dialog/DateSearchDialog";
import { Alert, AlertColor, AlertTitle, Fab, Grid } from "@mui/material";
import ShowMSImage from "../../components/selectMS/showMSImager";
import { GetServerSideProps } from "next";
import { ThreadType } from "../../types/thread/ThreadType";
import Thread from "../../db/models/Thread";
import connectDB from "../../db/connectDB";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";
import ThreadsFilterDialog from "../../components/dialog/ThreadsFilterDialog";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  fallbackData: ThreadType[];
}

const ThreadIndex: React.FC<Props> = ({ fallbackData }) => {
  const {
    filterResult,
    threadState,
    isLoadingThreads,
    isErrorThreads,
    threadDispatch,
  } = useThreads(fallbackData);
  const { useMS, dispatch } = useSelectMSBox();

  const router = useRouter();
  const query = router.query;
  const [isShowDateSearchDialog, setIsShowDateSearchDialog] =
    useState<boolean>(false);
  const [isShowMSBOX, setIsShowMSBOX] = useState<boolean>(false);
  const [isShowFilterDialog, setIsShowFilterDialog] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  useEffect(() => {
    if (!!Object.keys(query).length) setIsShowAlert(true);
    dispatch({ type: "useMS", useMS: "reset" });
  }, []);

  useEffect(() => {
    setTimeout(() => setIsShowAlert(false), 3000);
  }, [isShowAlert]);

  if (isErrorThreads) return <div>なんかおかしいわ</div>;
  if (isLoadingThreads) {
    return <Oval color="#00BFFF" height={80} width={80} />;
  } else {
    return (
      <div>
        <MSDialog setOpen={setIsShowMSBOX} open={isShowMSBOX} />
        <DateSearchDialog
          setOpen={setIsShowDateSearchDialog}
          open={isShowDateSearchDialog}
          state={threadState}
          dispatch={threadDispatch}
        />
        <ThreadsFilterDialog
          open={isShowFilterDialog}
          setOpen={setIsShowFilterDialog}
          setIsShowDateSearchDialog={setIsShowDateSearchDialog}
          setIsShowMSBOX={setIsShowMSBOX}
          threadDispatch={threadDispatch}
        />
        {!!Object.keys(query).length && isShowAlert && (
          <Alert
            sx={{
              position: "fixed",
              top: 80,
              right: 16,
            }}
            severity={query.severity as AlertColor}
          >
            <AlertTitle>{query.alertTitle}</AlertTitle>
            {query.alertDesc}
          </Alert>
        )}
        {!!useMS.length && (
          <ShowMSImage
            MobileSuits={useMS.map((ms) => findMobileSuitFromMSID(ms))}
          />
        )}
        <Grid container justifyContent={"center"}>
          <Grid container wrap={"wrap"} direction="row" p={2} spacing={2}>
            {filterResult.length
              ? filterResult.map((thread, idx) => {
                  return (
                    <Grid key={idx} item xs={12} sm={6}>
                      <ThreadCard thread={thread} />
                    </Grid>
                  );
                })
              : "検索条件に沿う募集は見つかりませんでした"}
          </Grid>
        </Grid>

        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
          onClick={() => setIsShowFilterDialog(true)}
        >
          <SearchIcon />
        </Fab>
      </div>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  await connectDB();
  const threads = await Thread.find().populate("threadAuthor");
  const t = JSON.parse(JSON.stringify(threads));

  return {
    props: {
      fallbackData: t,
    },
  };
};

export default ThreadIndex;
