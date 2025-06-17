import type { FC } from "react";
import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RouterLink } from "@/components/router-link";
import { authPaths } from "@/paths";

export const HomeHero: FC = () => {
  return (
    <Box
      sx={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        pt: "120px",
      }}
    >
      <Container maxWidth="lg">
        <Box maxWidth="sm">
          <Typography variant="h1" sx={{ mb: 2 }}>
            Organize your &nbsp;
            <Typography component="span" color="primary.main" variant="inherit">
              Reading
            </Typography>
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            The simples way to save, search, and reflect on your book notes —
            all in one place.
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={1}
            sx={{ my: 3 }}
          >
            <Rating readOnly value={4.5} precision={0.5} max={5} />
            <Typography
              color="text.primary"
              variant="caption"
              sx={{ fontWeight: 700 }}
            >
              4.5/5
            </Typography>
            <Typography color="text.secondary" variant="caption">
              based on (700+ reviews)
            </Typography>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Button
              color="primary"
              component={RouterLink}
              href={authPaths.signup}
              variant="contained"
            >
              Sign Up
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              href="#"
            >
              Learn More
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            pt: "120px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
              //width: "90%",
              fontSize: 0,
              mt: -2, // hack to cut the bottom box shadow
              mx: -2,
              pt: 2,
              px: 2,
              "& img": {
                borderTopLeftRadius: (theme) => theme.shape.borderRadius * 2.5,
                borderTopRightRadius: (theme) => theme.shape.borderRadius * 2.5,
                boxShadow: 16,
                width: "100%",
              },
            }}
          >
            <img src="/assets/home-thumbnail.png" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
