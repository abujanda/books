import type { FC, ReactNode } from 'react';
import { useCallback, useState } from 'react';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import { Box, ButtonBase, Paper, Portal, SvgIcon, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { RouterLink } from '@/components/router-link';

const TOP_NAV_HEIGHT: number = 64;
const TOP_NAV_SPACE: number = 16;
const OFFSET: number = 16;

interface TopNavItemProps {
  active?: boolean;
  external?: boolean;
  path?: string;
  popover?: ReactNode;
  title: string;
}

export const TopNavItem: FC<TopNavItemProps> = (props) => {
  const { active, external, path, popover, title } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handleMouseEnter = useCallback(
    () => {
      setOpen(true);
    },
    []
  );

  const handleMouseLeave = useCallback(
    () => {
      setOpen(false);
    },
    []
  );

  // With mega-menu

  if (popover) {
    return (
      <>
        <Box
          component="li"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ButtonBase
            disableRipple
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              px: '16px',
              py: '8px',
              textAlign: 'left',
              '&:hover': {
                backgroundColor: 'action.hover'
              },
              ...(active && {
                color: 'primary.main'
              })
            }}
          >
            <Typography
              component="span"
              variant="subtitle2"
            >
              {title}
            </Typography>
            <SvgIcon
              sx={{
                fontSize: 16,
                ml: 1
              }}
            >
              <ChevronDownIcon />
            </SvgIcon>
          </ButtonBase>
        </Box>
        {open && (
          <Portal>
            <Box
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{
                left: 0,
                position: 'fixed',
                pt: OFFSET + 'px',
                right: 0,
                top: TOP_NAV_HEIGHT + TOP_NAV_SPACE,
                zIndex: (theme) => theme.zIndex.appBar + 100
              }}
            >
              <Paper
                elevation={16}
                sx={{
                  backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.90),
                  backdropFilter: 'blur(6px)',
                  mx: 'auto',
                  width: (theme) => theme.breakpoints.values.md
                }}
              >
                {popover}
              </Paper>
            </Box>
          </Portal>
        )}
      </>
    );
  }

  // Simple

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: RouterLink,
        href: path
      }
    : {};

  return (
    <Box
      component="li"
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%'
      }}
    >
      <ButtonBase
        disableRipple
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          px: '16px',
          py: '8px',
          textAlign: 'left',
          '&:hover': {
            backgroundColor: 'action.hover'
          },
          ...(active && {
            color: 'primary.main'
          })
        }}
        {...linkProps}
      >
        <Typography
          component="span"
          variant="subtitle2"
        >
          {title}
        </Typography>
      </ButtonBase>
    </Box>
  );
};