import Image from "next/image";
import { MobileSuit, MSImagePath } from "../../types/MobileSuit";
import React, { Dispatch } from "react";

type Props = {
  mobileSuits: MobileSuit[];
  dispatch: Dispatch<any>;
};

const MSList = (props: Props) => {
  return (
    <div>
      {props.mobileSuits.map(
        (MS, idx: number) =>
          MS && (
            <div
              key={idx}
              onClick={() => props.dispatch({ type: "filterMS", msids: MS.id })}
            >
              <Image
                src={MSImagePath(MS)}
                alt={MS.name}
                width="212"
                height="104"
                layout="intrinsic"
              />
            </div>
          )
      )}
    </div>
  );
};

export default MSList;
