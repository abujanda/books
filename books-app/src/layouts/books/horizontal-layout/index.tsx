"use client";

import type { FC, ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Theme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { NavColor } from "@/types/settings";
//import { MobileNav } from "../mobile-nav";
import { TopNav } from "./top-nav";

const useMobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePathnameChange = useCallback((): void => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    handlePathnameChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = useCallback((): void => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback((): void => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    handleOpen,
    handleClose,
  };
};

const HorizontalLayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "100%",
  marginTop: "48px",
}));

interface HorizontalLayoutProps {
  children?: ReactNode;
}

export const HorizontalLayout: FC<HorizontalLayoutProps> = (props) => {
  const { children } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const mobileNav = useMobileNav();

  return (
    <>
      <TopNav onMobileNav={mobileNav.handleOpen} />
      {/* {!lgUp && (
        <MobileNav
          color={navColor}
          onClose={mobileNav.handleClose}
          open={mobileNav.isOpen}
        />
      )} */}
      <HorizontalLayoutRoot>{children}</HorizontalLayoutRoot>
    </>
  );
};
