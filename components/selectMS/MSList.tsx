import Image from "next/image";
import { MobileSuit, MSImagePath } from "../../types/MobileSuit";
import React, { Dispatch } from "react";
import {MSBoxAction} from "../../store/selectMSBox";

type Props = {
  mobileSuits: MobileSuit[];
  useMS: number[]
  dispatch: Dispatch<MSBoxAction>;
};

const MSList = (props: Props) => {
  return (
    <div>
      {props.mobileSuits.map(
        (MS, idx: number) =>
          MS && (
            <div
              key={idx}
              onClick={() => props.dispatch({ type: "useMS", useMS: MS.id })}
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
