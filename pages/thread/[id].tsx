import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { css } from "@emotion/react";
import { MSImagePath } from "../../util/returnPath";
import { useThread, useUser } from "../../hooks/swrHooks";
import { applyThreadID } from "../../util/applyValueObject";
import { findMobileSuitFromMSID } from "../../util/findItem";

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
  const { user, isLoadingUser, isErrorUser } = useUser(thread.threadAuthor);

  const isLoading = isLoadingThread && isLoadingUser;
  const isError = isErrorThread && isErrorUser;

  const tms =
    thread.useMS &&
    thread.useMS.map((msid) => msid && findMobileSuitFromMSID(msid));

  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;

  return (
    <div css={FindCardStyle}>
      <div>{user.twitterId}</div>
      <div>{user.twitterName}</div>
      <div>{thread.title}</div>
      <div>{user.grade}</div>
      <div>{user.rank}</div>
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
