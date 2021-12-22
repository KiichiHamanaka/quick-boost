import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { css } from "@emotion/react";
import { useComments, useThread, useUser } from "../../hooks/swrHooks";
import { findMobileSuitFromMSID, MSImagePath } from "../../types/MobileSuit";
import { applyThreadID } from "../../types/thread/Thread";
import { Comment } from "../../types/thread/Comment";

const FindCardStyle = css`
  width: 400px;
  border: solid 1px #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;

const ThreadId = () => {
  const router = useRouter();
  const id: string = router.query.id as string;
  const tid = applyThreadID(id);

  const { thread, isLoadingThread, isErrorThread } = useThread(tid);
  const { comments, isLoadingComments, isErrorComments } = useComments(
    thread._id
  );
  const isLoading = isLoadingThread;
  const isError = isErrorThread;
  Comment;
  const tms =
    thread.useMS &&
    thread.useMS.map((msid) => msid && findMobileSuitFromMSID(msid));

  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;

  return (
    <div css={FindCardStyle}>
      <div>{thread.threadAuthor.twitterId}</div>
      <div>{thread.threadAuthor.twitterName}</div>
      <div>{thread.title}</div>
      <div>{thread.threadAuthor.grade}</div>
      <div>{thread.threadAuthor.rank}</div>
      <div>{thread.body}</div>
      {tms &&
        tms.map(
          (MS, idx) =>
            MS && (
              <Image
                key={idx}
                src={MSImagePath(MS)}
                alt={MS.name}
                width={50}
                height={50}
              />
            )
        )}
    </div>
  );
};
export default ThreadId;
