'use client';

import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { withProps } from "@udecode/cn";
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { HeadingPlugin } from "@udecode/plate-heading/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import {
  Plate,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
  PlateContent,
} from "@udecode/plate/react";
import { serializeHtml } from "@udecode/plate-core";

interface PlateReactProps {
  onChange?: (value: any) => void;
  placeholder?: string;
  value?: string;
}

export const PlateEditor: FC<PlateReactProps> = (props) => {
  const { onChange, placeholder, value } = props;

  const editor = usePlateEditor({
    plugins: [
      HeadingPlugin,
      BlockquotePlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
    ],
    override: {
      components: {
        blockquote: withProps(PlateElement, {
          as: (props) => (
            <Box
              component="blockquote"
              sx={{
                mb: 2,
                borderLeft: "4px solid #d0d7de",
                pl: 2,
                color: "#636c76",
              }}
              {...props}
            />
          ),
        }),
        bold: withProps(PlateLeaf, {
          as: (props) => <strong style={{ fontWeight: "bold" }} {...props} />,
        }),
        italic: withProps(PlateLeaf, {
          as: (props) => <em style={{ fontStyle: "italic" }} {...props} />,
        }),
        underline: withProps(PlateLeaf, {
          as: (props) => (
            <u style={{ textDecoration: "underline" }} {...props} />
          ),
        }),
        h1: withProps(PlateElement, {
          as: (props) => (
            <Typography
              variant="h3"
              component="h1"
              sx={{
                mb: 2,
                mt: 4,
                fontWeight: 600,
                letterSpacing: "-0.5px",
              }}
              {...props}
            />
          ),
        }),
        h2: withProps(PlateElement, {
          as: (props) => (
            <Typography
              variant="h4"
              component="h2"
              sx={{
                mb: 2,
                mt: 4,
                fontWeight: 600,
                letterSpacing: "-0.5px",
              }}
              {...props}
            />
          ),
        }),
        h3: withProps(PlateElement, {
          as: (props) => (
            <Typography
              variant="h5"
              component="h3"
              sx={{
                mb: 2,
                mt: 4,
                fontWeight: 600,
                letterSpacing: "-0.5px",
              }}
              {...props}
            />
          ),
        }),
        p: withProps(PlateElement, {
          as: (props) => (
            <Typography
              variant="body1"
              component="p"
              sx={{ mb: 2 }}
              {...props}
            />
          ),
        }),
      },
    },
  });

  const handleChange = (value: any) => {
    const html = serializeHtml(editor, value);
    if(onChange) {
      onChange(html);
    }
  }

  return (
    <Plate editor={editor} onChange={handleChange}>
      <PlateContent placeholder={placeholder} value={value} />
    </Plate>
  );
};
