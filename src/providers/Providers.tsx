import React, { PropsWithChildren } from "react";

import { ThemeProvider } from "./theme";
import { SafeAreaProvider } from "./safearea";
import { SettingsProvider } from "./settings";
import { StatusBarProvider } from "./statusbar";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <ThemeProvider>
          <StatusBarProvider>{children}</StatusBarProvider>
        </ThemeProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
};
