import type { FC } from "react";
import { useTheme } from "@mui/material/styles";

export const Logo: FC = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <svg
      fill="none"
      height="100%"
      viewBox="0 0 24 24"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="3" fill="#FFF8F0" />

      <rect x="5.6" y="5.6" width="7.2" height="11.2" rx="1" fill={fillColor} />
      <line
        x1="7.2"
        y1="8"
        x2="11.2"
        y2="8"
        stroke="#D8B4FE"
        stroke-width="0.6"
      />
      <line
        x1="7.2"
        y1="9.6"
        x2="11.2"
        y2="9.6"
        stroke="#D8B4FE"
        stroke-width="0.6"
      />
      <line
        x1="7.2"
        y1="11.2"
        x2="10.7"
        y2="11.2"
        stroke="#D8B4FE"
        stroke-width="0.6"
      />

      <polygon points="13,15 16,12 16.6,12.6 13.6,15.6" fill="#F59E0B" />
      <polygon points="13,15 13.6,15.6 12,16" fill="#FCD34D" />
    </svg>
  );
};
