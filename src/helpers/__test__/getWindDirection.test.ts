import { getWindDirection } from "../getWindDirection";

describe("helper / getWindDirection", () => {
  test("test the wind direction of a given degree", () => {
    expect(getWindDirection(360)).toBe("360° ↑ N");
  });
});
