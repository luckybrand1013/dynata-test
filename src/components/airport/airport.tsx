import React from "react";
import { TouchableOpacity, View } from "react-native";

import { Text } from "../text";
import { makeUseStyles } from "../../helpers";
import { AirportInterface } from "../../types/airport";

type AirportComponentProps = Pick<
  AirportInterface,
  "name" | "icao" | "status"
> & { onPress?: VoidFunction };

const AirportComponent: React.FC<AirportComponentProps> = ({
  name,
  icao,
  status,
  onPress,
}) => {
  const { styles } = useStyles();
  const isAirportClosed = status.toLowerCase().includes("closed");

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      testID={`${name}_airport`}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.name, styles.icao]}>{icao}</Text>

      <View style={styles.bottomContainer}>
        <Text style={[styles.statusText, styles.statusTitleText]}>status:</Text>
        <View
          style={[
            styles.statusContainer,
            isAirportClosed && styles.closedStatusContainer,
          ]}
        >
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const useStyles = makeUseStyles(({ colors, fonts, palette, layout }) => ({
  container: {
    padding: layout.gutter,
    borderRadius: layout.gutter,
    backgroundColor: palette.octonary,
  },
  name: {
    fontWeight: "700",
    fontSize: fonts.size.md,
  },
  icao: {
    fontWeight: "normal",
  },
  statusText: {
    fontWeight: "700",
    color: colors.light.white,
    fontSize: fonts.size.default,
  },
  statusTitleText: {
    color: palette.text,
    fontSize: fonts.size.lg,
    textTransform: "capitalize",
  },
  statusContainer: {
    alignSelf: "flex-start",
    borderRadius: layout.radius * 2,
    paddingHorizontal: layout.gutter,
    backgroundColor: palette.success,
    paddingVertical: layout.gutter / 2,
  },
  closedStatusContainer: {
    backgroundColor: palette.destructive,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: layout.gutter / 2,
    justifyContent: "space-between",
  },
}));

export const Airport = React.memo(AirportComponent);
