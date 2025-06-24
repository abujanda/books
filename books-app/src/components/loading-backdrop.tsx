import type { FC } from "react";
import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";

interface LoadingBackdropProps {
  message?: string;
}

export const LoadingBackdrop: FC<LoadingBackdropProps> = (props) => {
  const { message } = props;
  return (
    <Backdrop
      open
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <CircularProgress color="inherit" />
        {message && (
          <Typography color="inherit" variant="body2">
            {message}
          </Typography>
        )}
      </Stack>
    </Backdrop>
  );
};
