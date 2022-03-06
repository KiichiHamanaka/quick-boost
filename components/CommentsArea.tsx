import { Box, Paper } from "@mui/material";
import React from "react";
import { useComments } from "../hooks/swrHooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { createComment } from "../pages/api/create";
import mongoose from "mongoose";
import { getSession, useSession } from "next-auth/react";

import { UserType } from "../types/UserType";

interface Props {
  threadID: string;
  user: UserType;
}

type FormValues = {
  comment: string;
};

const CommentsArea = (props: Props) => {
  const { comments, isLoadingComments, isErrorComments } = useComments(
    props.threadID
  );
  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm<FormValues>();

  console.log(comments);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createComment({
      ...data,
      threadId: new mongoose.Types.ObjectId(props.threadID),
      commentAuthor: props.user._id,
    });
  };

  return (
    <Paper sx={{ border: 0.5 }}>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          コメント
          <input {...register("comment")} />
          <input type="submit" value={"送信"} />
        </form>
      </Box>
      <Box>
        {isLoadingComments ? (
          <div>Loading Animation</div>
        ) : isErrorComments ? (
          <div>Error</div>
        ) : comments.length ? (
          comments.map((c, idx) => (
            <Paper key={idx}>
              <Box>
                {c.comment}
                {c.commentAuthor}
                {c.createdAt}
              </Box>
            </Paper>
          ))
        ) : (
          "なんもない"
        )}
      </Box>
    </Paper>
  );
};

export default CommentsArea;
