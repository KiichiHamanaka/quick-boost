import Image from "next/image";
import { MobileSuit, MSImagePath } from "../../types/MobileSuit";
import React from "react";

import { Grid, Paper } from "@mui/material";
import useSelectMSBox from "../../hooks/useSelectMSBox";

type Props = {
  MobileSuits: MobileSuit[];
};

const indexCard = {
  minWidth: "auto",
  boxShadow: 1,
  borderRadius: 0.5,
  border: 0.5,
};

const ShowMSImage = (props: Props) => {
  const { dispatch } = useSelectMSBox();
  return (
    <Paper sx={indexCard}>
      <Grid justifyContent="center" alignItems="center">
        {props.MobileSuits.map((ms, idx) => (
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
    </Paper>
  );
};

export default ShowMSImage;
