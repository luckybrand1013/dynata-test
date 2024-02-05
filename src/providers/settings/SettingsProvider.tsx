import React, { useMemo, PropsWithChildren, useState } from "react";

import {
  IColorMode,
  StoreContext,
  ContextState,
  settingsInitialState,
} from "./store";

export const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] =
    useState<Pick<ContextState, "settings">>(settingsInitialState);

  const changeColorMode = (colorMode: IColorMode) => {
    setState({ ...state, settings: { ...state.settings, colorMode } });
  };

  const value = useMemo(
    () => ({ ...state, settingsActions: { changeColorMode } }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
