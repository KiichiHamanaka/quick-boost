import { useFind } from "../../hooks/swrHooks";
import MobileSuit from "../../type/MobileSuit";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const FindId = () => {
  const router = useRouter();
  const id = Number(router.query);
  const { find, isLoading, isError } = useFind(id);

  if (isLoading) return <div>Loading Animation</div>;
  if (isError) return <div>Error</div>;
  return (
    <div>
      <div>{find.user.name}</div>
      <div>{find.message}</div>
      <div>{find.user.grade}</div>
      <div>{find.user.rank}</div>
      <div>{find.body}</div>
      {find.mobileSuites.map((MS: MobileSuit, idx: number) => (
        <div key={idx}>
          <div>{MS.name}</div>
          <div>{MS.series}</div>
          <Image src={MS.imagePath} alt={MS.name} width={50} height={50} />
        </div>
      ))}
    </div>
  );
};

export default FindId;
