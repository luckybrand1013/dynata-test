import React, {
  useMemo,
  useEffect,
  useCallback,
  PropsWithChildren,
} from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IColorMode } from "../settings";
import { useColorScheme, useSettings } from "../../hooks";
import {
  FONTS,
  FONT_SIZE,
  DefaultTheme,
  ThemeContext,
  DARK_MODE_COLORS,
  LIGHT_MODE_COLORS,
} from "./theme";

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const systemTheme = useColorScheme();
  const dimension = useWindowDimensions();
  const { settings, settingsActions } = useSettings();

  const isDarkMode = settings.colorMode === IColorMode.DARK;
  const themeMode = isDarkMode ? IColorMode.DARK : IColorMode.LIGHT;

  const toggleTheme = useCallback(
    (mode?: IColorMode) => {
      const theme = mode || (isDarkMode ? IColorMode.LIGHT : IColorMode.DARK);
      return settingsActions.changeColorMode(theme);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDarkMode]
  );

  // Conditionally change the theme-color from dark to light-mode and vise-versa
  const theme: DefaultTheme = useMemo(
    () => ({
      insets,
      isDarkMode,
      toggleTheme,
      theme: themeMode,
      fonts: { variants: FONTS, size: FONT_SIZE },
      layout: { radius: 10, gutter: 16, screen: dimension },
      palette: isDarkMode ? DARK_MODE_COLORS : LIGHT_MODE_COLORS,
      colors: { light: LIGHT_MODE_COLORS, dark: DARK_MODE_COLORS },
    }),
    [dimension, themeMode, insets, isDarkMode, toggleTheme]
  );

  useEffect(() => {
    settingsActions.changeColorMode(systemTheme as IColorMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemTheme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
