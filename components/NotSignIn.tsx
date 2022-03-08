import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";

type props = {
  children: ReactNode;
};

const NotSignIn: React.FC<props> = ({ children }) => {
  const { data: session, status } = useSession();

  return session ? (
    <div>{children}</div>
  ) : (
    <div>このページの閲覧はサインインが必要です</div>
  );
};

export default NotSignIn;
