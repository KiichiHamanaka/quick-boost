import Image from "next/image";
import React, { Dispatch } from "react";
import { Series, seriesImagePath } from "../../types/Series";
import { SeriesDict } from "../../db/data/SeriesDict";
import { nonNullable } from "../../types/util";

const SeriesList = () => {
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
