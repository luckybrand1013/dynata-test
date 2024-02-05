import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, FlatListProps, FlatList, View } from "react-native";

import { useAirports } from "../../hooks";
import { Text } from "../../components/text";
import { makeUseStyles } from "../../helpers";
import { Airport } from "../../components/airport";
import { AirportInterface } from "../../types/airport";
import { MainStackScreenProps } from "../../types/navigation";

export const HomeScreen: React.FC<MainStackScreenProps<"HomeScreen">> = ({
  navigation,
}) => {
  const { styles, palette } = useStyles();
  const { error, data, isError, isFetchingMore, isLoading } = useAirports();

  const ListEmptyComponent: FlatListProps<AirportInterface>["ListEmptyComponent"] =
    useCallback(() => {
      if (isLoading) {
        return (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={palette.text} />
          </View>
        );
      }

      if (isError) {
        return (
          <View style={styles.loaderContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        );
      }

      return null;
    }, [isLoading, error, palette.text, isError]);

  const ListFooterComponent: FlatListProps<AirportInterface>["ListFooterComponent"] =
    useCallback(() => {
      return isFetchingMore ? (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="small" color={palette.text} />
        </View>
      ) : null;
    }, [isFetchingMore, palette.text]);

  const renderItem = useCallback<
    NonNullable<FlatListProps<AirportInterface>["renderItem"]>
  >(
    ({ item }) => (
      <Airport
        {...item}
        onPress={() => navigation.navigate("DetailScreen", { icao: item.icao })}
      />
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        removeClippedSubviews
        renderItem={renderItem}
        initialNumToRender={20}
        style={styles.container}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const useStyles = makeUseStyles(({ fonts, insets, layout, palette }) => ({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  contentContainer: {
    paddingTop: layout.gutter,
    paddingBottom: insets.bottom,
    paddingHorizontal: layout.gutter,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: layout.screen.height - (insets.bottom + insets.top),
  },
  errorText: {
    fontWeight: "500",
    fontSize: fonts.size.xlg,
  },
  footerContainer: {
    paddingBottom: layout.gutter * 2,
  },
  footerText: {
    alignSelf: "center",
    fontSize: fonts.size.s,
  },
}));
