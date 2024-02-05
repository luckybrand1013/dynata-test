import { ReactNode } from "react";
import { renderHook } from "@testing-library/react-native";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

import { makeUseStyles } from "../makeUseStyles";
import { StoreContext, settingsInitialState } from "../../providers/settings";

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

function Wrapper({ children }: { children: ReactNode }) {
  const value = {
    ...settingsInitialState,
    settingsActions: { changeColorMode: jest.fn() },
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

describe("helper / makeUseStyles", () => {
  it("should return hook handler", () => {
    const useStyles = makeUseStyles(() => ({
      container: { flex: 1 },
    }));

    expect(useStyles).toBeInstanceOf(Function);
  });

  it("should return styles object", () => {
    const styles = { container: { flex: 1 } };
    const useStyles = makeUseStyles(() => styles);

    const { result } = renderHook(() => useStyles(), { wrapper: Wrapper });

    expect(result.current).toHaveProperty("styles");
    expect(result.current).toHaveProperty("palette");
    expect(result.current.styles).toBe(styles);
  });
});
