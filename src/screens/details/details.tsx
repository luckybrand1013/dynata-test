import React, { Fragment, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { Text } from "../../components/text";
import { useAirportDetail } from "../../hooks";
import { MainStackScreenProps } from "../../types/navigation";
import {
  getWindDirection,
  getCloudCoverage,
  makeUseStyles,
} from "../../helpers";

export const DetailScreen: React.FC<MainStackScreenProps<"DetailScreen">> = ({
  route,
  navigation,
}) => {
  const { styles, palette } = useStyles();
  const { isError, error, data, isLoading } = useAirportDetail();

  console.tron?.(data);

  useEffect(() => {
    navigation.setOptions({ headerTitle: data?.icao || route.params?.icao });
  }, [navigation, route.params?.icao, data?.icao]);

  return (
    <View style={styles.container}>
      {!data && isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={palette.text} />
        </View>
      )}

      {isError && (
        <View style={styles.loaderContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {data && (
        <Fragment>
          <Text style={styles.title}>
            ICAO: <Text style={styles.title}>{data.icao}</Text>
          </Text>

          <Text style={styles.title}>
            Name: <Text style={styles.title}>{data.station.name}</Text>
          </Text>

          <Text style={styles.title}>
            Cloud coverage:{" "}
            <Text style={styles.title}>
              {getCloudCoverage(data.clouds, data.ceiling)}%
            </Text>
          </Text>

          <Text style={styles.title}>
            Temperature:{" "}
            <Text style={styles.title}>
              {data.temperature.celsius}℃ {" " + data.temperature.fahrenheit}℉
            </Text>
          </Text>

          <Text style={styles.title}>
            Visibility:{" "}
            <Text style={styles.title}>
              {data.visibility.miles_float
                ? `${data.visibility.miles} miles`
                : `${data.visibility.meters} meters`}
            </Text>
          </Text>

          <Text style={styles.title}>
            Wind direction:{" "}
            <Text style={styles.title}>
              {getWindDirection(data.wind.degrees)}
            </Text>
          </Text>
        </Fragment>
      )}
    </View>
  );
};

const useStyles = makeUseStyles(({ layout, fonts }) => ({
  container: {
    flex: 1,
    gap: layout.gutter / 2,
    padding: layout.gutter,
  },
  title: {
    fontWeight: "700",
    fontSize: fonts.size.md,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontWeight: "500",
    fontSize: fonts.size.xlg,
  },
}));
