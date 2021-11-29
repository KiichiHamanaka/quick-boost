import { signIn, signOut, useSession } from "next-auth/client";
import Image from "next/image";
const Header = () => {
  const [session, loading] = useSession();

  if (loading) return null;
  console.log(session);
  return (
    <div>
      {!session && (
        <>
          <button onClick={() => signIn()}>ログイン</button>
        </>
      )}
      {session && (
        <>
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={50}
            height={50}
          />
          {session.user.name}さん
          <button onClick={() => signOut()}>ログアウト</button>
        </>
      )}
    </div>
  );
};

export default Header;
