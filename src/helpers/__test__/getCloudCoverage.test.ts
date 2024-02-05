import { getCloudCoverage } from "../getCloudCoverage";

describe("helper / getCloudCoverage", () => {
  test("should return cloud coverage without ceiling", () => {
    const clouds = [
      {
        base_feet_agl: 3600,
        base_meters_agl: 1097,
        code: "FEW",
        text: "Few",
        feet: 3600,
        meters: 1097,
      },
      {
        base_feet_agl: 16000,
        base_meters_agl: 4877,
        code: "FEW",
        text: "Few",
        feet: 16000,
        meters: 4877,
      },
      {
        base_feet_agl: 25000,
        base_meters_agl: 7620,
        code: "SCT",
        text: "Scattered",
        feet: 25000,
        meters: 7620,
      },
    ];

    expect(getCloudCoverage(clouds)).toBe(65.68);
  });

  test("should return cloud coverage with ceiling", () => {
    const clouds = [
      {
        base_feet_agl: 3600,
        base_meters_agl: 1097,
        code: "FEW",
        text: "Few",
        feet: 3600,
        meters: 1097,
      },
      {
        base_feet_agl: 16000,
        base_meters_agl: 4877,
        code: "FEW",
        text: "Few",
        feet: 16000,
        meters: 4877,
      },
    ];

    const ceiling = { feet: 16000, meters: 1097 };

    expect(getCloudCoverage(clouds, ceiling)).toBe(24.5);
  });
});
