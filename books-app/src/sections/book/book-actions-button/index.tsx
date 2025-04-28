"use client";

import type { FC } from "react";
import { useCallback, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { ActionsPopover } from "./actions-popover";
import { ChevronDown as ChevronDownIcon } from "@untitled-ui/icons-react";

interface BookActionsButtonProps {
  bookId: string;
  onDelete?: () => void;
}

export const BookActionsButton: FC<BookActionsButtonProps> = (props) => {
  const { bookId, onDelete } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handlePopoverOpen = useCallback((): void => {
    setOpenPopover(true);
  }, []);

  const handlePopoverClose = useCallback((): void => {
    setOpenPopover(false);
  }, []);

  return (
    <div>
      <Box ref={anchorRef}>
        <Button
          endIcon={<ChevronDownIcon fontSize="small" />}
          onClick={handlePopoverOpen}
          variant="contained"
        >
          Actions
        </Button>
      </Box>
      <ActionsPopover
        anchorEl={anchorRef.current}
        bookId={bookId}
        onClose={handlePopoverClose}
        onDelete={onDelete}
        open={openPopover}
      />
    </div>
  );
};
