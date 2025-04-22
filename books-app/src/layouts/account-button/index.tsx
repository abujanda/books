import type { FC } from "react";
import { useCallback, useRef, useState } from "react";
import { Avatar, Box, ButtonBase } from "@mui/material";
import { AccountPopover } from "./account-popover";
import { useAuth } from "@/hooks/use-auth";
import { getInitials } from "@/utils/get-initials";

export const AccountButton: FC = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const { user } = useAuth();

  const handlePopoverOpen = useCallback((): void => {
    setOpenPopover(true);
  }, []);

  const handlePopoverClose = useCallback((): void => {
    setOpenPopover(false);
  }, []);

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handlePopoverOpen}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "divider",
          height: 40,
          width: 40,
          borderRadius: "50%",
        }}
      >
        <Avatar
          sx={{
            height: 32,
            width: 32,
          }}
          //src={user?.avatar}
        >
          {getInitials(user?.name)}
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handlePopoverClose}
        open={openPopover}
      />
    </>
  );
};
