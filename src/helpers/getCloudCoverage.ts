import { AirportDetailInterface } from "../types/airport";

/**
 *
 * @description Function to calculate cloud coverage percentage
 * @function getCloudCoverage
 * @property {AirportDetailInterface["clouds"]} clouds
 * @property {AirportDetailInterface["ceiling"]} ceiling
 * @returns {number}
 */

export const getCloudCoverage = (
  clouds: AirportDetailInterface["clouds"],
  ceiling?: AirportDetailInterface["ceiling"]
): number => {
  let totalCoverage = 0;

  const highestCloudLayer = clouds.reduce(
    (maxCloud, currentCloud) =>
      currentCloud.feet > maxCloud ? currentCloud.feet : maxCloud,
    0
  );

  const ceilingFeet = ceiling?.feet || highestCloudLayer;

  for (const cloud of clouds) {
    const baseFeet = cloud.feet;
    let coverageFraction = 0;

    if (cloud.code === "FEW") {
      // Few clouds cover a small fraction of the sky
      coverageFraction = 0.2;
    } else if (cloud.code === "SCT") {
      // Scattered clouds cover a fraction of the sky
      coverageFraction = 0.5;
    } else if (cloud.code === "BKN") {
      // Broken clouds cover a larger fraction of the sky
      coverageFraction = 0.7;
    }

    totalCoverage += coverageFraction * Math.min(ceilingFeet, baseFeet);
  }

  // Calculate percentage
  const cloudCoveragePercent = (totalCoverage / ceilingFeet) * 100;

  return cloudCoveragePercent;
};
