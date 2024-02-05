import React from "react";
import { render, screen } from "@testing-library/react-native";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

import { Text } from "./text";
import { Providers } from "../../providers";

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

describe("<Text/>", () => {
  test("test text component to render correctly", () => {
    render(
      <Providers>
        <Text>Hello world</Text>
      </Providers>
    );

    expect(screen.getByText(/Hello world/)).toBeDefined();
  });
});
