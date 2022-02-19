import Image from "next/image";
import { MobileSuit, MSImagePath } from "../../types/MobileSuit";
import React from "react";

import { Box, Grid } from "@mui/material";
import useSelectMSBox from "../../hooks/useSelectMSBox";

type Props = {
  MobileSuits: MobileSuit[];
};

const ShowMSImage = (props: Props) => {
  const { dispatch } = useSelectMSBox();
  return props.MobileSuits.length ? (
    <Box
      sx={{
        border: 1,
        borderRadius: 1,
        minHeight: "70px",
      }}
    >
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
    </Box>
  ) : null;
};

export default ShowMSImage;
