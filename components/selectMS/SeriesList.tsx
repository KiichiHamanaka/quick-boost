import Image from "next/image";
import React, { Dispatch } from "react";
import { Series, seriesImagePath } from "../../types/Series";
import { SeriesDict } from "../../db/data/SeriesDict";
import { nonNullable } from "../../types/util";
import { MSBoxAction } from "../../store/selectMSBox";

type Props = {
  dispatch: Dispatch<MSBoxAction>;
};

const SeriesList = (props: Props) => {
  const seriesDict: Series[] = Object.values(SeriesDict).filter(nonNullable);
  return (
    <div>
      {seriesDict.map((series, idx) => (
        <div key={idx}>
          <Image alt={series.name} src={seriesImagePath(series)} />
        </div>
      ))}
    </div>
  );
};

export default SeriesList;
