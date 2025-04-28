import type { FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export const LoadingBackdrop: FC = () => {
  return (
    <Backdrop
      open
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
