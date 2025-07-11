import type { FC } from "react";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import { useDialog } from "@/hooks/use-dialog";
import { SearchDialog } from "@/layouts/books/search-button/search-dialog";

export const SearchButton: FC = () => {
  const dialog = useDialog();

  return (
    <>
      <Tooltip title="Search">
        <IconButton onClick={dialog.handleOpen}>
          <SvgIcon fontSize="small">
            <SearchMdIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <SearchDialog onClose={dialog.handleClose} open={dialog.open} />
    </>
  );
};
