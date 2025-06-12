import type { FC } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Avatar,
  Box,
  Button,
  Link,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
//import { Logo } from "../../../components/logo";
import { useAuth } from "@/hooks/use-auth";
import { authPaths } from "@/paths";
import { getInitials } from "@/utils/get-initials";

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const { signOut, user } = useAuth();

  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  const handleLogout = () => {
    try {
      setLoggingOut(true);
      setTimeout(async () => {
        onClose?.();
        window.location = authPaths.signin as any;
        await signOut();
        setLoggingOut(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      toast.error("Unable to logout.");
      setLoggingOut(false);
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      slotProps={{
        paper: {
          sx: {
            width: 300,
          },
        },
      }}
      transitionDuration={0}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{
          px: 2,
          py: 1,
        }}
      >
        {/* <Logo
          sx={{
            height: "auto",
            width: 64,
          }}
        /> */}
        <Button
          color="inherit"
          loading={loggingOut}
          onClick={handleLogout}
          size="small"
        >
          <Typography color="inherit" fontWeight="light" variant="caption">
            Sign out
          </Typography>
        </Button>
      </Stack>
      <Stack alignItems="center" direction="row" spacing={3} sx={{ p: 2 }}>
        <Avatar
          //src={user?.avatar}
          sx={{
            height: 80,
            width: 80,
          }}
        >
          {getInitials(user?.name)}
        </Avatar>
        <Stack>
          <Typography color="text.primary" variant="h6">
            {user?.name}
          </Typography>
          <Box sx={{ maxWidth: 175 }}>
            <Typography color="text.primary" noWrap variant="body2">
              {user?.email}
            </Typography>
          </Box>

          <Link href="#" onClick={onClose} underline="always">
            <Typography variant="body2">My account</Typography>
          </Link>
          <Link href="#" onClick={onClose} underline="always">
            <Typography variant="body2">My profile</Typography>
          </Link>
        </Stack>
      </Stack>
    </Popover>
  );
};
