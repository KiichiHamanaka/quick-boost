import Image from "next/image";
import { MobileSuit, MSImagePath } from "../../types/MobileSuit";
import React, { Dispatch, useMemo } from "react";
import { MSBoxAction } from "../../store/selectMSBox";
import { css, SerializedStyles } from "@emotion/react";
import {
  findSeriesFromSeriesID,
  getSeriesName,
  seriesImagePath,
} from "../../types/Series";

type Props = {
  mobileSuits: MobileSuit[];
  useMS: number[];
  dispatch: Dispatch<MSBoxAction>;
};

const ChosenStyle = (choose: boolean): SerializedStyles => {
  return choose
    ? css`
        width: 106px;
        border: 3px solid yellow;
      `
    : css`
        width: 106px;
      `;
};

const MSList = (props: Props) => {
  const GroupedMS: MobileSuit[][] = useMemo(() => {
    const array: MobileSuit[][] = [];
    props.mobileSuits.forEach((MS) => {
      if (array[MS.series - 1] === undefined) {
        array[MS.series - 1] = [];
      }
      array[MS.series - 1].push(MS);
    });
    return array;
  }, [props.mobileSuits]);

  return (
    <div>
      {GroupedMS.map(
        (MSArray, MSArrayKey: number) =>
          MSArray && (
            <div key={MSArrayKey}>
              <Image
                src={seriesImagePath(findSeriesFromSeriesID(MSArray[0].series))}
                alt={getSeriesName(MSArray[0].series)}
                width={106}
                height={52}
              />
              {MSArray.map((MS, MSKey) => (
                <div
                  key={MSKey}
                  css={ChosenStyle(props.useMS.includes(MS.id))}
                  onClick={() =>
                    props.dispatch({ type: "useMS", useMS: MS.id })
                  }
                >
                  <Image
                    src={MSImagePath(MS)}
                    alt={MS.name}
                    loading={"lazy"}
                    width={106}
                    height={52}
                  />
                </div>
              ))}
            </div>
          )
      )}
    </div>
  );
};
// const MSList = (props: Props) => {
//   return (
//     <div>
//       {props.mobileSuits.map(
//         (MS, idx: number) =>
//           MS && (
//             <div>
//               {idx === 0 && (
//                 <Image
//                   src={seriesImagePath(findSeriesFromSeriesID(MS.series))}
//                   alt={getSeriesName(MS.series)}
//                   width={106}
//                   height={52}
//                 />
//               )}
//               <div
//                 css={ChosenStyle(props.useMS.includes(MS.id))}
//                 onClick={() => props.dispatch({ type: "useMS", useMS: MS.id })}
//               >
//                 <Image
//                   src={MSImagePath(MS)}
//                   alt={MS.name}
//                   loading={"lazy"}
//                   width={106}
//                   height={52}
//                 />
//               </div>
//             </div>
//           )
//       )}
//     </div>
//   );
// };

export default React.memo(MSList);
