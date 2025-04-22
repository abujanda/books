"use client";

import type { FC } from "react";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import type { Theme } from "@mui/material";
import {
  Box,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { AccountButton } from "@/layouts/account-button";

interface TopNavProps {
  onMobileNav?: () => void;
}

export const TopNav: FC<TopNavProps> = (props) => {
  const { onMobileNav } = props;
  const pathname = usePathname();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "var(--nav-bg)",
        borderBottomColor: "var(--nav-border-color)",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        color: "var(--nav-color)",
        left: 0,
        position: "sticky",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          px: 3,
          py: 1,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={2}>
          {!mdUp && (
            <IconButton onClick={onMobileNav}>
              <SvgIcon>
                <MenuIcon />
              </SvgIcon>
            </IconButton>
          )}
          <Box
            component={Link}
            href="/"
            underline="none"
            // sx={{
            //   borderColor: "var(--nav-logo-border)",
            //   borderRadius: 1,
            //   borderStyle: "solid",
            //   borderWidth: 1,
            //   display: "inline-flex",
            //   height: 40,
            //   p: "4px",
            //   width: 40,
            //   underline: "none",
            // }}
          >
            <Typography variant="h6" fontWeight="bold">
              My Book Notes
            </Typography>
          </Box>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <AccountButton />
        </Stack>
      </Stack>
    </Box>
  );
};
