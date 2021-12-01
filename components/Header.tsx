import { signIn, signOut, useSession } from "next-auth/client";
const Header = () => {
  const [session, loading] = useSession();

  if (loading) return null;

  return (
    <div>
      {!session && (
        <>
          <button onClick={() => signIn()}>ログイン</button>
        </>
      )}
      {session && (
        <>
          <img
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
