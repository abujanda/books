import type { PaletteColor } from "@mui/material";
import type { ColorPreset } from "./index";
import { blue, green, indigo, purple, amber } from "./colors";

export const getPrimary = (preset?: ColorPreset): PaletteColor => {
  switch (preset) {
    case "amber":
      return amber;
    case "blue":
      return blue;
    case "green":
      return green;
    case "indigo":
      return indigo;
    case "purple":
      return purple;
    default:
      console.error(
        'Invalid color preset, accepted values: "amber", "blue", "green", "indigo" or "purple"".'
      );
      return blue;
  }
};
