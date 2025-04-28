import type { FC } from "react";
import { RouterLink } from "@/components/router-link";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Popover,
  Typography,
} from "@mui/material";

interface ActionsPopoverProps {
  anchorEl: Element | null;
  bookId: string;
  onClose?: () => void;
  onDelete?: () => void;
  open?: boolean;
}

export const ActionsPopover: FC<ActionsPopoverProps> = (props) => {
  const { anchorEl, bookId, onClose, onDelete, open } = props;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={!!open}
      slotProps={{
        paper: {
          sx: {
            width: 250,
          },
        },
      }}
      transitionDuration={0}
    >
      <Box sx={{ mt: 1 }}>
        <List
          subheader={
            <ListSubheader>
              <Typography color="text.secondary" variant="subtitle2">
                Actions
              </Typography>
            </ListSubheader>
          }
        >
          <ListItemButton component={RouterLink} href={`/books/${bookId}/edit`}>
            <ListItemText
              primary={<Typography variant="subtitle2">Edit</Typography>}
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              onClose?.();
              onDelete?.();
            }}
          >
            <ListItemText
              primary={
                <Typography color="error" variant="subtitle2">
                  Delete
                </Typography>
              }
            />
          </ListItemButton>
        </List>
      </Box>
    </Popover>
  );
};
