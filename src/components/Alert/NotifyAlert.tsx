import { Alert, AlertColor, AlertTitle } from "@mui/material";
import React from "react";

type Props = {
  severity: AlertColor;
  alertTitle: string;
  alertDesc: string;
};

const NotifyAlert: React.FC<Props> = ({ severity, alertTitle, alertDesc }) => {
  return (
    <Alert
      sx={{
        position: "fixed",
        top: 80,
        right: 16,
      }}
      severity={severity as AlertColor}
    >
      <AlertTitle>{alertTitle}</AlertTitle>
      {alertDesc}
    </Alert>
  );
};

export default NotifyAlert;
