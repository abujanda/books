import type { FC } from "react";
import { act, useState } from "react";
import { Box, Button, Container, Stack, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    id: "simple",
    title: "Simple Note Taking",
    description:
      "Quickly jot down your thoughts, quotes, and summaries from your books.",
    image: "/assets/home-features-simple.png",
  },
  {
    id: "search",
    title: "Full-Text Search",
    description:
      "Instantly search across all your notes to find what you need.",
    image: "/assets/home-features-search.png",
  },
  {
    id: "organize",
    title: "Organize by Book",
    description: "Keep everything neatly grouped by title and author.",
    image: "/assets/home-features-organize.png",
  },
  {
    id: "accessible",
    title: "Accessible Anywhere",
    description: "Access your notes from any device, anytime, anywhere.",
    image: "/assets/home-features-accessible.png",
  },
];

export const HomeFeatures: FC = () => {
  const theme = useTheme();
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const feature = features[activeFeature];

  return (
    <Box
      sx={{
        backgroundColor: "neutral.900",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        color: "common.white",
        py: "120px",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ mb: 8 }}>
          <Typography align="center" color="inherit" variant="h3">
            Everything you need to manage your book notes.
          </Typography>
        </Stack>
        <Grid alignItems="center" container spacing={3}>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Stack spacing={1}>
              {features.map((feature, index) => {
                const isActive = activeFeature === index;

                return (
                  <Box
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    sx={{
                      borderRadius: 2.5,
                      color: "neutral.400",
                      cursor: "pointer",
                      p: 3,
                      transition: (theme) =>
                        theme.transitions.create(
                          ["background-color", "box-shadow", "color"],
                          {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                          }
                        ),
                      ...(isActive && {
                        backgroundColor: "primary.alpah12",
                        boxShadow: (theme) =>
                          `${theme.palette.primary.main} 0 0 0 1px`,
                        color: "common.white",
                      }),
                      "&:hover": {
                        ...(!isActive && {
                          backgroundColor: "primary.alpha4",
                          boxShadow: (theme) =>
                            `${theme.palette.primary.main} 0 0 0 1px`,
                          color: "common.white",
                        }),
                      },
                    }}
                  >
                    <Typography color="inherit" sx={{ mb: 1 }} variant="h6">
                      {feature.title}
                    </Typography>
                    <Typography color="inherit" variant="body2">
                      {feature.description}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box
              sx={{
                "& img": {
                  borderRadius: 2,
                  width: "100%",
                },
              }}
            >
              <img src={feature.image} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
