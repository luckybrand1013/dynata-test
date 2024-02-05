import { useCallback, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSettings, useTheme } from "../hooks";
import { IColorMode } from "../providers/settings";
import {
  FONTS,
  FONT_SIZE,
  DefaultTheme,
  DARK_MODE_COLORS,
  LIGHT_MODE_COLORS,
} from "../providers/theme/theme";

type GetStylesPayload = ReturnType<typeof useTheme>;

export function makeUseStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(
  getStyles: (payload: GetStylesPayload) => T | StyleSheet.NamedStyles<T>
): () => GetStylesPayload & { styles: T } {
  return () => {
    const insets = useSafeAreaInsets();
    const dimension = useWindowDimensions();
    const { settings, settingsActions } = useSettings();

    const isDarkMode = settings.colorMode === IColorMode.DARK;
    const themeMode = isDarkMode ? IColorMode.DARK : IColorMode.LIGHT;

    const toggleTheme = useCallback(
      (mode?: IColorMode) => {
        const theme = mode || (isDarkMode ? IColorMode.LIGHT : IColorMode.DARK);
        return settingsActions.changeColorMode(theme);
      },
      [isDarkMode, settingsActions]
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

    const styles = useMemo(
      () => StyleSheet.create(getStyles({ ...theme })),
      [theme]
    );

    return { ...theme, styles };
  };
}
