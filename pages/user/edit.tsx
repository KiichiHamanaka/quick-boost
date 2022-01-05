import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const UserEdit: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loadingSession = status === "loading";
  const data = {};

  const editUser = () => {
    const user = loadingSession && session!.user.twitterName; //twitter名にしろ
    axios.put(`/api/user/${user}`, data).then((res) => {
      console.log(res.data);
    });
    router.push("/user/edit");
  };

  return <div>あしだまだだよ</div>;
};

export default UserEdit;
