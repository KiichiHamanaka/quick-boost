import Image from "next/image";
import { MobileSuit, MSImagePath } from "../../types/MobileSuit";
import React, { Dispatch } from "react";

import { Card, Grid } from "@mui/material";
import { MSBoxAction } from "../../reducers/selectMSBox";

type Props = {
  MobileSuits: MobileSuit[];
  dispatch: Dispatch<MSBoxAction>;
};

const ShowMSImage: React.FC<Props> = ({ MobileSuits, dispatch }) => {
  return (
    <Card>
      <Grid justifyContent="center" alignItems="center">
        {MobileSuits.map((ms, idx) => (
          <Image
            key={idx}
            src={MSImagePath(ms)}
            alt={ms.name}
            onClick={() => dispatch({ type: "useMS", useMS: ms.id })}
            loading={"lazy"}
            width={106}
            height={52}
          />
        ))}
      </Grid>
    </Card>
  );
};

export default ShowMSImage;
