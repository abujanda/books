import type { FC } from "react";

export const Logo: FC = () => {
  return (
    <svg
      fill="none"
      height="100%"
      viewBox="0 0 64 64"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="12" fill="#1F2937" />
      <rect x="12" y="12" width="40" height="40" rx="8" fill="#FBC02D" />
      <path d="M44 12 v14 l-4 -4 -4 4 V12 Z" fill="#F59E0B" />
      <path
        d="M16 44 h32 a2 2 0 0 1 -2 2 H18 a2 2 0 0 1 -2 -2 Z"
        fill="#FFE082"
      />
      <text
        x="22"
        y="38"
        font-size="20"
        fill="#1F2937"
        font-family="sans-serif"
        font-weight="bold"
      >
        N
      </text>
    </svg>
  );
};
