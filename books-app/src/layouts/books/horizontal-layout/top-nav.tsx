"use client";

import type { FC } from "react";
import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import type { Theme } from "@mui/material";
import {
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { alpha } from "@mui/material";
import { RouterLink } from "@/components/router-link";
import { useWindowScroll } from "@/hooks/use-window-scroll";
import { AccountButton } from "@/layouts/account-button";
import { paths } from "@/paths";

const TOP_NAV_HEIGHT: number = 64;

interface TopNavProps {
  onMobileNav?: () => void;
}

export const TopNav: FC<TopNavProps> = (props) => {
  const { onMobileNav } = props;
  const pathname = usePathname();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const [elevate, setElevate] = useState<boolean>(false);
  const offset = 64;
  const delay = 100;

  const handleWindowScroll = useCallback((): void => {
    if (window.scrollY > offset) {
      setElevate(true);
    } else {
      setElevate(false);
    }
  }, []);

  useWindowScroll({
    handler: handleWindowScroll,
    delay,
  });

  return (
    <Box
      component="header"
      sx={{
        left: 0,
        position: "fixed",
        right: 0,
        top: 0,
        pt: 2,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: "transparent",
          borderRadius: 2.5,
          boxShadow: "none",
          transition: (theme) =>
            theme.transitions.create("box-shadow, background-color", {
              easing: theme.transitions.easing.easeInOut,
              duration: 200,
            }),
          ...(elevate && {
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.9),
            boxShadow: 8,
          }),
        }}
      >
        <Stack direction="row" spacing={2} sx={{ height: TOP_NAV_HEIGHT }}>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            sx={{
              flexGrow: 1,
            }}
          >
            <Stack
              alignItems="center"
              component={RouterLink}
              direction="row"
              display="inline-flex"
              href={paths.index}
              spacing={1}
              sx={{ textDecoration: "none" }}
            >
              {mdUp && (
                <Box
                  sx={{
                    color: "text.primary",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: "0.3px",
                    lineHeight: 2.5,
                    "& span": {
                      color: "primary.main",
                    },
                  }}
                >
                  Notes <span>App</span>
                </Box>
              )}
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ flexGrow: 1 }}
            >
              {/* <AccountButton /> */}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
