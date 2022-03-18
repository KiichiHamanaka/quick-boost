import Image from "next/image";
import { MobileSuit, MSImagePath } from "../../types/MobileSuit";
import React, { Dispatch, memo, useMemo } from "react";
import { css, SerializedStyles } from "@emotion/react";
import {
  findSeriesFromSeriesID,
  getSeriesName,
  seriesImagePath,
} from "../../types/Series";
import { Grid } from "@mui/material";
import { MSBoxAction } from "../../reducers/selectMSBox";

type Props = {
  mobileSuits: MobileSuit[];
  useMS: number[];
  dispatch: Dispatch<MSBoxAction>;
};

const ChosenStyle = (choose: boolean): SerializedStyles => {
  return choose
    ? css``
    : css`
        filter: grayscale(100%);
      `;
};

const SeriesImageStyle = css`
  position: relative;
  width: auto;
  height: 52px;
`;

const MSList: React.FC<Props> = ({ mobileSuits, useMS, dispatch }) => {
  const GroupedMS: MobileSuit[][] = useMemo(() => {
    const array: MobileSuit[][] = [];
    mobileSuits.forEach((MS) => {
      if (array[MS.series - 1] === undefined) {
        array[MS.series - 1] = [];
      }
      array[MS.series - 1].push(MS);
    });
    return array;
  }, [mobileSuits]);

  return (
    <Grid justifyContent="center" alignItems="center">
      {GroupedMS.map(
        (MSArray, MSArrayKey: number) =>
          MSArray && (
            <div key={MSArrayKey}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={2}>
                  <div css={SeriesImageStyle}>
                    <Image
                      src={seriesImagePath(
                        findSeriesFromSeriesID(MSArray[0].series)
                      )}
                      alt={getSeriesName(MSArray[0].series)}
                      layout={"fill"}
                    />
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <Grid container key={MSArrayKey}>
                    {MSArray.map((MS, MSKey) => (
                      <div
                        key={MSKey}
                        css={ChosenStyle(useMS.includes(MS.id))}
                        onClick={() =>
                          dispatch({ type: "useMS", useMS: MS.id })
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
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )
      )}
    </Grid>
  );
};

export default memo(MSList);
