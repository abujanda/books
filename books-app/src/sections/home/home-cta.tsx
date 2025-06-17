import type { FC } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RouterLink } from "@/components/router-link";
import { authPaths } from "@/paths";

export const HomeCta: FC = () => (
  <Box
    sx={{
      backgroundColor: "neutral.900",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top center",
      backgroundImage: 'url("/assets/gradient-bg.svg")',
      color: "neutral.100",
      py: "120px",
    }}
  >
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Typography align="center" color="inherit">
          Start taking notes today!
        </Typography>
        <Typography align="center" color="inherit" variant="subtitle2">
          No clutter, no noise — turn your reading into lifelong wisdom.
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Button
          component={RouterLink}
          href={authPaths.signup}
          variant="contained"
        >
          Sign Up
        </Button>
      </Stack>
    </Container>
  </Box>
);
