"use client";

import type { FC } from "react";
import { useState } from "react";
import Image from "next/image";
import { Box, SvgIcon } from "@mui/material";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";

interface BookCoverProps {
  height?: number;
  isbn: string;
  title: string;
  width?: number;
}

export const BookCover: FC<BookCoverProps> = (props) => {
  const { height = 80, isbn, title, width = 80 } = props;
  const [imageError, setImageError] = useState<boolean>(false);

  if (imageError) {
    return (
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "grey.200",
          borderRadius: 1,
          display: "flex",
          height: height,
          justifyContent: "center",
          width: width,
        }}
      >
        <SvgIcon>
          <Image01Icon />
        </SvgIcon>
      </Box>
    );
  }

  return (
    <Image
      src={`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`}
      alt={title}
      width={width}
      height={height}
      onError={(e) => {
        setImageError(true);
      }}
      style={{
        display: isbn ? "block" : "none",
        width: "auto",
        height: "auto",
      }}
    />
  );
};
