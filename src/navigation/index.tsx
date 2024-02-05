import React from "react";
import {
  Theme,
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { makeUseStyles } from "../helpers";
import { HomeScreen } from "../screens/home";
import { DetailScreen } from "../screens/details";
import { MainStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<MainStackParamList>();

export const Navigation = () => {
  const { isDarkMode, palette, styles } = useStyles();

  const theme: Theme = {
    ...DefaultTheme,
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      text: palette.text,
      background: palette.background,
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerShadowVisible: true,
          headerBackTitleVisible: false,
          headerTintColor: palette.text,
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const useStyles = makeUseStyles(({ fonts, palette }) => ({
  headerTitleStyle: {
    lineHeight: 28,
    fontWeight: "600",
    color: palette.text,
    fontSize: fonts.size.md,
  },
  headerStyle: {
    backgroundColor: palette.background,
  },
}));
