import { createContext } from "react";
import { ScaledSize } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { IColorMode } from "../settings";

// All app colorss
export const LIGHT_MODE_COLORS = {
  text: "#252525",
  white: "#FFFFFF",
  black: "#000000",
  success: "#34C759",
  background: "#FFFFFF",
  destructive: "#FF3B30",
  transparent: "rgba(255, 255, 255, 0)",
  octonary: "rgba(150, 149, 149, 0.42)",
};

export const DARK_MODE_COLORS = {
  text: "#FFFFFF",
  white: "#000000",
  black: "#FFFFFF",
  success: "#34C759",
  background: "#1A1B1F",
  destructive: "#FF3B30",
  transparent: "rgba(0, 0, 0, 0)",
  octonary: "rgba(150, 149, 149, 0.42)",
};

// All app font sizes
export const FONTS = {
  bold: "sf_pro_rounded_bold",
  light: "sf_pro_rounded_light",
  medium: "sf_pro_rounded_medium",
  regular: "sf_pro_rounded_regular",
  semibold: "sf_pro_rounded_semibold",
};

export const FONT_SIZE = {
  xs: 10,
  s: 12,
  default: 14,
  md: 16,
  lg: 20,
  xlg: 24,
  xxlg: 30,
};

export interface DefaultTheme {
  // App dimension
  layout: {
    radius: number;
    gutter: number;
    screen: ScaledSize;
  };
  // App insets
  insets: EdgeInsets;
  // All Global App Font typings
  fonts: {
    size: typeof FONT_SIZE;
    variants: typeof FONTS;
  };
  // App theme mode
  theme: IColorMode;
  // App dark mode condition
  isDarkMode: boolean;
  // Toggle App theme
  toggleTheme: (colorMode?: IColorMode) => void;
  // All Global App palette typings
  palette: typeof DARK_MODE_COLORS | typeof LIGHT_MODE_COLORS;
  // All Global App colors typings
  colors: { light: typeof LIGHT_MODE_COLORS; dark: typeof DARK_MODE_COLORS };
}

export const ThemeContext = createContext({} as DefaultTheme);
