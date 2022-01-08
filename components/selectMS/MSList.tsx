import Image from "next/image";
import { MobileSuit, MSImagePath } from "../../types/MobileSuit";
import React, { Dispatch } from "react";
import { MSBoxAction } from "../../store/selectMSBox";
import { css, SerializedStyles } from "@emotion/react";

type Props = {
  mobileSuits: MobileSuit[];
  useMS: number[];
  dispatch: Dispatch<MSBoxAction>;
};

const FindCardStyle = css`
  width: 400px;
  border: solid 1px #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);
`;

const ChosenStyle = (b: boolean): SerializedStyles => {
  return b
    ? css``
    : css`
        opacity: 0.5;
      `;
};

const MSList = (props: Props) => {
  return (
    <div>
      {props.mobileSuits.map(
        (MS, idx: number) =>
          MS && (
            <div
              key={idx}
              css={ChosenStyle(props.useMS.includes(MS.id))}
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
