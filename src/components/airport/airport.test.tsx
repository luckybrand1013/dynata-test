import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

import { Airport } from "./airport";
import { Providers } from "../../providers";

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

describe("<Airport/>", () => {
  test("test airport to render correctly and clickable also", () => {
    const props = {
      icao: "US-0004",
      status: "closed",
      name: "Rockaway Airport",
    };

    const onPressMock = jest.fn();

    render(
      <Providers>
        <Airport {...props} onPress={onPressMock} />
      </Providers>
    );

    fireEvent.press(screen.getByTestId(`${props.name}_airport`));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
