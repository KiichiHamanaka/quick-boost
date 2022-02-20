import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useComments, useThread, useUser } from "../../hooks/swrHooks";
import {
  findMobileSuitFromMSID,
  MobileSuit,
  MSImagePath,
} from "../../types/MobileSuit";
import { applyThreadID } from "../../types/thread/Thread";
import { applyUserID } from "../../types/User";

//クローズしたスレのURL開いたらそのIDは存在しません処理がいるかも

const FindCardStyle = css`
  width: 400px;
  border: solid 1px #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;

const ThreadId = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const tid = applyThreadID(id);

  const { thread, isLoadingThread, isErrorThread } = useThread(tid);
  // const { user, isErrorUser, isLoadingUser } = useUser(thread.threadAuthor);
  // const { comments, isLoadingComments, isErrorComments } = useComments(tid);

  if (isLoadingThread) return <div>Loading Animation</div>;
  if (isErrorThread) return <div>Error</div>;

  return (
    <div css={FindCardStyle}>
      {id}
      {/*<div>@{user.twitterId}</div>*/}
      {/*<div>{user.twitterName}</div>*/}
      {/*<div>タイトル:{thread.title}</div>*/}
      {/*{user.grade && <div>{user.grade}</div>}*/}
      {/*{user.rank && <div>{user.rank}</div>}*/}
      <div>{thread.body}</div>
      {thread.useMS &&
        thread.useMS.map(
          (MS, idx) =>
            MS && (
              <Image
                key={idx}
                src={MSImagePath(findMobileSuitFromMSID(MS))}
                alt={findMobileSuitFromMSID(MS).name}
                width={50}
                height={50}
              />
            )
        )}
    </div>
  );
};
export default ThreadId;
