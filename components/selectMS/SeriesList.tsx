import Image from "next/image";
import React, { Dispatch } from "react";
import { Series, seriesImagePath } from "../../types/Series";
import { SeriesDict } from "../../db/data/SeriesDict";
import { nonNullable } from "../../types/util";

type Props = {
  dispatch: Dispatch<any>;
};

const SeriesList = (props: Props) => {
  const seriesDict: Series[] = Object.values(SeriesDict).filter(nonNullable);
  return (
    <div>
      {seriesDict.map((series, idx) => (
        <Image key={idx} alt={series.name} src={seriesImagePath(series)} />
      ))}
    </div>
  );
};

export default SeriesList;
