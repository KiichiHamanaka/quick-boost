import Image from "next/image";
import { MobileSuit, MSImagePath } from "../../types/MobileSuit";
import React, { memo, useMemo } from "react";
import { css, SerializedStyles } from "@emotion/react";
import {
  findSeriesFromSeriesID,
  getSeriesName,
  seriesImagePath,
} from "../../types/Series";
import { Grid } from "@mui/material";
import useSelectMSBox from "../../hooks/useSelectMSBox";

type Props = {
  mobileSuits: MobileSuit[];
  useMS: number[];
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

const MSList: React.FC<Props> = (props) => {
  const { dispatch } = useSelectMSBox();

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
                        css={ChosenStyle(props.useMS.includes(MS.id))}
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
