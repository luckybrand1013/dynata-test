import { createContext } from "react";

export enum IColorMode {
  DARK = "dark",
  LIGHT = "light",
}

export interface ISettingsState {
  colorMode: IColorMode;
}

export type ContextState = {
  settings: ISettingsState;
  settingsActions: {
    changeColorMode: (color: IColorMode) => void;
  };
};

const state: ISettingsState = {
  colorMode: IColorMode.LIGHT,
};

export const settingsInitialState = { settings: state };

export const StoreContext = createContext({} as ContextState);
